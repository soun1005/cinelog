import { useEffect } from 'react';
import { loadReviews } from '../redux/features/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewDetailComponent from '../components/ReviewDetailComponent';
import BtnWithLink from '../components/BtnWithLink';
import BtnWithEvent from '../components/BtnWithEvent';
import { deleteReview } from '../redux/features/profileSlice';
import { useNavigate } from 'react-router-dom';

const ReviewDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // reviews = array
  const { reviews, movieData } = useSelector((state) => state.profile);
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadReviews());
  }, [dispatch]);

  if (!reviews || !movieData) {
    return null;
  }

  const mergedData = movieData.map((movie) => {
    const matchingReview = reviews.find(
      (review) => review.mediaId === movie.mediaId
    );

    if (matchingReview) {
      // If a matching review is found, create a new merged object
      return { ...movie, ...matchingReview };
    }
    return movie;
  });

  const matchedMedia = mergedData.find((obj) => obj.mediaId === id);

  console.log(matchedMedia);

  const handleClick = () => {
    console.log('hi');
    dispatch(deleteReview(matchedMedia.mediaId));
    navigate('/profile');
  };

  return (
    <div className="review-page">
      <div className="review-page__wrap">
        <ReviewDetailComponent data={matchedMedia} />
        <div className="btnWrap">
          <BtnWithLink
            text="Edit review"
            className="btnStyle basicBtn"
            path={'/'}
          />
          <BtnWithEvent
            text="Delete"
            className="btnStyle specialBtn"
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
