import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctormodel from '../models/doctormodel.js';
import jwt from 'jsonwebtoken';
import streamifier from 'streamifier';

// ✅ Add Doctor Controller
const addDoctor = async (req, res) => {
  try {
    const imagefile = req.file;
    const { name, email, password, speciality, degree, experience, about, fees, address, phone, available } = req.body;

    // Convert available to boolean
    const isAvailable = available === "true" || available === true;

    // Parse address safely
    let parsedAddress = { line1: "", line2: "" };
    if (address) {
      if (typeof address === "string") {
        try {
          parsedAddress = JSON.parse(address);
        } catch (err) {
          return res.json({ success: false, message: "Invalid address format" });
        }
      } else if (typeof address === "object") {
        parsedAddress = address;
      } else {
        return res.json({ success: false, message: "Invalid address format" });
      }
    }

    // 🔒 Check required fields
    if (!imagefile) return res.json({ success: false, message: "Image file not received by server" });
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !phone)
      return res.json({ success: false, message: "Missing details" });

    // 📧 Validate email
    if (!validator.isEmail(email))
      return res.json({ success: false, message: "Please enter a valid email" });

    // 🔑 Validate password
    if (password.length < 8)
      return res.json({ success: false, message: "Please enter a strong password" });

    // 🔐 Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // ☁️ Upload image to Cloudinary via stream
    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "doctors", resource_type: "image" },
        (error, result) => {
          if (result) resolve(result);
          else reject(error);
        }
      );
      streamifier.createReadStream(imagefile.buffer).pipe(stream);
    });

    // 🩺 Save doctor to database
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      phone,
      experience,
      about,
      fees,
      address: parsedAddress,
      image: uploadResult.secure_url,
      available: isAvailable,
      date: Date.now(),
    };

    const newDoctor = new doctormodel(doctorData);
    await newDoctor.save();

    res.json({ success: true, message: "Doctor added successfully" });
  } catch (error) {
    console.error("Error in addDoctor:", error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Admin Login
const LoginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SCREKET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Get All Doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctormodel.find();
    res.json({ success: true, doctors });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Failed to fetch doctors" });
  }
};

// ✅ Update Doctor Details
const updatedoctordetails = async (req, res) => {
  try {
    const doctorId = req.params.id;
    const updateData = { ...req.body };

    // Parse address if present
    if (updateData.address && typeof updateData.address === "string") {
      try {
        updateData.address = JSON.parse(updateData.address);
      } catch (err) {
        return res.json({ success: false, message: "Invalid address format" });
      }
    }

    // Convert available to boolean
    if (updateData.available !== undefined) {
      updateData.available = updateData.available === "true" || updateData.available === true;
    }

    // Upload new image if present
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "doctors", resource_type: "image" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      updateData.image = uploadResult.secure_url;
    }

    const updatedDoctor = await doctormodel.findByIdAndUpdate(doctorId, updateData, { new: true });
    res.json({ success: true, message: "Doctor details updated", doctor: updatedDoctor });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const deletedoctor=async(req,res)=>{
    try{
            const doctorId=req.params.id
            // const doctordata={...req.body}

            const deletedoc=await doctormodel.findByIdAndDelete(doctorId);
            if(!deletedoc)
            {
                   return res.status(404).json({ success: false, message: "Doctor not found" });
               
            }
             res.json({ success: true, message: "Doctor Deleted Succesfully", doctor: deletedoc })
    }
    catch(error)
    {
            console.log(error);
    res.json({ success: false, message: error.message });
    }
}
export { addDoctor, LoginAdmin, getAllDoctors, updatedoctordetails ,deletedoctor};
