import React from 'react';
import { useParams } from 'react-router-dom';
import CastInfoService from '../api/castInfoService';

const CastInfo = () => {
  // id passed to API from MovieInfo to get informations to display
  const { id } = useParams();
  // now pass the id to redux and get informations

  const getCastInfoFromApi = CastInfoService(id);
  //   console.log('castinfoservice called', castInfo);
  console.log(getCastInfoFromApi);
  return <div className="page">Hello</div>;
};

export default CastInfo;
