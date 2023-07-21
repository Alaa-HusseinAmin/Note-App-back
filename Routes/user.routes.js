import bcrypt from 'bcrypt';
import express from "express";
import jwt from 'jsonwebtoken';
import { userModel } from '../models/User.model.js';

const userRouter = express.Router();

userRouter.get("/",(req,res)=>{
res.json("All the user")
})

userRouter.post("/register",async(req,res)=>{
    const {name,email,password}=req.body
    bcrypt.hash(password,5,async function(err,hash){
        if(err) return res.json({message:"something went wrong",status:0})
        try{
        let user = new userModel({name,email,password:hash})
        await user.save()
        res.json({
            message:"User Created",
            status:1
        })
        }catch(error){
            res.json({
                message:error.message,
                status:0
            })
        }
    })
})

userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    // let option ={
    //     // expiresIn:"sm"
    // }
        try{
        let data = await userModel.find({email})
        if(data.length>0){
        let token= jwt.sign({userId:data[0]._id},"Alaa")
            bcrypt.compare(password,data[0].password,function(err,result){
            if(err) return res.json({message:"Something went wrong"+err,status:0}) 
            if(result){
                res.json({
                    message:"User Logged in successfully",
                    token:token,
                    status:1
                })
            }else{
                res.json({
                        message:"Incorrect password",
                        status:0
                })
            }
            })
        }else{
            res.json({
                message:"User does not exist",
                status:0
            })
        }
        }catch(error){
            res.json({
                message:error.message,
                status:0
            })
        }

    
        })




export default userRouter;
