import jwt from "jsonwebtoken"

const adminAuth = async (req, res, next)=>{
    try {
        const { token } = req.headers
        if(!token){
            return res.json({success:false, message:"Unauthorized access, token missing"})
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(token_decode)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success:false, message:"Unauthorized access, invalid token"})
        }
        next()
    
       
    }
    catch (error) {
         console.log(error)
         return res.json({success:false, message:"Unauthorized access, invalid token ..."})
    }
}

export default adminAuth