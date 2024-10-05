import prisma from "../lib/prisma.js"
import bcrypt from "bcrypt";


export const getUsers=async(req,res,next)=>{
try{
    const users=await prisma.user.findMany();
    res.status(200).json(users)

}catch(err){
    console.log(err)
    res.status(500).json({message:"failed to update"})
}
}






export const getUser=async(req,res,next)=>{
    try{
        const user=await prisma.user.findUnique({where:{id:req.params.id}})
        res.status(200).json(user)

    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to update"})
    }  
}


export const updateUser=async(req,res,next)=>{
    const id=req.params.id;
    const tokenUserId=req.userId;
    const{password,avatar,...inputs}=req.body;
    if(id!==tokenUserId){
        return res.status(401).json({message:"not authorized!!"})
    }
    
let updatePassword=null

try{

    if(password){
        updatePassword=await bcrypt.hash(password,10)
    }
    const updateUser=await prisma.user.update({ where: 
        { id},
        data: {
            ...inputs,
            ...(updatePassword && {password:updatePassword}),
            ...(avatar && {avatar})

        }})
        res.status(200).json(updateUser);
   

}catch(err){
   
}    
}

export const deleteUser=async(req,res,next)=>{
    try{
        const deleteUser=await prisma.user.delete({where:{id:req.params.id}})
        res.status(200).json({message:"delete with success!!"})
   
    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to delete"})
    } 
}
export const savePost=async(req,res,next)=>{
    const tokenUserId=req.userId;
    const postId=req.body.postId
    try{
        const savePost=await prisma.savedPost.findUnique({
            where:{
                userId_postId:{
                    userId:tokenUserId,
                    postId
                }
            }
        });
        if(savePost){
            await prisma.savedPost.delete({
                where:{
                    id:savePost
                }
            })
            res.status(200).json({message:"post removed from saved list!!"})

        }
        else{
            await prisma.savedPost.create({
                data:{
                    userId:tokenUserId,
                    postId
                }
            })
            res.status(200).json({message:"post saved !!"})

        }
    }catch(err){
        console.log(err)
    }
}

export const profilePosts = async (req, res) => {
    const tokenUserId = req.userId;
    try {
      const userPosts = await prisma.post.findMany({
        where: { userId: tokenUserId },
      });
      const saved = await prisma.savedPost.findMany({
        where: { userId: tokenUserId },
        include: {
          post: true,
        },
      });
  
      const savedPosts = saved.map((item) => item.post);
      res.status(200).json({ userPosts, savedPosts });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get profile posts!" });
    }
  };

  export const getNotificationNumber = async (req, res) => {
    const tokenUserId = req.userId;
    try {
      const number = await prisma.chat.count({
        where: {
          userIDs: {
            hasSome: [tokenUserId],
          },
          NOT: {
            seenBy: {
              hasSome: [tokenUserId],
            },
          },
        },
      });
      res.status(200).json(number);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get profile posts!" });
    }
  };