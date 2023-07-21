import { userModel } from '../../../models/User.model.js';
import { NoteModel } from './../../../models/Notes.model.js';



export const createNote = async (req, res) => {
    const { title,content,email,addedBy} = req.body

    let isFound = await userModel.findOne({ email });
    if (isFound) {
        await NoteModel.insertMany({title,content,addedBy})
        res.json({ message: 'Note Added'});
    } else {
      res.json('Account not found',404)
    }
}



export const getAllNotes = async (req, res) => {
    let notes = await NoteModel.find({}).populate('addedBy')
    res.json({ message: "success", notes })
    }
    


export const getNoteById = async (req, res) => {
        const {_id}=req.body
        let Notes = await NoteModel.findById({_id}).populate('addedBy')
        res.json({ message: "success", Notes })
    }
    
export const UpdateNote = async (req, res) => {
    const { _id ,title,content } = req.body
    let isFound = await NoteModel.findOne({ _id })
    if (isFound) {
        let Note = await NoteModel.findOneAndUpdate(
            {_id},
            { title,content},
            { new: true }
          );
          res.json({ message: "success", Note});  
    } else {
        res.json({ message: 'Note not found' })
    }
}


export const DeleteNote = async (req, res) => {
    const { _id } = req.body
    let isFound = await NoteModel.findOne({ _id })
    if (isFound) {
    await NoteModel.findByIdAndDelete({ _id});
    res.json({ message: "success" }); 
    } else {
        res.json({ message: 'Note not found' })
    }  
}


    