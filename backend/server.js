
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectdb from './config/mongodb.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import connectCloudinary from './config/cloudinary.js'
import cartRouter from './routes/cartRoute.js'
await connectCloudinary()  // 👈 must be before app.listen

// App config


const app = express()
const PORT = process.env.PORT || 4000

connectdb()
// Middlewares


app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)

app.get('/',(req, res)=>{
    res.send("API working")
})

app.listen(PORT, ()=> console.log("Server started on Port: " + PORT))