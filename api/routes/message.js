import express from "express";
import { addMessage } from "../controllers/message.js";
import { verifyToken } from "../utils/VerifyToken.js";

const router=express.Router()

router.post("/:chatId",verifyToken,addMessage)




export default router