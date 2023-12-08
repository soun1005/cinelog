import { useEffect, useState } from 'react';
import { loadReviews } from '../redux/features/reviewSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReviewDetailComponent from '../components/ReviewDetailComponent';
import BtnWithEvent from '../components/BtnWithEvent';
import BtnWithLink from '../components/BtnWithLink';
import { deleteReview } from '../redux/features/reviewSlice';
import { useNavigate } from 'react-router-dom';
import PreviousPageBtn from '../components/PreviousPageBtn';
import ConfirmModal from '../components/ConfirmModal';
import { ToastContainer, toast } from 'react-toastify';

const ReviewDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // to open and close confirm modal
  const [confirmModal, setConfirmModal] = useState(false);

  useEffect(() => {
    dispatch(loadReviews({}));
  }, [dispatch]);

  const { reviews, movieData } = useSelector((state) => state.review);
  const { id } = useParams();

  console.log(id);

  console.log('reviews:', reviews);

  // if (!reviews || !movieData) {
  //   return null;
  // }

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
    dispatch(deleteReview(matchedMedia.mediaId));
    navigate('/profile/reviews');
    toast('Review deleted!', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };

  return (
    <div className="review-page page">
      <PreviousPageBtn />
      <div className="review-page-wrap">
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
            onClick={() => setConfirmModal(true)}
          />
          <ConfirmModal
            isModalOpen={confirmModal}
            closeModal={() => setConfirmModal(false)}
            eventFunc={handleDelete}
            warningMsg="Do you really want to delete this review?"
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ReviewDetail;
