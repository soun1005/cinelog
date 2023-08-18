import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Review from '../models/review.model.js';
import fetchMovieInfoById from '../resolver/fetchMovieInfoById.js';

// load user
const loadUser = async (req, res) => {
  try {
    // grab token from request
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decodedToken = jwt.decode(token);
    const user = await User.findOne({ _id: decodedToken });
    if (user) {
      // userName
      // userName 반환 -> 프론트에서 가져가는 내용
      res.status(200).json(user.username);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
    // res.body = user.toObject()
    // res.status(200).json({ userName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// load reviews and the movie info that matches the review by id
const loadReviews = async (req, res) => {
  try {
    // grab token from request
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decodedToken = jwt.decode(token);
    const review = await Review.find({ userId: decodedToken });
    // console.log(review);
    if (review) {
      // const reviews = res.status(200).json(review);

      const movieId = review.map((review) => {
        return review.mediaId;
      });

      const movieDataPromises = movieId.map(
        async (movieId) => await fetchMovieInfoById(movieId)
      );

      const movieData = await Promise.all(movieDataPromises);
      return res.status(200).json({ reviews: review, movieData });
    } else {
      res.status(404).json({ error: 'Reviews not found' });
    }
    // res.body = user.toObject()
    // res.status(200).json({ userName });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default { loadUser, loadReviews };
