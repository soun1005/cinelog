import PostercardWithTitle from './PostercardWithTitle';
import RatingStars from './RatingStars';

const ReviewDetailComponent = ({ data }) => {
  const {
    comment,
    ratings,
    reviewTitle,
    updatedAt,
    releasedDate,
    title,
    date,
    poster,
  } = data;

  const releasedYear = releasedDate.slice(0, 4);

  return (
    <div className="review-detail__container">
      <PostercardWithTitle poster={poster} title={title} date={releasedYear} />
      <div className="review-detail">
        <div className="review-detail__title-wrap detail-wrap">
          <span>Title</span>
          <span>{reviewTitle}</span>
        </div>
        <div className="review-detail__date-wrap detail-wrap">
          <span>Watched on</span>
          <span>{date}</span>
        </div>
        <div className="review-detail__comment-wrap detail-wrap">
          <span>Comment</span>
          <span>{comment}</span>
        </div>
        <div className="review-detail__rating-wrap detail-wrap">
          <span>Ratings</span>
          <span>
            <RatingStars rating={ratings} />
          </span>
        </div>
        <div className="review-detail__editedDate-wrap detail-wrap">
          <span>Last edited</span>
          <span>{updatedAt}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailComponent;
