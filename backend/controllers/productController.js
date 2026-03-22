
import { uploadOnCloudinary } from '../config/cloudinary.js';
import productModel from '../models/productModel.js';

//function for add product

const addProduct = async (req, res)=>{
    try{
        const {name, description, price, category, subCategory, sizes, bestSeller} = req.body;

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)
        
        const imagesUrl = await Promise.all(
            images.map(async (item)=>{
                const result = await uploadOnCloudinary(item.path)
                return result.secure_url
            })
        )
      
        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            bestSeller: bestSeller === 'true' ? true : false,
            sizes: JSON.parse(sizes),
            images: imagesUrl,
            date: Date.now()
        }

        console.log(productData)
        const product = new productModel(productData)
        console.log(product)
        await product.save()
        res.json({success:true, message: "Product added successfully"})
        
    } catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


//function for list productconst addProduct = async (req, res)=>{
    
const listProducts = async (req, res)=>{
    try {
        const products = await productModel.find({});
        res.json({success:true, products})
    } catch (error) {
        res.json({success:false, message:error.message})
    }
}

//remove products
const removeProduct = async (req, res)=>{
    
}

//function for single product info
const singleProduct = async (req, res)=>{
    
}


export {addProduct, listProducts, removeProduct, singleProduct}