import SignupService from '../api/signupService';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { string } from 'yup';
import { useState } from 'react';
import eyeOpen from '../assets/eyeIcon.png';
import eyeClose from '../assets/eyeIconClosed.png';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
const usernameRules = /^[a-zA-Z0-9]{1,15}$/;
const nameRules = /^[A-Za-z]+$/;
// min 8characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const schema = yup
  .object({
    email: string().required('Required').email('This is not a validate email'),
    password: string().required('Required').matches(passwordRules, {
      message:
        'Min 8characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.',
    }),
    confirmPassword: string()
      .required('Required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
    username: string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(usernameRules, { message: 'Incorrect form of username!' }),
    firstname: string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(nameRules, { message: 'Name should only contain alphabets' }),
    lastname: string()
      .required('Required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .matches(nameRules, { message: 'Name should only contain alphabets' }),
  })
  .required();

const Signup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  // React hook form
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const { signup, error, isLoading } = SignupService();

  const onSubmit = async (data) => {
    await signup(data);
  };

  if (error) {
    console.log(error);
  }

  return (
    <div className="signup__container form page">
      <div className="form__container">
        <h2 className="form-title">Sign up</h2>

        <form className="signup__form" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="Email"
              placeholder="email"
              {...register('email')}
            />
          </div>
          <div className="error">
            {formState.errors.email?.message !== undefined
              ? `${formState.errors.email?.message}`
              : ''}
          </div>

          <div>
            <label className="form-label">Password</label>
            <div className="input-wrap">
              <input
                className="form-input"
                type={!isPasswordVisible ? 'password' : 'text'}
                placeholder="Password"
                {...register('password')}
              />
              <img
                className="eyes-icon"
                src={isPasswordVisible ? eyeOpen : eyeClose}
                alt="password-visible"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </div>
          </div>
          <div className="error">
            {formState.errors.password?.message !== undefined
              ? `${formState.errors.password?.message}`
              : ''}
          </div>

          <div>
            <label className="form-label">Confirm password</label>

            <input
              className="form-input"
              type={!isPasswordVisible ? 'password' : 'text'}
              placeholder="Confirm password"
              {...register('confirmPassword')}
            />
          </div>
          <div className="error">
            {formState.errors.confirmPassword?.message !== undefined
              ? `${formState.errors.confirmPassword?.message}`
              : ''}
          </div>

          <div>
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              placeholder="Username"
              {...register('username')}
            />
          </div>
          <div>
            <div className="error">
              {formState.errors.username?.message !== undefined
                ? `${formState.errors.username?.message}`
                : ''}
            </div>

            <label className="form-label">First name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Firstname"
              {...register('firstname')}
            />
          </div>
          <div className="error">
            {formState.errors.firstname?.message !== undefined
              ? `${formState.errors.firstname?.message}`
              : ''}
          </div>

          <div>
            <label className="form-label">Last name</label>
            <input
              type="text"
              className="form-input"
              placeholder="Lastname"
              {...register('lastname')}
            />
          </div>
          <div className="error">
            {formState.errors.lastname?.message !== undefined
              ? `${formState.errors.lastname?.message}`
              : ''}
          </div>

          <button disabled={isLoading} className="form-btn btnStyle specialBtn">
            <span>Sign up</span>
          </button>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
