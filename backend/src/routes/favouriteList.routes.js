import express from 'express';
import favouriteController from '../controllers/favouriteList.controller.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router({ mergeParams: true });

router.use(requireAuth);
// POST a new review
router.post('/favourite', favouriteController.createFavourite);
router.post('/favourite/status', favouriteController.checkFavouriteStatus);
router.delete('/favourite/:id', favouriteController.deleteFavourite);

export default router;
