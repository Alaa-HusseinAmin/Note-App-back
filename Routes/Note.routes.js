import express from "express";
import jwt from 'jsonwebtoken';
import { authenticator } from './../middleware/authentication.js';
import { NoteModel } from './../models/Notes.model.js';


const noteRouter = express.Router();
noteRouter.use(authenticator)




noteRouter.get("/",async(req,res)=>{
    let token = req.headers.authorization
    jwt.verify(token,"Alaa",async(err,decode)=>{
        try{
            let data=await NoteModel.find({user:decode.userId})
            res.json({
                data:data,
                message:"Success",
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



noteRouter.post("/create",async(req,res)=>{
    try{
        let note = new NoteModel(req.body)
        await note.save()
        res.json({
            message:"Note created",
            status:1
        })
    }catch(error){
        res.json({
            message:error.message,
            status:0
        })
    }
})


noteRouter.patch("/",async(req,res)=>{
    let {id}=req.headers
    try{
        await NoteModel.findByIdAndUpdate({_id:id},req.body)
        res.json({
            message:"Note updated",
            status:1
        })
    }catch(error){
        res.json({
            message:error.message,
            status:0
        })
    }
})

noteRouter.delete("/",async(req,res)=>{
    let {id}=req.headers
    try{
        await NoteModel.findByIdAndDelete({_id:id})
        res.json({
            message:"Note deleted",
            status:1
        })
    }catch(error){
        res.json({
            message:error.message,
            status:0
        })
    }
})
export default noteRouter;
