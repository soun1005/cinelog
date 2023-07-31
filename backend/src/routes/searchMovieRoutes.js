import express from 'express';
import searchController from '../controllers/searchController.js';

const router = express.Router({ mergeParams: true });

// GET searched movies
router.get('/search', searchController.getSearchResult);

export default router;
