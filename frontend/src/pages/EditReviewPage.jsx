import { useEffect } from 'react';
import { loadReviews } from '../redux/features/reviewSlice';
// import { useDispatch, useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// import ReviewDetailComponent from '../components/ReviewDetailComponent';
// import BtnWithEvent from '../components/BtnWithEvent';
// import { useNavigate } from 'react-router-dom';
import EditReview from '../components/EditReview';
// import PostercardWithTitle from '../components/PostercardWithTitle';

const EditReviewPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  // reviews = array
  // const { reviews, movieData } = useSelector((state) => state.profile);
  const { id } = useParams();

  useEffect(() => {
    dispatch(loadReviews());
  }, [dispatch]);

  // if (!reviews || !movieData) {
  //   return null;
  // }

  // const mergedData = movieData.map((movie) => {
  //   const matchingReview = reviews.find(
  //     (review) => review.mediaId === movie.mediaId
  //   );

  //   if (matchingReview) {
  //     // If a matching review is found, create a new merged object
  //     return { ...movie, ...matchingReview };
  //   }
  //   return movie;
  // });

  // const matchedMedia = mergedData.find((obj) => obj.mediaId === id);
  // const { poster, title, releasedYear } = matchedMedia;

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
