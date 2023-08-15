/* eslint-disable no-undef */
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieInfo } from '../redux/features/movieInfoSlice';
// import CustomBtns from '../components/CustomBtns';
import SelectDate from '../components/SelectDate';
import PostercardWithTitle from '../components/PostercardWithTitle';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { string } from 'yup';

// 리덕스(moiveInfoSlice) 있는 정보 꺼내와서 포스터랑 제목 정보 가져오기
const schema = yup
  .object({
    title: string().required('Required'),
    comment: string().required('Required'),
  })
  .required();

const MovieReviewPage = () => {
  // const idTitle = useParams()['id-title'];
  const { id_title: idTitle } = useParams();
  const dispatch = useDispatch();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // dispatch(loginUser(data));
    // here dispatch with redux to save review
    console.log('data:', data);
  };

  // movie id to get poster information
  const id = idTitle.split('_')[0];

  console.log(id);

  useEffect(() => {
    dispatch(movieInfo(id));
  }, [dispatch, id]);

  const movieData = useSelector((state) => {
    return state.info;
  });

  console.log(movieData);
  if (movieData.dataStatus !== 'success') {
    // need to put loader
    // this is temporary
    return null;
  }

  const { title, releasedDate, poster } = movieData.movieInfo;
  const releasedYear = releasedDate.slice(0, 4);
  console.log(releasedYear);

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
              {formState.errors.email?.message !== undefined
                ? `${formState.errors.email?.message}`
                : ''}
            </div>

            <div>
              {/* <label className="form-label">Watched on...</label> */}
              {/********** watched on (date) ***********/}
              <div>
                <SelectDate
                  label="Watched on..."
                  className="date-picker"
                  // onChange={onChange}
                  // selected={values.birthDate}
                  name="watched"
                  filterDate={(d) => {
                    return new Date() > d;
                  }}
                />
              </div>
              {/* here date picker */}
              {/* <input
                type="password"
                className="form-input"
                {...register('password')}
                placeholder="password"
              />
              <div className="error">
                {formState.errors.password?.message !== undefined
                  ? `${formState.errors.password?.message}`
                  : ''}
              </div> */}
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
              {formState.errors.email?.message !== undefined
                ? `${formState.errors.email?.message}`
                : ''}
            </div>

            {/********** Rating ***********/}
            {/* make component for this? */}

            {/* change this to button component */}
            <button
              // disabled={tokenExist}
              className="form-btn btnStyle basicBtn"
            >
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
