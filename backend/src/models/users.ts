import { model, Schema } from 'mongoose'
import {Iuser} from '../types/userdata'

const UserSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
        length:8
    }

}, { timestamps: true })


export default model<Iuser>('user', UserSchema)