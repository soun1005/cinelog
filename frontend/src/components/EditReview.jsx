import SelectDate from '../components/SelectDate';
import PostercardWithTitle from '../components/PostercardWithTitle';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { string } from 'yup';
import ReactStars from 'react-rating-stars-component';
import MovieInfoService from '../api/movieInfoService';
import BtnWithEvent from '../components/BtnWithEvent';
import BtnWithLink from '../components/BtnWithLink';
import ReviewService from '../api/reviewService';
import { useDispatch } from 'react-redux';
import { editReview } from '../redux/features/reviewSlice';
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';

const schema = yup
  .object({
    reviewTitle: string().required('Required'),
    date: string().required('Required'),
    comment: string().required('Required'),
    ratings: string().required('Required'),
  })
  .required();

// onChange to change useState's state(isEditing)
const EditReview = ({ mediaId }) => {
  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // custom hooks to get redux states
  const reviews = ReviewService();
  const movieInfo = MovieInfoService(mediaId);

  if (!reviews || !movieInfo) {
    // display loader here or error
    return null;
  }

  const movieReview = reviews.filter((review) => review.mediaId === mediaId);

  const { reviewTitle, date, comment, ratings } = movieReview[0];
  //   console.log(date);

  // functions
  const onSubmit = (data) => {
    // await review({ ...data, mediaId: mediaId });
    // here with new API to update both DB and redux with data
    // console.log('data:', data);
    dispatch(editReview({ data, mediaId: mediaId }));
    toast('Review is edited!', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    navigate(`/profile/review/${mediaId}`);
  };

  const { title, releasedYear, poster } = movieInfo;

  return (
    <div>
      <div className="posterContainer">
        <PostercardWithTitle
          poster={poster}
          title={title}
          date={releasedYear}
        />
      </div>

      {/************ form ***********/}
      <div className="form">
        <div>
          <form
            className="review-form form-wrap"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              {/* title */}
              <label className="form-label">Title</label>
              <input
                {...register('reviewTitle')}
                defaultValue={reviewTitle}
                className="form-input"
              />
            </div>
            <div className="error">
              {formState.errors.reviewTitle?.message !== undefined
                ? `${formState.errors.reviewTitle?.message}`
                : ''}
            </div>

            <div>
              {/********** watched on (date) ***********/}
              <div>
                <Controller
                  control={control}
                  name="date"
                  defaultValue={date}
                  render={({ field }) => (
                    <SelectDate
                      label="Watched on..."
                      className="date-picker"
                      onChange={(date) => field.onChange(date)}
                      selected={date}
                      filterDate={(d) => {
                        return new Date() > d;
                      }}
                    />
                  )}
                />
              </div>
              <div className="error">
                {formState.errors.date?.message !== undefined
                  ? `${formState.errors.date?.message}`
                  : ''}
              </div>
            </div>
            {/********** Comment ***********/}
            <div>
              <label className="form-label">Comment</label>
              <textarea
                {...register('comment')}
                defaultValue={comment}
                className="form-input comment-form"
                rows="5"
                cols="30"
              />
            </div>
            <div className="error">
              {formState.errors.comment?.message !== undefined
                ? `${formState.errors.comment?.message}`
                : ''}
            </div>

            {/********** Rating ***********/}
            {/* make component for this? */}
            <div>
              <label className="form-label">Ratings</label>
              <Controller
                control={control}
                name="ratings"
                defaultValue={ratings}
                render={({ field }) => (
                  <ReactStars
                    count={5}
                    onChange={(star) => field.onChange(star)}
                    size={24}
                    activeColor="#ffd700"
                    value={ratings}
                    defaultValue={ratings}
                  />
                )}
              />
            </div>
            <div className="error">
              {formState.errors.ratings?.message !== undefined
                ? `${formState.errors.ratings?.message}`
                : ''}
            </div>

            <div className="btn-wrap">
              <BtnWithEvent
                text="Save"
                className="btnStyle basicBtn"
                type="submit"
              />

              <BtnWithLink
                text="Cancel"
                className="btnStyle specialBtn"
                path={`/profile/review/${mediaId}`}
              />
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditReview;
