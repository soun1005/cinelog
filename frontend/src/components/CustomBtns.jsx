import React from 'react';
import { NavLink } from 'react-router-dom';

const CustomBtn = ({ text, className, path, disabled = false }) => {
  return (
    <NavLink to={path}>
      <button className={`btnStyle ${className}`} disabled={disabled}>
        <span>{text}</span>
      </button>
    </NavLink>
  );
};

export default CustomBtn;
