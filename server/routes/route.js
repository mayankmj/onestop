import express from 'express';
import { signupUser,loginUser } from '../controller/user-controller.js';
const router = express.Router();

router.post('/signup', signupUser) // post function takes 2 argumrnts 1 end point of api second call back function or api call
router.post('/login',loginUser);

export default router;