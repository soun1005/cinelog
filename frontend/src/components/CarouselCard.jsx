import React from 'react';
import { NavLink } from 'react-router-dom';
import FallbackPoster from './FallbackPoster';

const CarouselCard = ({ data }) => {
  if (!data) return null;
  return data.map((movie) => {
    const { title, poster, id } = movie;

    const posterSrc = FallbackPoster(poster);

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
