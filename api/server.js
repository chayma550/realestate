import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors"
import authRoute from "./routes/auth.js"
import testRoute from "./routes/test.js"
import usersRoute from "./routes/user.js"
import postsRoute from "./routes/post.js"
import chatRoute from "./routes/chat.js"
import messageRoute from "./routes/message.js"



const app=express();
dotenv.config();

//connect to mongoose:
mongoose.connect(process.env.DATABASE_URL).then(()=>
    console.log("DB connecting  ")).catch((err)=>{
      console.log(err)  
    })

//middlewars:

// Configure CORS
const corsOptions = {
  origin: "https://realestateapplicationweb.netlify.app"|| "http://localhost:3000", 
  credentials: true,
};
app.use(cors(corsOptions)); 

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json())

app.use("/api/auth",authRoute)
app.use("/api/test",testRoute)
app.use("/api/users",usersRoute)
app.use("/api/posts",postsRoute)
app.use("/api/chats/",chatRoute)
app.use("/api/messages",messageRoute)





 //connect to server
app.listen(process.env.PORT||8000,()=>{
    console.log("server run on port 8000")
})