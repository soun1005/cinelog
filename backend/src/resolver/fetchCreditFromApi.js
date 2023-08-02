// this resolver is to make endpoint to get the credit data according to movie ID
// and call API to get correspond data

import responseHandler from '../handlers/response.handler.js';
import axios from 'axios';
import movieDataFormat from '../dataFormat/movieDataFormat.js';

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_API_KEY;

const fetchCreditFromApi = async (idQuery) => {
  try {
    // console.log(
    //   `${baseUrl}/search/movie/${idQuery}/credits?api_key=${key}`
    // );
    const response = await axios.get(
      `${baseUrl}/movie/${idQuery}/credits?api_key=${key}`
    );
    console.log('fetchCreditFromApi called');

    return response.data;

    // This will return the data received from the API
    // return response.data;
  } catch (error) {
    // responseHandler.error(res);
    console.log(error);
  }
};

export default fetchCreditFromApi;
