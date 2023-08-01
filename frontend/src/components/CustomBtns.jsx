import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomBtn = ({ text, className, path }) => {
  return (
    <NavLink to={path}>
      <button className={`btnStyle ${className}`}>
        <span>{text}</span>
      </button>
    </NavLink>
  );
};

export default CustomBtn;
