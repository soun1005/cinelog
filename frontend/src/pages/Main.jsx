// API
import ApiFetchService from '../api/apiFetchService';
import { apiEndpoint } from '../constant/api';

// components
import Loading from '../components/Loading';
import Carousel from '../components/Carousel';
import MainMovieDisplay from '../components/MainMovieDisplay';
import CarouselCard from '../components/CarouselCard';

// carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Main = () => {
  // constants to fetch data
  const nowPlayingEndpoint = `${apiEndpoint}/movies/nowplaying`;
  const upcomingEndpoint = `${apiEndpoint}/movies/upcoming`;

  // data for now playing
  const nowPlayingRes = ApiFetchService(nowPlayingEndpoint);
  const { data: nowPlayingData, loading: nowPlayingLoading } = nowPlayingRes;

  // data for upcoming
  const upcomingRes = ApiFetchService(upcomingEndpoint);
  const { data: upcomingData, loading: upcomingLoading } = upcomingRes;

  return (
    <div className="page">
      <Carousel
        children={CarouselCard({ data: upcomingData })}
        title="Upcoming"
      />

      {nowPlayingLoading && upcomingLoading && <Loading />}
      {nowPlayingData && (
        <MainMovieDisplay
          data={nowPlayingData}
          title="Now Playing"
        ></MainMovieDisplay>
      )}
    </div>
  );
};

export default Main;
