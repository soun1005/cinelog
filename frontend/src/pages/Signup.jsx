import { useState } from 'react';
import { useSignup } from '../hooks/useSignup';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');

  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password, username, firstname, lastname);
    console.log(email, password);
  };

  return (
    <div className="singup__container">
      <div className="form-container">
        <h2 className="form-title">Sign up</h2>

        {/* <form className="signup__form"> */}
        <form className="signup__form" onSubmit={handleSubmit}>
          <div>
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          {/* <div>
          <label>Confirm password :</label>
          <input type="password" />
        </div> */}
          <div>
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-input"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
          <div>
            <label className="form-label">First name</label>
            <input
              type="text"
              className="form-input"
              onChange={(e) => setFirstname(e.target.value)}
              value={firstname}
            />
          </div>
          <div>
            <label className="form-label">Last name</label>
            <input
              type="text"
              className="form-input"
              onChange={(e) => setLastname(e.target.value)}
              value={lastname}
            />
          </div>
          <button disabled={isLoading} className="form-btn btnStyle basicBtn">
            <span>Sign up</span>
          </button>
          {error && <div>{error}</div>}
        </form>
      </div>
    </div>
  );
};

export default Signup;
