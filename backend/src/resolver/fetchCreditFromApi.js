// this resolver is to make endpoint to get the credit data according to movie ID
// and call API to get correspond data

import responseHandler from '../handlers/response.handler.js';
import axios from 'axios';
import creditDataFormat from '../dataFormat/creditDataFormat.js';

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_API_KEY;

// receive ID as param from front
const fetchCreditFromApi = async (idQuery) => {
  try {
    // endpoint from TMDB to get credit data
    const response = await axios.get(
      `${baseUrl}/movie/${idQuery}/credits?api_key=${key}`
    );
    console.log('fetchCreditFromApi called');

    // This will return the data that is formatted after receiving them from the TMDB API
    // return response.data;
    const formattedData = creditDataFormat(response.data);
    return formattedData;

    // handle error
  } catch (error) {
    // responseHandler.error(res);
    console.log(error);
  }
};

export default fetchCreditFromApi;
