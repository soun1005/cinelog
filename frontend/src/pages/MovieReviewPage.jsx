/* eslint-disable no-undef */
import { useEffect } from 'react';
import { usePostReview } from '../hooks/usePostReview';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieInfo } from '../redux/features/movieInfoSlice';
// import CustomBtns from '../components/CustomBtns';
import SelectDate from '../components/SelectDate';
import PostercardWithTitle from '../components/PostercardWithTitle';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { string } from 'yup';
import ReactStars from 'react-rating-stars-component';
// import { postReview } from '../redux/features/reviewSlice';

const schema = yup
  .object({
    title: string().required('Required'),
    date: string().required('Required'),
    comment: string().required('Required'),
    ratings: string().required('Required'),
  })
  .required();

const MovieReviewPage = () => {
  // initialising

  const { id_title: idTitle } = useParams();
  // movie id to get poster information
  const id = idTitle.split('_')[0];

  const dispatch = useDispatch();

  const { register, handleSubmit, formState, control } = useForm({
    resolver: yupResolver(schema),
  });

  const { review, error, isLoading } = usePostReview();

  // functions
  const onSubmit = async (data) => {
    // dispatch(postReview({ ...data, mediaId: id }));
    await review({ ...data, mediaId: id });
    // setFinalData(updatedData); // Update the state
  };

  if (error) {
    console.log(error);
  }

  useEffect(() => {
    // to fetch movie poster, title and year
    dispatch(movieInfo(id));
    // Object.assign(finalData, { mediaId: id });
  }, [dispatch, id]);

  const movieData = useSelector((state) => {
    return state.info;
  });

  if (movieData.dataStatus !== 'success') {
    // need to put loader
    // this is temporary
    return null;
  }

  const { title, releasedDate, poster } = movieData.movieInfo;
  const releasedYear = releasedDate.slice(0, 4);

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
          {/* <h2 className="form-title">Log in</h2> */}
          <form
            className="review__form form-wrap"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              {/* title */}
              <label className="form-label">Title</label>
              <input
                {...register('title')}
                placeholder="Title"
                className="form-input"
              />
            </div>
            <div className="error">
              {formState.errors.title?.message !== undefined
                ? `${formState.errors.title?.message}`
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
              <input
                {...register('comment')}
                placeholder="Write your comments about this movie"
                className="form-input"
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
                    size={24}
                    activeColor="#ffd700"
                    isHalf={true}
                  />
                )}
              />
            </div>
            <div className="error">
              {formState.errors.ratings?.message !== undefined
                ? `${formState.errors.ratings?.message}`
                : ''}
            </div>
            {/*  */}
            <div></div>
            {/* change this to button component */}
            <button disabled={isLoading} className="form-btn btnStyle basicBtn">
              <span>Save</span>
            </button>
            <button
              // disabled={tokenExist}
              className="form-btn btnStyle basicBtn"
            >
              <span>Cancel</span>
            </button>
            {/* {loginStatus === 'rejected' ? <p>{loginError}</p> : null} */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieReviewPage;
