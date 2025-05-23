import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { mongo } from './lib/db.lib'
import authroutes from './routes/auth.routes'
import approutes from './routes/app.routes'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { CLIENT_URL, PORT,NODE_ENV } from './constnats/env'
import path from 'path'


const app=express()
app.use(express.json())
app.use(cookieParser())

if (NODE_ENV !== 'production') {
	app.use(cors({
		origin: CLIENT_URL,
		credentials: true,
	}));
}
const port = PORT||3000

app.use('/api/auth',authroutes)
app.use('/api/app',approutes)



if (NODE_ENV === 'production') {
	const frontendPath = path.join(__dirname, '../../frontend/dist'); // Adjust path based on structure
	app.use(express.static(frontendPath));
	app.get('*', (req, res) => {
		res.sendFile(path.join(frontendPath, 'index.html'));
	});
}
app.listen(port, async() => {
  console.log(`Example app listening on port ${port}`)
  await mongo()
})