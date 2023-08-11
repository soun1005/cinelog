// import responseHandler from '../handlers/response.handler.js';
import axios from 'axios';
import { moviesDataFormat } from '../dataFormat/movieDataFormat.js';

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_API_KEY;

const fetchUpcomingFromApi = async (query) => {
  try {
    const response = await axios.get(
      `${baseUrl}/movie/upcoming?language=en-US&page=1?query=${query}&api_key=${key}`
    );
    console.log('fetchUpcomingFromApi called');
    // console.log(response.data);
    // format data and pass formatted data to front
    const formattedMovieData = moviesDataFormat(response.data);
    return formattedMovieData;

    // This will return the data received from the API
    // return response.data;
  } catch (error) {
    // responseHandler.error(res);
    console.log(error);
  }
};

export default fetchUpcomingFromApi;
