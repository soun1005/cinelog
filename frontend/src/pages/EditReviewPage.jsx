import { useEffect, useState } from 'react';
import { loadReviews } from '../redux/features/profileSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewDetailComponent from '../components/ReviewDetailComponent';
import BtnWithEvent from '../components/BtnWithEvent';
import { deleteReview } from '../redux/features/profileSlice';
import { useNavigate } from 'react-router-dom';
import EditReview from '../components/EditReview';

const EditReviewPage = () => {
  const [isEditing, setIsEditing] = useState(false);
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

  // console.log(matchedMedia);

  const handleClick = () => {
    // here write logics to edit review
    setIsEditing(true);
  };

  const handleDelete = () => {
    console.log('hi');
    dispatch(deleteReview(matchedMedia.mediaId));
    navigate('/profile');
  };

  const onChange = () => {
    setIsEditing(false);
  };

  return (
    <div className="review-page">
      {!isEditing ? (
        <div className="review-page__wrap">
          <ReviewDetailComponent data={matchedMedia} />
          <div className="btnWrap">
            <BtnWithEvent
              text="Edit review"
              className="btnStyle basicBtn"
              onClick={handleClick}
            />
            <BtnWithEvent
              text="Delete"
              className="btnStyle specialBtn"
              onClick={handleDelete}
            />
          </div>
        </div>
      ) : (
        <div>
          review editor
          <EditReview mediaId={id} onChange={onChange} />
        </div>
      )}
    </div>
  );
};

export default EditReviewPage;
