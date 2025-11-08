import express from 'express'
import { getAllDoctors } from "../controlers/admincontroler.js"

const publicroute=express.Router();

publicroute.get('/doctors',getAllDoctors);
export default publicroute