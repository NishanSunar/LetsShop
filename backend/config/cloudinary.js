import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_SECRET_KEY,
        secure: true  // 👈 this was missing
    })
    console.log("Cloudinary connected:", cloudinary.config().cloud_name)
}

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

         console.log("Upload config check:", {
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            secret: process.env.CLOUDINARY_SECRET_KEY ? "exists" : "MISSING",
            config: cloudinary.config()
        })
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        console.error("Cloudinary upload error:", error.message)
        if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath)
        return null
    }
}

export default connectCloudinary
export { uploadOnCloudinary }