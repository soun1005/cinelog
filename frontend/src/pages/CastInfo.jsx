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

  const { castCredits, castInformation, dataStatus } = getCastInfoFromApi;

  console.log(castInformation, dataStatus);

  const { name, profile_path, biography, birthday, placeOfBirth } =
    castInformation;

  const formattedBday = dayjs(birthday).format('DD/MM/YYYY');

  // to display less biography
  const splited = biography.split(' ');
  const first50Words = splited.slice(0, 50);
  const lessBio = first50Words.join(' ');
  // const lessBio = biography.slice(100, biography.length);

  // to display filmography
  const top5Credits = castCredits.formattedCastData.slice(0, 5);
  console.log(top5Credits);

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
          <div className="main-wrap__info-sub-wrap sub-info info-overview">
            {showLessBio ? <span>{lessBio}</span> : <span> {biography}</span>}
            <p
              className="cast-bio-btn"
              onClick={() => setShowLessBio(!showLessBio)}
            >
              {showLessBio ? 'VIEW MORE' : 'VIEW LESS'}
            </p>
          </div>
        </div>
      </div>
      <FilmoSection
        moreFilmos={castCredits.formattedCastData}
        lessFilmos={top5Credits}
      />
    </div>
  );
};

export default CastInfo;
