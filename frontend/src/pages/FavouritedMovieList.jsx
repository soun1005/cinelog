import ProfileList from '../components/ProfileList';
import useFavouriteList from '../hooks/useFavouriteList';

const FavouritedMovieList = () => {
  const favourite = useFavouriteList();
  console.log('favourite data:', favourite);
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
        buttons={true}
        moreBtn={false}
        isReview={false}
      />
    </div>
  );
};

export default FavouritedMovieList;
