import cors from "cors";
import dotenv from "dotenv";
import express from 'express';
import noteRouter from "././Routes/Note.routes.js";
import userRouter from "././Routes/user.routes.js";
import { dbConnection } from "./database/dbConnection.js";
dotenv.config()

const app = express()
const port = 4000

app.use(cors())
app.use(express.json())    
app.use("/user",userRouter)
app.use("/note",noteRouter)


app.get('/',(req,res)=>{
    res.json({
        message:"api is working now"
    })
})


dbConnection()
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


