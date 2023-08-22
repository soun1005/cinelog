import { useEffect } from 'react';
import { loadReviews } from '../redux/features/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewDetailComponent from '../components/ReviewDetailComponent';
import BtnWithEvent from '../components/BtnWithEvent';
import BtnWithLink from '../components/BtnWithLink';
import { deleteReview } from '../redux/features/profileSlice';
import { useNavigate } from 'react-router-dom';

const ReviewDetail = () => {
  // const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // reviews = array
  const { reviews, movieData } = useSelector((state) => state.profile);
  const { id } = useParams();

  // console.log('movieData:', movieData);

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
  // console.log(mergedData);

  const matchedMedia = mergedData.find((obj) => obj.mediaId === id);

  // console.log(matchedMedia);

  const handleDelete = () => {
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
            path={`/profile/review/edit/${id}`}
          />
          <BtnWithEvent
            text="Delete"
            className="btnStyle specialBtn"
            onClick={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
