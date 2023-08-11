import React from 'react';
import { NavLink } from 'react-router-dom';
import fallback from '../assets/fallback_img.png';

// JSON data is passed in SearchResult.jsx
export default function PosterCard({ data }) {
  // map every data and return HTML dom with each data
  // map les données et retourne le dom HTML avec chaque donnée
  const cardsList = data.map((movie) => {
    const { title, poster, id } = movie;
    const posterSrc = poster.includes('null') ? fallback : poster;

    return (
      // each page's URL set to be 'movie/id'
      <NavLink to={`/movie/${id}`} key={id} className="poster__link">
        <div className="poster__wrap">
          <img className="poster__img" src={posterSrc} alt={title} />
        </div>
      </NavLink>
    );
  });

  return <div className="poster__container">{cardsList}</div>;
}
