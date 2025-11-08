import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, default: "" }, // optional
    speciality: { type: String, required: true },
    degree: { type: String, required: true },
    phone:{type:Number ,require:true},
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true }, // fixed typo and default
    fees: { type: Number, required: true }, // lowercase and required
    address: { type: Object, default: { line1: "", line2: "" } },
    date: { type: Date, default: Date.now },
    slot_booked: { type: Object, default: {} }
}, { minimize: false });

const doctormodel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);
export default doctormodel;
