import React from 'react';
import { NavLink } from 'react-router-dom';

// JSON data is passed in SearchResult.jsx
export default function PosterCard({ data }) {
  // map every data and return HTML dom with each data
  // map les données et retourne le dom HTML avec chaque donnée
  const cardsList = data.map((movie) => {
    const { title, poster, id } = movie;

    return (
      // each page's URL set to be 'movie/id'
      <NavLink to={`location/${id}`} key={id}>
        <div className="poster__wrap">
          <img className="poster__img" src={poster} alt={title} />
        </div>
      </NavLink>
    );
  });

  return <div className="poster__container">{cardsList}</div>;
}
