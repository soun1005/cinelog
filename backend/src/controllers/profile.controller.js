import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import Review from '../models/review.model.js';

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

const loadReviews = async (req, res) => {
  try {
    // grab token from request
    const token = req.headers.authorization.split('Bearer')[1].trim();
    const decodedToken = jwt.decode(token);
    const review = await Review.find({ userId: decodedToken });
    console.log(review);
    if (review) {
      // userName
      // userName 반환 -> 프론트에서 가져가는 내용
      res.status(200).json(review);
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
