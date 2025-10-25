import express from 'express';
import { signUp } from '../controller/authController.js';
import { logIn } from '../controller/authController.js';
import { logOut } from '../controller/authController.js';

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', logIn);
router.post('/logout', logOut);

export default router;