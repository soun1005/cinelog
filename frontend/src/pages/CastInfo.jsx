import React from 'react';
import { useParams } from 'react-router-dom';
import FilmoSection from '../components/FilmoSection';
import CastInfoService from '../api/castInfoService';
import dayjs from 'dayjs';

const CastInfo = () => {
  // id passed to API from MovieInfo to get informations to display
  const { id } = useParams();

  const getCastInfoFromApi = CastInfoService(id);

  if (getCastInfoFromApi === null) {
    return;
  }

  const { castCredits, castInformation, dataStatus } = getCastInfoFromApi;

  console.log(castInformation, dataStatus);

  const { name, profile_path, biography, birthday, placeOfBirth, castId } =
    castInformation;

  const formattedBday = dayjs(birthday).format('DD/MM/YYYY');

  // to display filmography
  const top5Credits = castCredits.formattedCastData.slice(0, 5);
  console.log(top5Credits);

  return (
    <div className="page">
      <div className="info-wrap">
        {castId}
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
            <span> {biography}</span>
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
