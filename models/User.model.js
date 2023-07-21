import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},{timestamps:true})

export const userModel=mongoose.model('user',userSchema);
