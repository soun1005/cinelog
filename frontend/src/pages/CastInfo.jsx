import React from 'react';
import { useParams } from 'react-router-dom';
import CastInfoService from '../api/castInfoService';

const CastInfo = () => {
  // id passed to API from MovieInfo to get informations to display
  const { id } = useParams();

  const getCastInfoFromApi = CastInfoService(id);

  console.log(getCastInfoFromApi);

  // !!!!!!
  // Directors' filmography is in castCredits.crew
  // Actors' filmography is in castCredits.cast
  return <div className="page">Hello</div>;
};

export default CastInfo;
