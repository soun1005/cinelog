import express from 'express';
import reviewController from '../controllers/review.controller.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router({ mergeParams: true });

router.use(requireAuth);
// POST a new review
router.post('/review', reviewController.createReview);
router.post('/review/status', reviewController.checkReviewStatus);
router.delete('/review/:id', reviewController.deleteReview);
router.put('/review/:id', reviewController.editReview);

export default router;
