import express from "express";
import { deleteUser, getNotificationNumber, getUser, getUsers, profilePosts, savePost, updateUser } from "../controllers/user.js";

const router=express.Router()

router.get("/",getUsers)
router.get("/:id",getUser)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)
router.post("/save",savePost)
router.get("/profilePosts",profilePosts)
router.get("/notification",getNotificationNumber)






export default router