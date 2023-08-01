import React from 'react';
import { useParams } from 'react-router-dom';

const MovieInfoPage = () => {
  // to get movie id
  const { id } = useParams();
  // console.log(id);

  // backend에서 api만들기
  // 1. 여기에서 받은 id로 tmdb에서 credit자료 요청
  // 2. 이것도 리덕스인가..썅..
  // 3. 리덕스에서 asyncThunk로 영화정보 저장, 여기랑 리뷰 페이지에서 dispatch하기

  return <div>hiya this movie id is : {id} </div>;
};

export default MovieInfoPage;
