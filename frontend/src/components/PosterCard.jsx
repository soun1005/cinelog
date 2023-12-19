import { NavLink } from 'react-router-dom';
import FallbackPoster from './FallbackPoster';

// JSON data is passed in SearchResult.jsx
export default function PosterCard({ data }) {
  const cardsList = data.map((movie) => {
    const { title, poster, id } = movie;
    const posterSrc = FallbackPoster(poster);

    return (
      // each page's URL set to be 'movie/id'
      <NavLink to={`/movie/${id}`} key={id} className="poster__link">
        <div className="poster-wrap">
          <img className="poster__img" src={posterSrc} alt={title} />
        </div>
      </NavLink>
    );
  });

  return <div className="poster__container">{cardsList}</div>;
}
