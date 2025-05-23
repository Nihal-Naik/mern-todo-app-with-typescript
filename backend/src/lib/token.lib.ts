import jwt from 'jsonwebtoken'
import { SECRET } from '../constnats/env'
import { Response } from 'express'
import { ObjectId } from 'mongoose'

export const generatetoken=(userid:ObjectId,res:Response)=>{
    const token=jwt.sign({userid},SECRET,{expiresIn:"7d"})

    res.cookie("app",token,{
        maxAge:604800000,
        httpOnly:true,
        sameSite:"strict",
        secure:false,
    })    
}