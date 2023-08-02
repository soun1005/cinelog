import express from 'express';
import searchController from '../controllers/searchController.js';

const router = express.Router({ mergeParams: true });

// GET searched movies
router.get('/search', searchController.getSearchResult);

// GET movie details by id
router.get('/:id', searchController.getCredit);

export default router;
