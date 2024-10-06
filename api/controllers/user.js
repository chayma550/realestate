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
        res.status(500).json({message:"failed to get user"})
    }  
}



export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const tokenUserId = req.userId; // Ensure req.userId is set via your verifyToken middleware
  const { password, avatar, ...inputs } = req.body;

  // Check if the user is authorized to update this profile
  if (id.toString() !== tokenUserId.toString()) {
    return res.status(401).json({ message: "Not authorized!" });
  }

  try {
    // Hash the new password if provided
    if (password) {
      inputs.password = await bcrypt.hash(password, 10);
    }

    // Perform the update operation with Prisma
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(avatar && { avatar }), // Update avatar only if provided
      },
    });

    // Return the updated user data
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update the user." });
  }
};


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