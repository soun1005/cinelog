// import responseHandler from '../handlers/response.handler.js';
import axios from 'axios';
import { moviesDataFormat } from '../dataFormat/movieDataFormat.js';

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_API_KEY;

const fetchNowPlayingFromApi = async (query) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/now_playing?region=FR&language=en-US&page=1?query=${query}&api_key=${key}`
    );
    console.log('fetchMainMoviesFromApi called');

    // format data and pass formatted data to front
    const formattedMovieData = moviesDataFormat(response.data);
    // console.log(formattedMovieData);

    // This will return the data received from the API
    return formattedMovieData;
  } catch (error) {
    // responseHandler.error(res);
    console.log(error);
  }
};

export default fetchNowPlayingFromApi;
