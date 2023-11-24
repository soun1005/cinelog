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
import SortByDate from './filterData/SortByDate';
import ConfirmModal from './ConfirmModal';

const ProfileList = ({
  data,
  listTitle,
  noDataMsg,
  noMatchMsg,
  dateLabel,
  pagePath,
  isReview = true,
  moreBtn = true,
  buttons = false,
  dataLength,
  // filters are added when true
  setRatingFilter = false,
  setSearchFilter = false,
  setSortFilter = false,
}) => {
  const [star, setStar] = useState(5);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  // to open and close confirm modal
  const [confirmModal, setConfirmModal] = useState(null);

  const dispatch = useDispatch();

  // for filtering
  useEffect(() => {
    const filtered = data.filter((d) => {
      if (d.ratings !== undefined) {
        return (
          d.ratings <= star && d.title.toLowerCase().includes(searchKeyword)
        );
      }
      return d.title.toLowerCase().includes(searchKeyword);
    });
    setFilteredData(filtered);
  }, [data, searchKeyword, star]);

  useEffect(() => {
    // Update the filtered data whenever 'sortBy' changes
    // Sorting function based on the 'sortBy' state
    const sortData = () => {
      let sortedData = [...filteredData];
      switch (sortBy) {
        case 'Added date ▽':
          sortedData.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          break;
        case 'Added date △':
          sortedData.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          break;
        case 'Released date ▽':
          sortedData.sort(
            (a, b) => new Date(b.releasedDate) - new Date(a.releasedDate)
          );
          break;
        case 'Released date △':
          sortedData.sort(
            (a, b) => new Date(a.releasedDate) - new Date(b.releasedDate)
          );
          break;
        default:
          // No sorting
          break;
      }
      setFilteredData(sortedData);
    };
    sortData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  // To manage review counts
  const reviewCount =
    star === 5 && searchKeyword === '' ? dataLength : filteredData.length;

  const cardsList = filteredData.map((movie, index) => {
    const { createdAt, ratings, poster, _id, title, releasedDate, mediaId } =
      movie;
    const posterSrc = poster.includes('null') ? fallback : poster;

    const releasedYear = releasedDate.slice(0, 4);
    const reviewedDate = createdAt.slice(0, 10);

    const handleDeleteReview = () => {
      // confirm modal
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
    };

    const handleDeleteFavourite = () => {
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
              onClick={() => setConfirmModal(index)}
            />
            <ConfirmModal
              isModalOpen={confirmModal === index}
              closeModal={() => setConfirmModal(null)}
              eventFunc={handleDeleteReview}
              warningMsg="Do you really want to delete this review?"
            />
          </div>
        )}
        {buttons && !isReview && (
          <>
            <BtnWithEvent
              text="Delete"
              className="btnStyle specialBtn reviewBtns"
              onClick={() => setConfirmModal(index)}
            />
            <ConfirmModal
              isModalOpen={confirmModal === index}
              closeModal={() => setConfirmModal(null)}
              eventFunc={handleDeleteFavourite}
              warningMsg="Do you really want to remove from favourite?"
            />
          </>
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

        {/* filters and sort */}
        <div className="filter__container">
          {setRatingFilter && <FilterByRating setFilterStar={setStar} />}
          {setSortFilter && <SortByDate setDate={setSortBy} />}
          {setSearchFilter && (
            <FilterBySearchbar setSearch={setSearchKeyword} />
          )}
        </div>

        {data && moreBtn && (
          <NavLink to={pagePath}>
            <button>More</button>
          </NavLink>
        )}
      </div>

      {data.length === 0 && filteredData.length === 0 ? (
        <p>{noDataMsg}</p>
      ) : data.length > 0 && filteredData.length === 0 ? (
        <p>{noMatchMsg}</p>
      ) : (
        <div className="profile-list__card-container">{cardsList}</div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ProfileList;
