import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/features/authSlice';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { string } from 'yup';

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
// min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.

const schema = yup
  .object({
    email: string()
      .email('This is not a validate email')
      .required('Email is required'),
    password: string()
      .matches(passwordRules, { message: 'Please check your password' })
      .required('Required'),
  })
  .required();

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
    console.log('data:', data);
  };

  // console.log(watch('email')); // watch input value by passing the name of it

  // 현재 auth의 state는 initial state
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
    <div className="login__container">
      <div className="form-container">
        <h2 className="form-title">Log in</h2>
        <form
          className="login__form form-wrap"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label className="form-label">Email</label>
            <input
              {...register('email')}
              placeholder="Email"
              // type="text"
              className="form-input"
              // onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          {formState.errors.email?.message !== undefined
            ? `${formState.errors.email?.message}`
            : ''}

          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              {...register('password')}
              placeholder="password"
              // onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            {formState.errors.password?.message !== undefined
              ? `${formState.errors.password?.message}`
              : ''}
          </div>
          <button disabled={tokenExist} className="form-btn btnStyle basicBtn">
            <span>Log in</span>
          </button>
          {loginStatus === 'rejected' ? <p>{loginError}</p> : null}
        </form>
      </div>
    </div>
  );
};

export default Login;
