import MainMovieDisplay from '../components/MainMovieDisplay';
import ApiFetchService from '../api/apiFetchService';
import { apiEndpoint } from '../constant/api';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';

const Main = () => {
  const nowPlayingEndpoint = `${apiEndpoint}/movies/nowplaying`;
  const upcomingEndpoint = `${apiEndpoint}/movies/upcoming`;

  // now playing
  const nowPlayingRes = ApiFetchService(nowPlayingEndpoint);
  const { data: nowPlayingData, loading: nowPlayingLoading } = nowPlayingRes;

  // upcoming
  const upcomingRes = ApiFetchService(upcomingEndpoint);
  const { data: upcomingData, loading: upcomingLoading } = upcomingRes;

  return (
    <div className="page">
      <SearchBar />

      {nowPlayingLoading && upcomingLoading && <Loading />}
      {nowPlayingData && (
        <MainMovieDisplay
          data={nowPlayingData}
          title="Now Playing"
        ></MainMovieDisplay>
      )}
      {upcomingData && (
        <MainMovieDisplay
          data={upcomingData}
          title="Upcoming"
        ></MainMovieDisplay>
      )}
    </div>
  );
};

export default Main;
