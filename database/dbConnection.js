import mongoose from "mongoose";

export function dbConnection() {
    mongoose.set('strictQuery', false)
    mongoose.connect('mongodb://127.0.0.1:27017/Notes').then(() => {
        console.log('database connected');
    }).catch((err) => {
        console.log('ERORR ', err);
    })
}