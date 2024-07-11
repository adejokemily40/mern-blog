import express from 'express';
   
import { getAllUser, login, signup } from '../controllers/user-controller.js';
const loginRouter = express.Router();


loginRouter.get('/', getAllUser )

loginRouter.post('/signup', signup)

loginRouter.post('/login', login)
export default loginRouter