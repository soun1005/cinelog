import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieDetail } from '../redux/features/creditSlice';

const MovieInfoPage = () => {
  const dispatch = useDispatch();
  const storedData = useSelector((state) => console.log(state));
  console.log(storedData);

  // to get movie id
  const { id } = useParams();
  // console.log(id);

  useEffect(() => {
    dispatch(movieDetail(id));
  }, [dispatch, id]);

  return <div>hiya this movie id is : {id} </div>;
};

export default MovieInfoPage;
