import { Document } from "mongoose";

export interface Itodo extends Document{
    name:string
    email:string
    status:boolean

}