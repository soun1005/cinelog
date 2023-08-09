import mongoose, { Schema } from 'mongoose';
// to hash our password(not to expose outside)
import bcrypt from 'bcrypt';
import validator from 'validator';

// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

// static signup method
// 'this' doesnt work with const so need to use function!
userSchema.statics.signup = async function (
  email,
  password,
  username,
  firstname,
  lastname
) {
  // validation
  if (!email || !password || !firstname || !lastname || !username) {
    // 이 이러들은 나중에 userController의 catch문에서 에러 메시지로 뜨게된다
    throw Error('All fields must be filled');
  }

  // validator package -> it returns true or false
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  // 아래의 코드들, validation 되지 않으면 실행되지 않아도 되기 때문에
  // this = user
  const emailExist = await this.findOne({ email });
  const usernameExist = await this.findOne({ username });

  if (emailExist) {
    throw Error('Email already in use');
  }

  if (usernameExist) {
    throw Error('Username already in use');
  }

  // generate salt to hash passwword
  const salt = await bcrypt.genSalt(10);
  // first argument is password that user type
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    username,
    firstname,
    lastname,
  });

  return user;
};

// static login function
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    // 이 이러들은 나중에 userController의 catch문에서 에러 메시지로 뜨게된다
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }

  // comparing two password
  // first argument = password, 2nd argument= hashed pw
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return user;
};

const userModel = mongoose.model('User', userSchema);
export default userModel;
