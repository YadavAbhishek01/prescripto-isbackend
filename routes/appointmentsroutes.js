import express from 'express'
import {getallappointment} from '../controlers/appointmentcontroller.js'
import {createappointments} from '../controlers/appointmentcontroller.js'
import { deleteappointments } from '../controlers/appointmentcontroller.js';
const appointmentrouter=express.Router();

appointmentrouter.post('/create',createappointments)
appointmentrouter.get('/',getallappointment)
appointmentrouter.delete('/delete-appointment/:id',deleteappointments)
export  default appointmentrouter