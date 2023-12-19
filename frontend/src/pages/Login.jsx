import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/features/authSlice';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { string } from 'yup';
import BtnWithLink from '../components/BtnWithLink';
import eyeOpen from '../assets/eyeIcon.png';
import eyeClose from '../assets/eyeIconClosed.png';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const schema = yup
  .object({
    email: string().required('Required').email('This is not a validate email'),
    password: string().required('Required').matches(passwordRules, {
      message: 'Password incorrect',
    }),
  })
  .required();

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const loginError = useSelector((state) => state.auth.loginError);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      // if there is token(when logged in) -> redirect to main page for now
      navigate('/');
    }
  }, [navigate, token]);

  const tokenExist = token;

  return (
    <div className="login__container form page fullPage">
      <div className="form__container">
        <h2 className="form-title">Log in</h2>
        <form
          className="login-form form-wrap"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="form-label">Email</label>
            <input
              {...register('email')}
              placeholder="Email"
              className="form-input"
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
                type={!isPasswordVisible ? 'password' : 'text'}
                className="form-input"
                {...register('password')}
                placeholder="password"
              />
              <img
                className="eyes-icon"
                src={isPasswordVisible ? eyeOpen : eyeClose}
                alt="password-visible"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </div>
            <div className="error">
              {formState.errors.password?.message !== undefined
                ? `${formState.errors.password?.message}`
                : ''}
            </div>
          </div>

          <button
            disabled={tokenExist}
            className="login-btn btnStyle specialBtn"
          >
            <span>Log in</span>
          </button>
          <div className="login-signup-wrap">
            <BtnWithLink
              text="No account yet? Sign up here"
              className="login-signup-btn"
              path={'/signup'}
            />
          </div>
          {loginStatus === 'rejected' ? <p>{loginError}</p> : null}
        </form>
      </div>
    </div>
  );
};

export default Login;
