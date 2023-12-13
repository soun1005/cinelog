import { useState } from 'react';
import { useParams } from 'react-router-dom';
import FilmoSection from '../components/FilmoSection';
import CastInfoService from '../api/castInfoService';
import dayjs from 'dayjs';

const CastInfo = () => {
  const [showLessBio, setShowLessBio] = useState(true);
  const { id } = useParams();

  const getCastInfoFromApi = CastInfoService(id);

  if (getCastInfoFromApi === null) {
    return;
  }

  // const { castCredits, castInformation, dataStatus } = getCastInfoFromApi;
  const { castCredits, castInformation } = getCastInfoFromApi;

  const { name, profile_path, biography, birthday, placeOfBirth } =
    castInformation;

  const formattedBday = dayjs(birthday).format('DD/MM/YYYY');

  // to display less biography
  const splited = biography.split(' ');
  const first50Words = splited.slice(0, 50);
  const lessBio = first50Words.join(' ');
  const bioLessThan50words = splited.length <= 50;
  console.log(bioLessThan50words);

  // to display filmography
  const top6Credits = castCredits.formattedCastData.slice(0, 6);

  return (
    <div className="page">
      <div className="cast-info">
        <div className="poster-wrap">
          <img src={profile_path} alt={name} className="movie-info-poster" />
        </div>
        <div className="main-wrap__info">
          <div className="main-wrap__info-sub-wrap">
            <span className="movie-title">{name} </span>
          </div>
          {/* genre */}
          <div className="main-wrap__info-su-wrap sub-info">
            <span>Birthday</span>
            <span> {formattedBday}</span>
          </div>

          {/* releasedDate */}
          <div className="main-wrap__info-sub-wrap sub-info">
            <span>Birthplace</span>
            <span> {placeOfBirth}</span>
          </div>

          {/* overview */}
          {biography.length !== 0 && (
            <div className="main-wrap__info-sub-wrap sub-info info-overview">
              {showLessBio ? <span>{lessBio}</span> : <span> {biography}</span>}

              {!bioLessThan50words && (
                <p
                  className="cast-bio-btn"
                  onClick={() => setShowLessBio(!showLessBio)}
                >
                  {showLessBio ? 'VIEW MORE' : 'VIEW LESS'}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
      <FilmoSection
        moreFilmos={castCredits.formattedCastData}
        lessFilmos={top6Credits}
      />
    </div>
  );
};

export default CastInfo;
