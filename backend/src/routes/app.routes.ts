import express from 'express'
import { protectedroute } from '../middleware/protected.middleware'
import { displaytodo,addtodo,deletetodo, updatestatus } from '../controller/app.controller'



const router=express.Router()

router.get('/todos',protectedroute,displaytodo)
router.post('/addtodo',protectedroute,addtodo)
router.delete('/deletetodo',protectedroute,deletetodo)
router.put('/todos/:id/status', protectedroute, updatestatus);

export default router