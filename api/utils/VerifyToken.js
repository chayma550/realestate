import Jwt from "jsonwebtoken"

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return  res.status(401).json({message:"You are not authenticated!"});
    }
    Jwt.verify(token,process.env.JWT_SECRET_KEY,(err,payload)=>{
        if(err) res.status(403).json({message:"Token is not valid!"});
        req.userId=payload.id;
        next();
    })
}
