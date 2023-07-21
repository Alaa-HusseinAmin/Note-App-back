import jwt from 'jsonwebtoken';
export function authenticator(req,res,next){
    const token=req.headers.authorization
    jwt.verify(token,"Alaa",(err,decode)=>{
        if(err) return res.json({
            message:"Token is not valid please login",
            status:2
        })
        if(decode){
        req.body.user=decode.userId
        next()
        }else{
            res.json({
                message:"Token is not valid please login",
                status:2
            })
        }
    })
}