import { useEffect } from 'react';
import { loadReviews } from '../redux/features/reviewSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditReview from '../components/EditReview';

const EditReviewPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadReviews());
  }, [dispatch]);

  return (
    <div className="review-edit-page page">
      {/* <ReviewDetailComponent data={matchedMedia} /> */}
      {/* <PostercardWithTitle poster={poster} title={title} date={releasedYear} /> */}
      <div>
        review editor
        <EditReview mediaId={id} />
      </div>
    </div>
  );
};

export default EditReviewPage;
