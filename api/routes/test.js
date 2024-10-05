import express from "express";
import { ShouldbeAdmin, ShouldbeLogin } from "../controllers/test.js";
import { verifyToken } from "../utils/VerifyToken.js";

const router=express.Router()
router.get("/should-be-login",verifyToken,ShouldbeLogin)
router.get("/should-be-admin",ShouldbeAdmin)






export default router