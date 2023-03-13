import express from 'express';
import { signupUser,loginUser } from '../controller/user-controller.js';
import { uploadImage, getImage } from '../controller/image-controller.js';
import { createPost ,getAllPosts , getPost} from '../controller/post-controller.js';
import { authenticateToken } from '../controller/jwt-controller.js';
import upload from '../utils/upload.js'

const router = express.Router();

router.post('/signup', signupUser) // post function takes 3 argumrnts 1 end point of api,second middleware(optional) ,third call back function or api call
router.post('/login',loginUser);

router.post('/file/upload',upload.single('file') ,uploadImage); // new post image api call
router.get('/file/:filename', getImage); // getting image from db

router.post('/create', authenticateToken ,createPost);
router.get('/posts',authenticateToken, getAllPosts);
router.get('/post/:id', authenticateToken, getPost); // to open post in detailed view the correct post
// getPost is API

export default router;