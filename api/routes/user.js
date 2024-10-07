import express from "express";
import { deleteUser, getNotificationNumber, getUser, getUsers, profilePosts, savePost, updateUser } from "../controllers/user.js";
import { verifyToken } from "../utils/verifyToken.js";

const router=express.Router()

router.get("/",getUsers)
router.get("/:id",getUser)
router.put("/:id",verifyToken,updateUser)
router.delete("/:id",verifyToken,deleteUser)
router.post("/save",verifyToken,savePost)
router.get("/profilePosts",verifyToken,profilePosts)
router.get("/notification",getNotificationNumber)






export default router