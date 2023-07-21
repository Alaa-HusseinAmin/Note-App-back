import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../../models/User.model.js";
import { catchAsyncErr } from "../../utils/catchErr.js";


export const signUp = catchAsyncErr(async (req, res) => {
    const { name, email, password} = req.body;
    let user = await userModel.findOne({ email });
    if (user) {
      res.json({ message: "email already in use" });
    } else {
      let hash = bcrypt.hashSync(password, 8);
      await userModel.insertMany({
        name,
        email,
        password: hash,
      });
      res.json({ message: "success" });
    }
  })



export const signIn = catchAsyncErr(async (req, res) => {
    const { _id, email, name, password } = req.body;
    let isFound = await userModel.findOne({ email });
    if (isFound) {
      const match = await bcrypt.compare(password, isFound.password);
  
      if (match) {
        let token = jwt.sign(
          {
            name: isFound.name,
            userId: isFound._id,
            email: isFound.email,
            role: isFound.role,
          },
          "alaa"
        );
        res.json({ message: "login", token });
      } else {
        res.json({ message: "password incorrect" });
      }
    } else {
      res.json({ message: "Account not found" });
    }
  }) 



export const Updateuser =catchAsyncErr(async (req, res) => {
    const {_id,email, name} = req.body;
    // const {email, name} = req.body;
    // const { _id: id}=req.userId;
    let isFound = await userModel.findOne({ email });
    if (isFound) {
      let user = await userModel.findByIdAndUpdate(
         { _id},
        // { _id: id },
        {name},
        { new: true }
      );
      res.json({ message: "success", user });
    } else {
      res.json('Account not found',404)
    }
  })




export const Deleteuser = catchAsyncErr(async (req, res) => {
    const { _id} = req.body;
    // const { _id: id}=req.userId;
    let isFound = await userModel.findOne({ _id });
    if (isFound) {
      await userModel.findByIdAndDelete({ _id});
      res.json({ message: "success" });
    } else {
      res.json({ message: "Account not found" });
    }
  })


  export const getuser = async (req, res) => {
    const { _id } = req.body
        let users = await userModel.findById({_id});
        res.json({ message: "success", users });
}

    
export const getAllusers = async (req, res) => {
  let users = await userModel.find();
  res.json({ message: "success", users });
};
  