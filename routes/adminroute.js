import express from 'express'
import { addDoctor,deletedoctor,getAllDoctors,LoginAdmin, updatedoctordetails } from '../controlers/admincontroler.js'
import upload from '../middelwares/Multer.js'
import Authadmin from '../middelwares/authadmin.js'

const adminrouter=express.Router()
adminrouter.post('/add-doctor',Authadmin,upload.single('image'),addDoctor)
adminrouter.post('/login',LoginAdmin)
adminrouter.get('/all-doctors',Authadmin,getAllDoctors)
adminrouter.put('/edit-doctor/:id',Authadmin,upload.single('image'),updatedoctordetails)
adminrouter.delete('/delete-doctor/:id',Authadmin,deletedoctor)
export default adminrouter