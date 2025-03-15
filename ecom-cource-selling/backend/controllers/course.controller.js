import  Course  from "../models/course.model.js";
import { v2 as cloudinary } from 'cloudinary';
import  Purchase  from "../models/purchase.model.js";





 export const  createCourse =  async (req,res) =>{


  // const title  = req.body.title ;
  // const description = req.body.description;
  // const price = req.body.price;
  // const image = req.body.image;
 
  const adminId = req.adminId;

  const{title,description,price} = req.body;
  try{
   if(!title || !description || !price ){
    return res.status(400).json({errors:"All fields are required"})
   }


const {image} = req.files;
if(!req.files || Object.keys(req.files).length === 0){
  return res.status(400).json({error: "no file uploaded"})
}

const allowedFormat = ["image/png","image/jpeg"]
if(!allowedFormat.includes(image.mimetype)){
  return res.status(400).json({error: "file format not supported"})
}


//claudinary code

const cloud_response = await cloudinary.uploader.upload(image.tempFilePath)

if(!cloud_response || cloud_response.error){

return res.status(400).json({error:"error uploading image"})

}




   const courseData = {
      title,
      description,
      price,
      image:{
        public_id:cloud_response.public_id,
        url:cloud_response.url,
      },
         creatorId : adminId
   }
   const course = await Course.create(courseData)
   res.json({
    message:"Course created successfully",
    course
   })
  }
  catch(error){

    console.log(error)
    res.status(500).json({error : "error creating course"})
  }


}

export const updateCourse = async (req,res) =>{

  const adminId = req.adminId;

const {courseId} = req.params;
const {title,description,price,image} = req.body;

try{
  const courseSearch =await Course.findById(courseId)
  if(!courseSearch){

    return res.status(404).json({errors : "course not found"})
  }
  const course = await Course.updateOne({
    _id:courseId,
    creatorId:adminId,
  },{
    title,
    description,
    price,
    image:{
      public_id:image?.public_id ,
      url:image?.url,
    }
  })
  if(!course){
    return res.status(404).json({errors:"cant updata,created by other admin"})
  }

  res.status(201).json({
    message:"Course updated successfully",course
  })
}
catch(error){
  res.status(500).json({errors : "Error in course updating"})
  console.log("error in course updation",error)
}


}


export const deleteCourse =async(req,res) =>{
  const adminId = req.adminId;
   const {courseId} = req.params
   try {
    
const course = await Course.findOneAndDelete({
  _id : courseId,
  creatorId : adminId,
})

if(!course){
  return res.status(401).json({errors : "cannot delete created by other admin"})
}
res.status(200).json({message : "course deleted sucessfuly"})


   } catch (error) {
    res.status(500).json({errors : "course deleted sucessfully"})
    console.log("error in the course deleting",error)
   }

}


export const getCourses = async (req,res) =>{

try {
  const courses = await Course.find({})
  res.status(201).json({ courses })



} catch (error) {
  res.status(500).json({errors : "error in getting courses"})
  console.log("error in getting courses",error)
}


}

export const courseDetails = async (req,res) =>{

  const {courseId} = req.params
  try {
    const course = await Course.findById({
      _id : courseId
    })
    if(!course){
      return res.status(401).json({error : "course not found"})
    }
    res.status(201).json({ course })
  } catch (error) {
    res.status(500).json({errors : "error in getting course"})
    console.log("error in getting course",error)
  }

}


import Stripe from "stripe"
import config from "../config.js";
const stripe = new Stripe(config.STRIPE_SECRET_KEY)

export const buyCourses = async (req,res) =>{

  const {userId} =req;
  const {courseId} = req.params;
  try {


    const course = await Course.findById(courseId)
    if(!course){
      return res.status(404).json({error : "course not found"})
    }

    const existingPurchase = await Purchase.findOne({userId,courseId})

    if(existingPurchase){
      return res.status(400).json({error : "course already purchased"})
    }


    //stripe payment code goes here

    const amount = course.price;
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      
      payment_method_types:["card"]
    });




   
    res.status(201).json({message : "course purchased successfully",
      course,
      clientSecret: paymentIntent.client_secret,
    })
   
    
  } catch (error) {
    res.status(500).json({errors : "error in buying course"})
    console.log("error in buying course",error)
  }
}