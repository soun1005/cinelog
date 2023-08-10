import React from 'react';
import { NavLink } from 'react-router-dom';
import fallback from '../assets/fallback_img.png';

const MainMovieDisplay = ({ data, title }) => {
  const moviePosters = data.map((movie) => {
    const { title, poster, id } = movie;
    const posterSrc = poster.includes('null') ? fallback : poster;

    return (
      // each page's URL set to be 'movie/id'
      <NavLink to={`movie/${id}`} key={id} className="poster__link">
        <div className="poster__wrap">
          <img className="poster__img" src={posterSrc} alt={title} />
        </div>
      </NavLink>
    );
  });

  return (
    <div>
      <h2>{title}</h2>
      {moviePosters}
    </div>
  );
};

export default MainMovieDisplay;
