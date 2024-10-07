import express from "express";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/Post.js";
import { verifyToken } from "../utils/VerifyToken.js";
const router=express.Router()
router.get("/",getPosts)
router.get("/:id",getPost)
router.post("/",verifyToken,addPost)
router.put("/:id",verifyToken,updatePost)
router.delete("/:id",verifyToken,deletePost)










export default router