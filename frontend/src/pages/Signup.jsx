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
      <h2>Sign up</h2>

      {/* <form className="signup__form"> */}
      <form className="signup__form" onSubmit={handleSubmit}>
        <div>
          <label>Email :</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label>Password :</label>
          <input
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
          <label>Username :</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        <div>
          <label>First name :</label>
          <input
            type="text"
            onChange={(e) => setFirstname(e.target.value)}
            value={firstname}
          />
        </div>
        <div>
          <label>Last name :</label>
          <input
            type="text"
            onChange={(e) => setLastname(e.target.value)}
            value={lastname}
          />
        </div>
        <button disabled={isLoading}>Sign up</button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
