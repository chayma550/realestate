import express from "express";
import { addChat, getChat, getChats, readChat } from "../controllers/chat.js";
import { verifyToken } from "../utils/VerifyToken.js";
const router=express.Router()
router.get("/",verifyToken,getChats)
router.get("/:id",verifyToken,getChat)
router.post("/",verifyToken,addChat)
router.put("/read/:id",verifyToken,readChat)




export default router