import { Itodo } from '../types/tododata';
import { model, Schema } from 'mongoose'

const todoSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    useremail:{
        type:String,
    },
    status: {
        type: Boolean,
        required: true
    }

}, { timestamps: true })


export default model<Itodo>('todo', todoSchema)