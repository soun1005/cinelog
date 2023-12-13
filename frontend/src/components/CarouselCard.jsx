import React from 'react';
import { NavLink } from 'react-router-dom';
import fallback from '../assets/fallback_img.png';

const CarouselCard = ({ data }) => {
  if (!data) return null;
  return data.map((movie) => {
    const { title, poster, id } = movie;
    const posterSrc = poster.includes('null') ? fallback : poster;

    return (
      // each page's URL set to be 'movie/id'
      <>
        <NavLink to={`movie/${id}`} className="thumb" key={id}>
          <img className="poster__img" src={posterSrc} alt={title} />
        </NavLink>
      </>
    );
  });
};

export default CarouselCard;
