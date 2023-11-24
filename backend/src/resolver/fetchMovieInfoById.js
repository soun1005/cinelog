// this resolver is to make endpoint to get the movie data according to movie ID
// and call API to get correspond data

import responseHandler from '../handlers/response.handler.js';
import axios from 'axios';
import { movieDataFormat } from '../dataFormat/movieDataFormat.js';

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_API_KEY;

// receive ID as param from front
const fetchMovieInfoById = async (idQuery) => {
  try {
    // endpoint from TMDB to get credit data
    const response = await axios.get(
      `${baseUrl}/movie/${idQuery}?api_key=${key}`
    );
    console.log('fetchMovieInfoById called');

    // This will return the data that is formatted after receiving them from the TMDB API
    // return response.data;
    const formattedData = movieDataFormat(response.data);
    return formattedData;

    // handle error
  } catch (error) {
    // responseHandler.error(res);
    console.log(error);
  }
};

export default fetchMovieInfoById;
