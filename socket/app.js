import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: [
            "https://realestateapplicationweb.netlify.app", 
            "https://realestate-1-gnii.onrender.com", 
            "http://localhost:3000" 
        ],
        methods: ["GET", "POST"], // Specify allowed methods if needed
        credentials: true // Allow credentials if needed
    }
});

let onlineUser = [];

const addUser = (userId, socketId) => {
    const userExists = onlineUser.find((user) => user.userId === userId);
    if (!userExists) {
        onlineUser.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    socket.on("new user", (userId) => {
        addUser(userId, socket.id);
    });

    socket.on("send message", ({ receiverId, data }) => {
        const receiver = getUser(receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("get message", data);
        }
    });

    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
});

io.listen(4000);
