import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'

console.log("Credentials loaded:", {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY ? "✅ exists" : "❌ MISSING"
})

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
    secure: true
})

try {
    const result = await cloudinary.api.ping()
    console.log("✅ Cloudinary connected:", result)
} catch (err) {
    console.error("❌ Cloudinary failed:", err.message, err.http_code)
}