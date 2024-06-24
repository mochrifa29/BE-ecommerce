import express from 'express'
import { registerUser,loginUser, getUser, logout } from '../controller/authController.js';
import { protectMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

//post /api/v1/auth/register
router.post('/register',registerUser)

//post /api/v1/auth/login
router.post('/login',loginUser)

//get /api/v1/auth/logout
router.get('/logout',protectMiddleware,logout)

//get /api/v1/auth/getUser
router.get('/getUser',protectMiddleware,getUser)

export default router