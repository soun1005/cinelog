import express from 'express';

// controller functions
import { signupUser, loginUser } from '../controllers/userController.js';

const router = express.Router({ mergeParams: true });

// login route
// send post request body with email and password to DB
router.post('/login', loginUser);

// singup route
router.post('/signup', signupUser);

export default router;
