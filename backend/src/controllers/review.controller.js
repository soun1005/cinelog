import ReviewModel from '../models/review.model.js';
import mongoose from 'mongoose';

// create a review
const createReview = async (req, res) => {
  const { title, date, comment, ratings, mediaId } = req.body;

  const userId = req.user._id;

  // console.log(userId);
  // return;

  let emptyFields = [];

  if (!title) {
    emptyFields.push('title');
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
    const review = await ReviewModel.create({
      title,
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

// get all reviews

// get a single review

// delete a review

export default {
  createReview,
};
