import { useEffect } from 'react';
import { loadReviews } from '../redux/features/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewDetailComponent from '../components/ReviewDetailComponent';
import BtnWithEvent from '../components/BtnWithEvent';
import BtnWithLink from '../components/BtnWithLink';
import { deleteReview } from '../redux/features/reviewSlice';
import { useNavigate } from 'react-router-dom';

const ReviewDetail = () => {
  // const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // reviews = array

  useEffect(() => {
    dispatch(loadReviews());
  }, [dispatch]);

  const { reviews, movieData } = useSelector((state) => state.review);

  const { id } = useParams();

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

  console.log(mergedData);

  const matchedMedia = mergedData.find((obj) => obj.mediaId === id);

  console.log(matchedMedia);

  const handleDelete = () => {
    dispatch(deleteReview(matchedMedia.mediaId));
    navigate('/profile');
  };

  return (
    <div className="review-page page">
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
