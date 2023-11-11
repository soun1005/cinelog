import { useState } from 'react';
import CastCard from './CastCard';

const CastSection = ({ lessCast, moreCast }) => {
  const [moreCasts, setMoreCasts] = useState(false);
  return (
    <>
      <div className="cast">
        <div className="cast__titleWrap">
          <p className="cast__titleWrap__title">Movie casts</p>

          {moreCast.length > 6 ? (
            !moreCasts ? (
              <span
                className="view-more-btn"
                onClick={() => setMoreCasts(true)}
              >
                {' '}
                View more
              </span>
            ) : (
              <span
                className="view-more-btn"
                onClick={() => setMoreCasts(false)}
              >
                {' '}
                View less
              </span>
            )
          ) : null}
        </div>
        <div
          className={
            !moreCasts ? 'cast__container' : 'cast__container fullList'
          }
        >
          {!moreCasts
            ? lessCast.map((cast) => <CastCard castInfo={cast} key={cast.id} />)
            : moreCast.map((cast) => (
                <CastCard castInfo={cast} key={cast.id} />
              ))}
        </div>
      </div>
    </>
  );
};

export default CastSection;
