
import mongoose from 'mongoose'


const appoinmentschema = mongoose.Schema({
    doctorname: { type: String, required: true },
    specialist: { type: String, required: true },
    fees: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    phone:{type:Number,required:true},
    image:{type:String,required:true},
    isavailabel:{type:Boolean},
    Patient_details: {
        patientsname: { type: String, required: true },
        gender: { type: String, required: true },
        age: { type: Number, required: true },
        email: { type: String, required: true },
    }

})

const appointmentmiodel = mongoose.model('appointments', appoinmentschema)
export default appointmentmiodel