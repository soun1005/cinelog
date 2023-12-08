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
      <div className="thumb-wrap" key={id}>
        <NavLink to={`movie/${id}`} className="thumb">
          <div className="thumb-img-wrap">
            <img className="poster__img" src={posterSrc} alt={title} />
          </div>
        </NavLink>
      </div>
    );
  });
};

export default CarouselCard;
