import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary=async ()=>{
    cloudinary.config({
        cloud_name:process.env.CLOUDNARU_NAME,
        api_key:process.env.CLOUDNARY_APIKEY,
        api_secret:process.env.CLUDNARY_SECRET_APIKEY
    })
}
export default connectCloudinary