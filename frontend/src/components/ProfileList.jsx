import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import fallback from '../assets/fallback_img.png';
import RatingStars from '../components/RatingStars';
import BtnWithLink from '../components/BtnWithLink';
import BtnWithEvent from '../components/BtnWithEvent';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../redux/features/reviewSlice';
import { deleteFavourite } from '../redux/features/favouriteListSlice';
import { ToastContainer, toast } from 'react-toastify';
import FilterByRating from './filterData/FilterByRating';
import FilterBySearchbar from './filterData/FilterBySearchbar';

const ProfileList = ({
  data,
  listTitle,
  noDataMsg,
  dateLabel,
  pagePath,
  isReview = true,
  moreBtn = true,
  buttons = false,
  dataLength,
}) => {
  const [star, setStar] = useState(5);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const dispatch = useDispatch();

  useEffect(() => {
    // const filtered = data.filter((d) => d.ratings <= star);
    // setFilteredData(filtered);

    const filtered = data.filter(
      (d) => d.ratings <= star && d.title.toLowerCase().includes(searchKeyword)
    );
    setFilteredData(filtered);
  }, [data, searchKeyword, star]);

  const reviewCount =
    star === 5 && searchKeyword === '' ? dataLength : filteredData.length;

  const cardsList = filteredData.map((movie) => {
    const { createdAt, ratings, poster, _id, title, releasedDate, mediaId } =
      movie;
    const posterSrc = poster.includes('null') ? fallback : poster;

    const releasedYear = releasedDate.slice(0, 4);
    const reviewedDate = createdAt.slice(0, 10);

    const handleDeleteReview = () => {
      const confirmBox = window.confirm(
        'Do you really want to delete this review?'
      );
      if (confirmBox === true) {
        dispatch(deleteReview(movie.mediaId));
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
      }
    };

    const handleDeleteFavourite = () => {
      const confirmBox = window.confirm('Do you really want to delete this?');
      if (confirmBox === true) {
        dispatch(deleteFavourite(movie.mediaId));
        toast('Favourite deleted!', {
          position: 'bottom-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      }
    };

    return (
      <div key={_id} className="profile-list__btn-container">
        {/* // each page's URL set to redirect to review page */}
        {isReview ? (
          <NavLink
            to={`/profile/review/${mediaId}`}
            key={createdAt}
            className="profile-list__card-wrap"
          >
            {/* poster wrap */}
            <div className="profile-list__card-wrap__poster">
              <img src={posterSrc} alt={title} />
            </div>
            {/* information wrap */}
            <div className="profile-list__card-wrap__info">
              <div className="profile-list__card-wrap__info-wrap">
                <div className="profile-list__card-wrap__info-wrap__title">
                  <span>{title} </span>
                  <span>({releasedYear})</span>
                </div>
                <div className="profile-list__card-wrap__info-wrap__reviewDate">
                  <span>{dateLabel}</span>
                  <span>{reviewedDate}</span>
                </div>
              </div>
              <div className="profile-list__card-wrap__info-wrap__ratings">
                <RatingStars rating={ratings} />
              </div>
            </div>
          </NavLink>
        ) : (
          <NavLink
            to={`/movie/${mediaId}`}
            key={createdAt}
            className="profile-list__card-wrap"
          >
            {/* poster wrap */}
            <div className="profile-list__card-wrap__poster">
              <img src={posterSrc} alt={title} />
            </div>
            {/* information wrap */}
            <div className="profile-list__card-wrap__info">
              <div className="profile-list__card-wrap__info-wrap">
                <div className="profile-list__card-wrap__info-wrap__title">
                  <span>{title} </span>
                  <span>({releasedYear})</span>
                </div>
                <div className="profile-list__card-wrap__info-wrap__reviewDate">
                  <span>{dateLabel}</span>
                  <span>{reviewedDate}</span>
                </div>
              </div>
              <div className="profile-list__card-wrap__info-wrap__ratings">
                <RatingStars rating={ratings} />
              </div>
            </div>
          </NavLink>
        )}

        {buttons && isReview && (
          <div className="profile-list__card-wrap__info-wrap__button-wrap">
            <BtnWithLink
              text="Edit"
              path={`/profile/review/edit/${mediaId}`}
              className="btnStyle basicBtn reviewBtns"
            />
            <BtnWithEvent
              text="Delete"
              className="btnStyle specialBtn reviewBtns"
              onClick={handleDeleteReview}
            />
          </div>
        )}
        {buttons && !isReview && (
          <BtnWithEvent
            text="Delete"
            className="btnStyle specialBtn reviewBtns"
            onClick={handleDeleteFavourite}
          />
        )}
      </div>
    );
  });

  return (
    <div className="profile-list__container">
      <div className="profile-list__title-wrap">
        <span>
          {listTitle}
          {` (${reviewCount})`}
        </span>

        {/* filter */}
        <FilterByRating setFilterStar={setStar} />
        <FilterBySearchbar setSearch={setSearchKeyword} />

        {data && moreBtn && (
          <NavLink to={pagePath}>
            <button>More</button>
          </NavLink>
        )}
      </div>
      {data.length === 0 ? (
        <p>{noDataMsg}</p>
      ) : (
        <div className="profile-list__card-container">{cardsList}</div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ProfileList;
