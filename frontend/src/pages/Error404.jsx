import { NavLink } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="page">
      <div className="error-container">
        <div className="error-container__message-wrap">
          <p className="msg404">404</p>
          <p className="message">Opps! The page doesn't exist</p>
        </div>
        <NavLink to="/">Go back to main</NavLink>
      </div>
    </div>
  );
};

export default Error404;
