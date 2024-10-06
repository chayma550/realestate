import express from "express";
import { ShouldbeAdmin, ShouldbeLogin } from "../controllers/test.js";

const router=express.Router()
router.get("/should-be-login",ShouldbeLogin)
router.get("/should-be-admin",ShouldbeAdmin)






export default router