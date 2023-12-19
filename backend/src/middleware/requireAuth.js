import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const requireAuth = async (req, res, next) => {
  // 'next' function to move onto next middleware

  // 1. verify authentication
  // grab auth property from header
  const { authorization } = req.headers;
  // the 'authorization' result will be string like this 'Bearer deslkgalsdjaglaks'
  // so we need to split the string, second one is token

  // need to check if header exist first
  //   토큰이 없어?? -> 에러!
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' });
  }
  // if there is token, get only token, get rid of 'bearer'
  const token = authorization.split(' ')[1];

  try {
    // try to verify token
    // 1. grabs the ID from token
    const { _id } = jwt.verify(token, process.env.SECRET);
    // 2. use the id and try to find the user in database
    // 'User.findOne' finds user and return whole object.
    // So use 'select' to just grab user id
    req.user = await User.findOne({ _id }).select('_id');
    // 'next'function allows it move onto the next function
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: 'Request is not authorized' });
  }
};

export default requireAuth;
