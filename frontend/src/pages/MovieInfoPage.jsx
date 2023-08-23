import { useParams } from 'react-router-dom';
import BtnWithLink from '../components/BtnWithLink';
import useMovieInfo from '../hooks/useMovieInfo';
import useToken from '../hooks/useToken';

const MovieInfoPage = () => {
  const { id } = useParams();
  const movieInfo = useMovieInfo(id);
  const token = useToken();

  if (!movieInfo) {
    // display loader here or error
    return null;
  }

  const { title, releasedYear, genre, poster, movieCast, name } = movieInfo;

  return (
    <div className="info__container">
      <div className="info__wrap">
        <div className="poster-wrap">
          <img src={poster} alt={title} className="movieInfo-poster" />
        </div>
        <div className="main-wrap">
          <div className="main-wrap__info">
            <div className="main-wrap__info-subWrap">
              <span className="movieTitle">{title} </span>
              <span className="movieYear">({releasedYear})</span>
            </div>

            {/* movie infos */}
            <div className="main-wrap__info-subWrap subInfo">
              <span>Directed by </span>
              <span>{name}</span>
            </div>

            <div className="main-wrap__info-subWrap subInfo">
              <span>Starring </span>
              <span>
                {movieCast.map((cast) => {
                  return (
                    <span className="movieCast" key={cast.id}>
                      {cast.name}
                    </span>
                  );
                })}
              </span>
            </div>

            <div className="main-wrap__info-subWrap subInfo">
              <span>Genre</span>
              <span> {genre}</span>
            </div>
          </div>
          <div className="main-wrap__buttonWrap">
            <BtnWithLink
              text="Review this movie"
              className="main-wrap__btn basicBtn"
              path={`/review/${id}_${title}`}
            />

            {token ? (
              <BtnWithLink
                text="+ Add to my list"
                className="main-wrap__btn specialBtn"
              />
            ) : (
              <BtnWithLink
                text="+ Add to my list"
                className="main-wrap__btn specialBtn"
                path={'/login'}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfoPage;
