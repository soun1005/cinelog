import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/features/authSlice';
import { useState, useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(user));
  };

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

  console.log('token:', token);

  const tokenExist = token;

  return (
    <div className="login__container">
      <div className="form-container">
        <h2 className="form-title">Log in</h2>
        <form className="login__form form-wrap" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Email</label>
            <input
              type="text"
              className="form-input"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
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
