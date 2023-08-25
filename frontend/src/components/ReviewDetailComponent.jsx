// import { useEffect } from 'react';
import PostercardWithTitle from './PostercardWithTitle';
import RatingStars from './RatingStars';
import dayjs from 'dayjs';

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

  const updatedAtFormatted = dayjs(updatedAt).format('HH:MM DD/MM/YYYY'); // '25/01/2019'
  const watchedOnFormatted = dayjs(date).format('DD/MM/YYYY');

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
          <span>{watchedOnFormatted}</span>
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
          <span>{updatedAtFormatted}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetailComponent;
