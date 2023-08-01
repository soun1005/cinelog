import React from 'react';
import { NavLink } from 'react-router-dom';

const CategoryCard = (category) => {
  return (
    <div>
      <NavLink to={'/'}>{category}</NavLink>
    </div>
  );
};

export default CategoryCard;
