import express from 'express'
import {loginUser,getloginuser,updateprofile} from '../controlers/loginController.js'
import {registeruser} from '../controlers/signupController.js'
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer(); // memory storage

const loginroutes=express.Router()

loginroutes.post('/login',loginUser)
loginroutes.post('/signup',registeruser)
loginroutes.get('/getuser',getloginuser)
loginroutes.put('/update-profile/:id',upload.single("image"),updateprofile)

export default loginroutes