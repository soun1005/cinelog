import express from 'express';
import mainMoviesController from '../controllers/mainMovies.controller.js';

const router = express.Router({ mergeParams: true });

// GET movie info, credit info by id
router.get('/movies/nowplaying', mainMoviesController.getNowPlaying);
router.get('/movies/upcoming', mainMoviesController.getUpcoming);

export default router;
