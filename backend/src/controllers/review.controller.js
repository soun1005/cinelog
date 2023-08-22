import Review from '../models/review.model.js';
import mongoose from 'mongoose';

// create a review
const createReview = async (req, res) => {
  const { reviewTitle, date, comment, ratings, mediaId } = req.body;

  const userId = req.user._id;

  // console.log(userId);
  // return;

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

// delete a review
const deleteReview = async (req, res) => {
  console.log(typeof req.params.id);

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
    console.log(id);
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

/* 
module.exports.updateUserProfile = async serviceData => {
  try {
    const jwtToken = serviceData.headers.authorization.split('Bearer')[1].trim()
    const decodedJwtToken = jwt.decode(jwtToken)
    const user = await User.findOneAndUpdate(
      { _id: decodedJwtToken.id },
      {
        firstName: serviceData.body.firstName,
        lastName: serviceData.body.lastName
      },
      { new: true }
    )

    if (!user) {
      throw new Error('User not found!')
    }

    return user.toObject()
  } catch (error) {
    console.error('Error in userService.js', error)
    throw new Error(error)
  }
}

*/

export default {
  createReview,
  deleteReview,
  editReview,
};
