import ProfileList from '../components/ProfileList';
import useFavouriteList from '../hooks/useFavouriteList';

const FavouritedMovieList = () => {
  const favourite = useFavouriteList();
  if (!favourite) {
    // display loader here or error
    return null;
  }
  return (
    <div>
      <div>My favourites</div>

      <ProfileList
        data={favourite}
        listTitle=""
        noDataMsg="No favourited movies yet"
        buttons={true}
        moreBtn={false}
        isReview={false}
      />
    </div>
  );
};

export default FavouritedMovieList;
