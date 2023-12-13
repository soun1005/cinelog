import Review from '../models/review.model.js';
import jwt from 'jsonwebtoken';
import fetchMovieInfoById from '../resolver/fetchMovieInfoById.js';

// create a review
const createReview = async (req, res) => {
  const { reviewTitle, date, comment, ratings, mediaId, title } = req.body;

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
      title,
    });
    res.status(200).json(review);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// load reviews and the movie info that matches the review by id
// fetch movie information and credit here when it's called
const loadReviews = async (req, res) => {
  try {
    // grab token from request
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decodedToken = jwt.decode(token);

    const page = parseInt(req.query.page || '0');
    // 5 reviews in each page
    const PAGE_SIZE = 5;
    // front -> /loadReviews?page=1&sortBy=reviewDate&sortOrder=desc
    const sortBy = req.query.sortBy || 'date'; // Default to sorting by reviewedDate
    const sortOrder = req.query.sortOrder || 'desc'; // Default to descending order

    const sortField = sortBy === 'date' ? 'date' : 'ratings';
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    const title = req.query.title || '';

    const review = await Review.find({
      userId: decodedToken,
      title: { $regex: title, $options: 'i' },
    })
      .sort({ [sortField]: sortDirection })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);

    if (review) {
      const movieId = review.map((review) => {
        return review.mediaId;
      });

      const totalCount = await Review.countDocuments({
        userId: decodedToken,
        title: { $regex: title, $options: 'i' },
      });

      const movieDataPromises = movieId.map(
        async (movieId) => await fetchMovieInfoById(movieId)
      );

      const movieData = await Promise.all(movieDataPromises);

      return res.status(200).json({
        reviews: review,
        movieData,
        // total numbers of pages
        totalPages: Math.ceil(totalCount / PAGE_SIZE),
        totalCount,
      });
    } else {
      res.status(404).json({ error: 'Reviews not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// check if review already exist
const checkReviewStatus = async (req, res) => {
  const { mediaId } = req.body;
  const userId = req.user._id;

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

export default {
  createReview,
  loadReviews,
  checkReviewStatus,
  deleteReview,
  editReview,
};
