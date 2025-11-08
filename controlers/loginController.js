import signupmodel from "../models/singupmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import cloudinary from "cloudinary";
import streamifier from "streamifier";
dotenv.config(); 

 
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await signupmodel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const ismatch = await bcrypt.compare(password, user.password);
    if (!ismatch) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const logintoken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SCREKET,
      { expiresIn: "1h" }
    );

      
    
         res.json({
      success: true,
      message: "Login Successfully",
      token: logintoken
    });
      
   
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

export const getloginuser = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ success: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SCREKET);
    const user = await signupmodel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

export const updateprofile = async (req, res) => {
  try {
    const { id } = req.params;

    // Copy all fields from req.body
    const updateData = { ...req.body };

    // Handle image upload to Cloudinary
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.v2.uploader.upload_stream(
          { folder: "Profile-images" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
      updateData.image = uploadResult.secure_url; // store URL in DB
    }

    // Update user
    const updatedUser = await signupmodel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, select: "-password" }
    );

    if (!updatedUser)
      return res.json({ success: false, message: "User not found" });

    res.json({
      success: true,
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};