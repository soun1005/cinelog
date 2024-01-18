import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import responseHandler from '../handlers/response.handler.js';

const createToken = (_id) => {
  // create token!!!!
  // first argument : object(=payload we create) -> nothing sensitive
  // second argument : secret part (save in .env first because it should be secret)
  // third argument : options (here, token expire in 3days)
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, confirmPassword, username, firstname, lastname } =
    req.body;

  try {
    // User = the model that i created
    const user = await User.signup(
      email,
      password,
      confirmPassword,
      username,
      firstname,
      lastname
    );

    const token = createToken(user._id);
    // const response = { email, token, username, firstname, lastname };
    // responseHandler.ok(res, response);
    res.status(200).json({ email, token, username, firstname, lastname });
  } catch (error) {
    // responseHandler.badrequest(error, error.message);
    res.status(400).json({ error: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  // grab email and pw from request
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);

    // const response = { email, token };
    // when it succeed, set status as 200 and json data(which are email and user)
    res.status(200).json({ email, token });
  } catch (error) {
    // responseHandler.badrequest(error, error.message);
    res.status(400).json({ error: error.message });
  }
};

export { loginUser, signupUser };
