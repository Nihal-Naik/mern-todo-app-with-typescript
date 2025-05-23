import express, { Router } from "express";
import { signup,login,logout, checkauth } from "../controller/auth.controller";
import { protectedroute } from "../middleware/protected.middleware";



const router=express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout',logout)
router.get('/checkauth',protectedroute,checkauth)

export default router