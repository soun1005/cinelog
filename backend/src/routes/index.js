// combine all routes here and export to app.js (the main file)

import express from 'express';
import searchMovieRoutes from './searchMovieRoutes.js';

const router = express.Router();

router.use(searchMovieRoutes);

export default router;
