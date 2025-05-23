import bcrypt from 'bcrypt'
import { Iuser } from '../types/userdata'
import users from '../models/users'
import { Request, Response} from 'express'
import { generatetoken } from '../lib/token.lib'
import { ObjectId } from 'mongoose'


export const signup=async(req:Request,res:Response):Promise<void>=>{
    try {
        const {name,email,password} = req.body as Pick<Iuser, 'name' | 'email' | 'password'>

        const emailexist=await users.findOne({email})
        if (emailexist) {
            res.status(409).json({ message: 'Email already exists' });
            return;
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newuser: Iuser = new users({
            name,email,password:hashedPassword
        }) 

        await newuser.save()
        

        res.status(201).json({ message: 'User created successfully'})
    } catch (error) {
        console.log("signup controller error ",error)
        res.status(500).json({message:"Internal server error"})
    }
}

export const login=async(req:Request,res:Response):Promise<void>=>{
    try {
        const {email,password} = req.body as Pick<Iuser,'email' | 'password'>
        
        const checkemail=await users.findOne({email})
        if (!checkemail){ res.status(400).json({message:"Invalid credentails"}); return}
        
        const checkpass=await bcrypt.compare(password,checkemail.password)
        if (!checkpass) {res.status(400).json({message:"Invalid credentials"}); return}

        generatetoken(checkemail._id as ObjectId,res)

        res.status(200).json({message:"Login successfull"})
    } catch (error) {
        console.log("login controller error ",error)
        res.status(500).json({message:"Internal server error"})
    }
}
export const logout=async(req:Request,res:Response)=>{
    try {
        res.cookie("app","",{
            maxAge:0
        })
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Logout controller error ",error)
        res.status(500).json({message:"Internal server error"})
    }
}
export const checkauth=(req:Request,res:Response)=>{
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log("error in checkauth controller",error);
        res.status(500).json({message:"Internal server error"})
    }
}