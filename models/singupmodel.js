import mongoose  from "mongoose"


const singupschema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    address:{type:String,required:true},
    phone_number:{type:Number,required:true},
    gender:{type:String,required:true},
    dob:{type:String,required:true},
     image: { type: String, default: "" }, // optional
})

 const  signupmodel=mongoose.model('signup',singupschema)
 export default signupmodel