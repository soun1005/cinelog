import express from 'express';
import castController from '../controllers/cast.controller.js';

const router = express.Router({ mergeParams: true });

router.get('/cast/:id', castController.getCast);

export default router;
