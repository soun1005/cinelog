import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { castInfo } from '../redux/features/castInfoSlice';

const CastInfoService = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(castInfo(id));
  }, [id, dispatch]);

  // saved movie datas from redux by 'dispatch movieInfo'
  const castData = useSelector((state) => {
    return state.cast;
  });

  if (castData.dataStatus !== 'success') {
    return null;
  }

  const { castInformation, castCredits, dataStatus } = castData;

  return {
    castInformation,
    castCredits,
    dataStatus,
  };
};

export default CastInfoService;
