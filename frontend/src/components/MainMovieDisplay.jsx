import React from 'react';
import { NavLink } from 'react-router-dom';
import FallbackPoster from './FallbackPoster';

const MainMovieDisplay = ({ data, title }) => {
  const moviePosters = data.map((movie) => {
    const { title, poster, id } = movie;

    const posterSrc = FallbackPoster(poster);

    return (
      // each page's URL set to be 'movie/id'
      <NavLink
        to={`movie/${id}`}
        key={id}
        className="main__movie-container__link poster__link"
      >
        <div className="poster-wrap">
          <img className="poster__img" src={posterSrc} alt={title} />
        </div>
      </NavLink>
    );
  });

  return (
    <div className="main__movie-container">
      <h2 className="section-title">{title}</h2>
      <div className="main__movie-wrap">{moviePosters}</div>
    </div>
  );
};

export default MainMovieDisplay;
