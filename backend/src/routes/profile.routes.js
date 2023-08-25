import express from 'express';
import profileController from '../controllers/profile.controller.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router({ mergeParams: true });

router.use(requireAuth);
// GET user information to load them on profile page
router.post('/profile', profileController.loadUser);

export default router;
