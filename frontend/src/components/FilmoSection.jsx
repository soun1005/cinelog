import { useState } from 'react';
import FilmoCard from './FilmoCard';

const FilmoSection = ({ lessFilmos, moreFilmos }) => {
  const [moreFilmo, setMoreFilmo] = useState(false);
  return (
    <>
      <div className="filmo">
        <div className="filmo-title-wrap">
          <p className="filmo-title-wrap__title">FILMOGRAPHY</p>

          {moreFilmos.length > 6 ? (
            !moreFilmo ? (
              <span
                className="view-more-btn"
                onClick={() => setMoreFilmo(true)}
              >
                VIEW MORE
              </span>
            ) : (
              <span
                className="view-more-btn"
                onClick={() => setMoreFilmo(false)}
              >
                VIEW LESS
              </span>
            )
          ) : null}
        </div>
        <div className="filmo__container">
          {!moreFilmo
            ? lessFilmos.map((movie) => (
                <FilmoCard
                  poster={movie.poster_path}
                  title={movie.title}
                  date={movie.release_date}
                  path={`/movie/${movie.id}`}
                  character={movie.character}
                  key={movie.id}
                />
              ))
            : moreFilmos.map((movie) => (
                <FilmoCard
                  poster={movie.poster_path}
                  title={movie.title}
                  date={movie.release_date}
                  path={`/movie/${movie.id}`}
                  character={movie.character}
                  key={movie.id}
                />
              ))}
        </div>
      </div>
    </>
  );
};

export default FilmoSection;
