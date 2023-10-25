import MainMovieDisplay from '../components/MainMovieDisplay';
import ApiFetchService from '../api/apiFetchService';
import { apiEndpoint } from '../constant/api';
import Loading from '../components/Loading';

const Main = () => {
  const nowPlayingEndpoint = `${apiEndpoint}/movies/nowplaying`;
  const upcomingEndpoint = `${apiEndpoint}/movies/upcoming`;

  // now playing
  // number of movies that I wanna display on second arguement
  const nowPlayingRes = ApiFetchService(nowPlayingEndpoint, 16);
  const nowPlayingData = nowPlayingRes.data;
  const nowPlayingLoading = nowPlayingRes.loading;

  // upcoming
  const upcomingRes = ApiFetchService(upcomingEndpoint, 16);
  const upcomingData = upcomingRes.data;
  const upcomingLoading = upcomingRes.loading;

  return (
    <div className="page">
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
