import mongoose from "mongoose";
import { MONGO_URL } from "../constnats/env";


export const mongo=async()=>{
    try {
        await mongoose.connect(MONGO_URL)
        console.log("DB connected succesfully");
        
    } catch (error) {
        console.log("Error in the db connection",error);
        process.exit(1)
    }
}