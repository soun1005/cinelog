// this resolver is to make endpoint to get the data according to search keyword
// and call API to get correspond data

import responseHandler from '../handlers/response.handler.js';
import axios from 'axios';
import { moviesDataFormat } from '../dataFormat/movieDataFormat.js';

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_API_KEY;

const fetchDataFromApi = async (query) => {
  try {
    // console.log(
    //   `${baseUrl}/search/movie?query=${query}&api_key=${key}&language=${lan}`
    // );
    const response = await axios.get(
      `${baseUrl}/search/movie?query=${query}&api_key=${key}`
    );
    console.log('fetchDataFromApi called');

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

export default fetchDataFromApi;
