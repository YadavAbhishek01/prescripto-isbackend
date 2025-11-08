import jwt from 'jsonwebtoken'

// Admin Authenthication middelwares

const Authadmin=async(req,res,next)=>{
    try{
        const {admintoken}=req.headers
        
        if(!admintoken)
        {
            return res.json({success:false,message:'Not Authorized Login Again' })
        }
        const tokendecode=jwt.verify(admintoken,process.env.JWT_SCREKET)
        if(tokendecode!=process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
            return  res.json({success:false,message:'Not Authorized Login Again' })
        }
        next()
    }   
     catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message} )
    }
}
export default Authadmin