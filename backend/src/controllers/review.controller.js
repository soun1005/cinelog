import Review from '../models/review.model.js';
import jwt from 'jsonwebtoken';
import fetchMovieInfoById from '../resolver/fetchMovieInfoById.js';

// create a review
const createReview = async (req, res) => {
  const { reviewTitle, date, comment, ratings, mediaId } = req.body;

  const userId = req.user._id;

  let emptyFields = [];

  if (!reviewTitle) {
    emptyFields.push('reviewTitle');
  }
  if (!date) {
    emptyFields.push('date');
  }
  if (!comment) {
    emptyFields.push('comment');
  }
  if (!ratings) {
    emptyFields.push('ratings');
  }
  if (!mediaId) {
    emptyFields.push('mediaId');
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: 'Please fill in all the fields', emptyFields });
  }

  // add data to db
  try {
    const review = await Review.create({
      reviewTitle,
      date,
      comment,
      ratings,
      mediaId,
      userId,
    });
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// check if review already exist
const checkReviewStatus = async (req, res) => {
  const { mediaId } = req.body;
  const userId = req.user._id;

  // add data to db
  try {
    const review = await Review.findOne({
      mediaId,
      userId,
    });

    if (review) {
      res.status(200).json({ hasReview: true });
    } else {
      res.status(200).json({ hasReview: false });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete a review
const deleteReview = async (req, res) => {
  // console.log(typeof req.params.id);

  try {
    const { id: mediaId } = req.params;
    const result = await Review.deleteOne({ mediaId: mediaId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'No such review' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(404).json({ error: 'No such review' });
  }
};

// edit review
const editReview = async (req, res) => {
  // console.log(req.body);

  try {
    // movie id
    const { id } = req.params;
    // console.log(id);
    const result = await Review.findOneAndUpdate({ mediaId: id }, req.body, {
      new: true,
    });
    res.status(200).json(result);
    console.log('Update succeeded');
  } catch (error) {
    res.status(404).json({ error: 'Review update failed' });
    console.log(error);
  }
};

// load reviews and the movie info that matches the review by id
// fetch movie information and credit here when it's called
const loadReviews = async (req, res) => {
  const page = parseInt(req.query.page || '0');
  // 5 reviews in each page
  const PAGE_SIZE = 5;

  try {
    // grab token from request
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decodedToken = jwt.decode(token);

    const review = await Review.find({ userId: decodedToken })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    if (review) {
      const movieId = review.map((review) => {
        return review.mediaId;
      });

      const total = await Review.find({ userId: decodedToken }).countDocuments(
        {}
      );

      const movieDataPromises = movieId.map(
        async (movieId) => await fetchMovieInfoById(movieId)
      );

      const movieData = await Promise.all(movieDataPromises);

      return res.status(200).json({
        reviews: review,
        movieData,
        // total numbers of pages
        total: Math.ceil(total / PAGE_SIZE),
        dataLength: total,
      });
    } else {
      res.status(404).json({ error: 'Reviews not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  createReview,
  checkReviewStatus,
  deleteReview,
  editReview,
  loadReviews,
};
