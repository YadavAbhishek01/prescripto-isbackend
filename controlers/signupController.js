import signupmodel from "../models/singupmodel.js";
import bcrypt from 'bcrypt'

export const registeruser=async (req,res)=>{
    try{
            const {name,email,password,address,phone_number,gender,dob,role}=req.body;

            const existuser=await signupmodel.findOne({email});
            if(existuser)
            {
                return res.json({success:false,message:"User already exists"})
            }
            const hashedpassword=await bcrypt.hash(password,10);

            const user=await signupmodel.create({
                name,email,password: hashedpassword,address,gender,phone_number,dob
            })
            res.json({success:true,message:"user register succefully",user})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message});
    }
}