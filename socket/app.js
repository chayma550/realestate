import {Server} from "socket.io"

const io=new Server({
    cors:{
        origin:"http://localhost:3000"
    }
})

let onlineUser=[]

const addUser=(userId,socketId)=>{
    const userExists=onlineUser.find((user)=>user.userId===userId)
    if(!userExists){
        onlineUser.push({userId,socketId})
    }
}
const removeUser=(socketId)=>{
    onlineUser=onlineUser.filter((user)=>user.socketId!==userId)
}
const getUser=(userId)=>{
    return onlineUser.find((user)=>user.userId===userId)
}
io.on("connection",(socket)=>{
    socket.on("new user",(userId)=>{
        addUser(userId,socket.id)
    })
socket.on("send message",({receiverId,data})=>{
    const receiver=getUser(receiverId)
    io.to(receiver.socketId).emit("get message",data)
})



    socket.disconnect("disconnect",()=>{
        removeUser(socket.id)

    })
})
io.listen("4000")