// import MainMovieDisplay from '../components/MainMovieDisplay';
import ApiFetchService from '../api/apiFetchService';
import { apiEndpoint } from '../constant/api';
import Loading from '../components/Loading';
import SearchBar from '../components/SearchBar';
import Carousel from '../components/Carousel';
import CarouselCard from '../components/CarouselCard';
// import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

      <Carousel
        children={CarouselCard({ data: upcomingData })}
        title="Upcoming"
      />

      <Carousel
        children={CarouselCard({ data: nowPlayingData })}
        title="Now Playing"
      />

      {nowPlayingLoading && upcomingLoading && <Loading />}
      {/* {nowPlayingData && (
        <MainMovieDisplay
          data={nowPlayingData}
          // title="Now Playing"
        ></MainMovieDisplay>
      )} */}
      {/* {upcomingData && (
        <MainMovieDisplay
          data={upcomingData}
          // title="Upcoming"
        ></MainMovieDisplay>
      )} */}
    </div>
  );
};

export default Main;
