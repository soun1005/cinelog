// combine all routes here and export to app.js (the main file)

import express from 'express';
import searchMovieRoutes from './searchMovie.routes.js';
import userRoutes from './user.routes.js';
import mainMoviesRoutes from './mainMovies.routes.js';
import reviewRoutes from './reviews.routes.js';
import profileRoutes from './profile.routes.js';
import favouriteRoutes from './favouriteList.routes.js';

const router = express.Router();

router.use(searchMovieRoutes);
router.use(userRoutes);
router.use(mainMoviesRoutes);
router.use(reviewRoutes);
router.use(profileRoutes);
router.use(favouriteRoutes);

export default router;
