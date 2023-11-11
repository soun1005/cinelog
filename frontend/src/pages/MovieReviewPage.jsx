import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import { postReview } from '../redux/features/reviewSlice';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PreviousPageBtn from '../components/PreviousPageBtn';

const schema = yup
  .object({
    reviewTitle: string().required('Required'),
    date: string().required('Required'),
    comment: string().required('Required'),
    ratings: string().required('Required'),
  })
  .required();

const MovieReviewPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // movie id to get poster information
  const { id_title: idTitle } = useParams();
  const id = idTitle.split('_')[0];

  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schema),
  });

  // const { review, error, isLoading } = usePostReview();

  // functions
  const onSubmit = async (data) => {
    dispatch(postReview({ ...data, mediaId: id }));
    toast('Review is saved!', {
      position: 'bottom-right',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
    navigate(`/movie/${id}`);
  };

  // custom hook to get movie info
  const movieInfo = MovieInfoService(id);
  if (!movieInfo) {
    // display loader here or error
    return null;
  }
  const { title, releasedYear, poster } = movieInfo;

  return (
    <div className="review-page page">
      <PreviousPageBtn />
      <div className="posterContainer">
        <PostercardWithTitle
          poster={poster}
          title={title}
          date={releasedYear}
        />
      </div>

      {/************ form ***********/}
      <div className="form">
        <div className="review-form">
          {/* <h2 className="form-title">Log in</h2> */}
          <form
            className="review-form-wrap form-wrap"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              {/* title */}
              <label className="form-label">Title</label>
              <input
                {...register('reviewTitle')}
                placeholder="Title"
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
                  render={({ field }) => (
                    <SelectDate
                      label="Watched on..."
                      className="date-picker"
                      onChange={(date) => field.onChange(date)}
                      selected={field.value}
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
                placeholder="Write your comments about this movie"
                className="form-input comment-form"
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
                render={({ field }) => (
                  <ReactStars
                    count={5}
                    onChange={(star) => field.onChange(star)}
                    size={40}
                    activeColor="#ffd700"
                    // isHalf={true}
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
                // disabled={isLoading}
                type="onSubmit"
              />

              <BtnWithLink
                text="Cancel"
                className="btnStyle specialBtn"
                path={`/movie/${id}`}
              />
            </div>
            {/* {loginStatus === 'rejected' ? <p>{loginError}</p> : null} */}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MovieReviewPage;
