import jwt, { JwtPayload } from 'jsonwebtoken'
import users from '../models/users'
import { Request,Response,NextFunction } from 'express'
import { SECRET } from '../constnats/env'


export const protectedroute=async (req:Request,res:Response,next:NextFunction):Promise<void> => {
    try {
        const cookie=req.cookies.app
        
        if(!cookie) {res.status(400).json({message:"Unauthorized"}); return}
        
        const verifycookie=jwt.verify(cookie,SECRET) as JwtPayload
        if(!verifycookie){ res.status(400).json({
            message:"Unauthorised"
        }); return}
        const checkuser=await users.findOne({_id:verifycookie.userid}).select("-password")
        if(!checkuser){ res.status(404).json({message:"User not found"}); return}
        req.user=checkuser   
        next()
    } catch (error) {
        console.log("error in protected controller",error);
        res.status(500).json({messgae:"Internal server error"})
    }
}