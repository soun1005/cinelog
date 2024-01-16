import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import responseHandler from '../handlers/response.handler.js';

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
      res.status(200).json({ username: user.username, userId: user._id });
    } else {
      responseHandler.badrequest(error);
      // res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    responseHandler.badrequest(error, error.message);
    // res.status(400).json({ error: error.message });
  }
};

export default { loadUser };
