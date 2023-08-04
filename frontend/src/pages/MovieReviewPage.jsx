import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieInfo } from '../redux/features/movieInfoSlice';
// import CustomBtns from '../components/CustomBtns';
import PostercardWithTitle from '../components/PostercardWithTitle';

// 리덕스(moiveInfoSlice) 있는 정보 꺼내와서 포스터랑 제목 정보 가져오기

const MovieReviewPage = () => {
  // const idTitle = useParams()['id-title'];
  const { id_title: idTitle } = useParams();
  const dispatch = useDispatch();

  // movie id to get poster information
  const id = idTitle.split('_')[0];

  console.log(id);

  useEffect(() => {
    dispatch(movieInfo(id));
  }, [dispatch, id]);

  const movieData = useSelector((state) => {
    return state.info;
  });

  console.log(movieData);
  if (movieData.dataStatus !== 'success') {
    // need to put loader
    // this is temporary
    return null;
  }

  const { title, releasedDate, poster } = movieData.movieInfo;
  const releasedYear = releasedDate.slice(0, 4);
  console.log(releasedYear);

  return (
    <div>
      <div className="posterContainer">
        <PostercardWithTitle
          poster={poster}
          title={title}
          date={releasedYear}
        />
      </div>
    </div>
  );
};

export default MovieReviewPage;
