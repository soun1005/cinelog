import ProfileList from '../components/ProfileList';
import FavouriteListService from '../api/favouriteListService';

const FavouritedMovieList = () => {
  const favourite = FavouriteListService();

  if (!favourite) {
    // display loader here or error
    return null;
  }
  return (
    <div className="favourite-list-page page">
      <ProfileList
        data={favourite}
        listTitle="My favourites"
        noDataMsg="No favourited movies yet"
        noMatchMsg="No matched favourited movies"
        buttons={true}
        moreBtn={false}
        isReview={false}
        dataLength={favourite.length}
        setSearchFilter={true}
        setSortFilter={true}
      />
    </div>
  );
};

export default FavouritedMovieList;
