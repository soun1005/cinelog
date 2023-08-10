import React from 'react';
import MainMovieDisplay from '../components/MainMovieDisplay';
import useApiFetch from '../hooks/useApiFetch';

const Main = () => {
  const nowPlayingEndpoint = 'http://localhost:4000/api/v1/movies/nowplaying';
  const upcomingEndpoint = 'http://localhost:4000/api/v1/movies/upcoming';

  // now playing
  const nowPlayingRes = useApiFetch(nowPlayingEndpoint);
  const nowPlayingData = nowPlayingRes.data;

  // upcoming
  const upcomingRes = useApiFetch(upcomingEndpoint);
  const upcomingData = upcomingRes.data;

  return (
    <div>
      {nowPlayingData && (
        <MainMovieDisplay
          data={nowPlayingData}
          title="Now Playing"
        ></MainMovieDisplay>
      )}
      {upcomingData && (
        <MainMovieDisplay
          data={upcomingData}
          title="Now Playing"
        ></MainMovieDisplay>
      )}
    </div>
  );
};

export default Main;
