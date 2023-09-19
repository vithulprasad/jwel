import express from "express"
import { loginUser, registerUser,getUserProfile } from "../controllers/userController.js"
const router=express.Router()
router.post("/register",registerUser)
router.post("/login",loginUser)
router.get("/getProfile", getUserProfile)



export default router