import prisma from "../lib/prisma.js"


export const getChats = async (req, res) => {
    const tokenUserId = req.userId;
    try {
        let chats = await prisma.chat.findMany({
            where: {
                userIDs: {
                    hasSome: [tokenUserId]
                }
            }
        });

        // Extract receiverIds and filter out undefined values
        const receiverIds = chats.map(chat => chat.userIDs.find(id => id !== tokenUserId)).filter(Boolean);

        // Fetch all receiver details in parallel
        const receivers = await prisma.user.findMany({
            where: {
                id: {
                    in: receiverIds
                }
            },
            select: {
                id: true,
                username: true,
                avatar: true
            }
        });

        // Map receivers to chats
        chats = chats.map(chat => {
            const receiverId = chat.userIDs.find(id => id !== tokenUserId);
            const receiver = receivers.find(user => user.id === receiverId);
            return {
                ...chat,
                receiver: receiver || null 
            };
        });

        // Return response after all operations are complete
        res.status(200).json(chats);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to get chats!!" });
    }
}


export const getChat=async(req,res)=>{
    const tokenUserId=req.userId
    try{
        const chat=await prisma.chat.findUnique({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        })
        prisma.chat.update({
            where:{
                id:req.params.id
            },
            data:{
                seenBy: {
                    push: [tokenUserId],
                  },
            }
        })
        res.status(200).json(chat)
        
    }catch(err){
        console.log(err)
        res.status(200).json({message:"cannot find a chat!"})

    }
}

export const addChat=async(req,res)=>{
    const tokenUserId=req.userId
    try{
        const newChat=await prisma.chat.create({
            data:{
                userIDs:[tokenUserId,req.body.receiverId]
            }
              
        })
        res.status(200).json(newChat)

    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to create a chat!!"})

    }
}

export const readChat=async(req,res)=>{
    const tokenUserId=req.userId
    try{
        const chat=await prisma.chat.update({
            where:{
                id:req.params.id,
                userIDs:{
                    hasSome:[tokenUserId]
                }
            },
            data:{
                seenBy:{
                    push:[tokenUserId]
                }
            }
        })
        
        res.status(200).json(chat)

    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to read a chat!!"})

    }
}