// combine all routes here and export to app.js (the main file)

import express from 'express';
import searchMovieRoutes from './searchMovie.routes.js';
import userRoutes from './user.routes.js';

const router = express.Router();

router.use(searchMovieRoutes);
router.use(userRoutes);

export default router;
