import React from 'react';

const Signup = () => {
  return (
    <div className="singup__container">
      <div>
        <label>Email :</label>
        <input type="email" />
      </div>
      <div>
        <label>Password :</label>
        <input type="password" />
      </div>
      <div>
        <label>Confirm password :</label>
        <input type="password" />
      </div>
      <div>
        <label>Username :</label>
        <input type="text" />
      </div>
      <div>
        <label>First name :</label>
        <input type="text" />
      </div>
      <div>
        <label>Last name :</label>
        <input type="text" />
      </div>
    </div>
  );
};

export default Signup;
