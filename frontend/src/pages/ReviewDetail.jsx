import { useEffect } from 'react';
import { loadReviews } from '../redux/features/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewDetailComponent from '../components/ReviewDetailComponent';
import BtnWithEvent from '../components/BtnWithEvent';
import BtnWithLink from '../components/BtnWithLink';
import { deleteReview } from '../redux/features/reviewSlice';
import { useNavigate } from 'react-router-dom';
import PreviousPageBtn from '../components/PreviousPageBtn';

const ReviewDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadReviews());
  }, [dispatch]);

  const { reviews, movieData } = useSelector((state) => state.review);
  const { id } = useParams();

  if (!reviews || !movieData) {
    return null;
  }

  // merge reviews and movieData from redux state
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

  const handleDelete = () => {
    const confirmBox = window.confirm(
      'Do you really want to delete this review?'
    );
    if (confirmBox === true) {
      dispatch(deleteReview(matchedMedia.mediaId));
      navigate('/profile');
    }
  };

  return (
    <div className="review-page page">
      <PreviousPageBtn />
      <div className="review-page__wrap">
        <ReviewDetailComponent data={matchedMedia} />
        <div className="btn-wrap">
          <BtnWithLink
            text="Edit review"
            className="review-detail-btn btnStyle basicBtn"
            path={`/profile/review/edit/${id}`}
          />
          <BtnWithEvent
            text="Delete"
            className="review-detail-btn btnStyle specialBtn"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
