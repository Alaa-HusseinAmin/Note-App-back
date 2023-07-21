import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    title:{type:String,required:true},
    content:{type:String,required:true},
    user:{type:String,required:true},
},
{
    versionKey:false,
}
    // addedBy: {
    //     type: mongoose.Types.ObjectId,
    //     ref:'user'
    // },
    
,{timestamps:true})

export const NoteModel=mongoose.model('note',noteSchema);
