import express from 'express';
import reviewController from '../controllers/review.controller.js';

const router = express.Router({ mergeParams: true });

// POST a new review
router.post('/review', reviewController.createReview);

export default router;
