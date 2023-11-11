import { useState } from 'react';
import CastCard from './CastCard';

const CastSection = ({ lessCast, moreCast }) => {
  const [moreCasts, setMoreCasts] = useState(false);
  return (
    <>
      <div className="cast">
        <div className="cast__titleWrap">
          <p className="cast__titleWrap__title">Movie casts</p>
          {!moreCasts ? (
            <span onClick={() => setMoreCasts(true)}> View more</span>
          ) : (
            <span onClick={() => setMoreCasts(false)}> View less</span>
          )}
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
