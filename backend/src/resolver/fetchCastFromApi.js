// this resolver calls TMDB API to get actor's information and movie credits
import axios from 'axios';
import {
  castInfoFormat,
  castsCreditsFormat,
} from '../dataFormat/castsDataFormat.js';

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_API_KEY;

const fetchCastFromApi = async (castId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/person/${castId}?api_key=${key}`
    );
    const data = response.data;

    const formattedData = castInfoFormat(data);
    console.log('fetchCasting called');

    return formattedData;
  } catch (error) {
    // responseHandler.error(res);
    console.log(error);
  }
};

const fetchCastCreditsFromApi = async (castId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/person/${castId}/movie_credits?api_key=${key}`
    );
    console.log('fetchCasting credits called');
    const castData = response.data.cast;
    const crewData = response.data.crew;
    const formattedData = {
      formattedCastData: castsCreditsFormat(castData),
      formattedCrewData: castsCreditsFormat(crewData),
    };

    // console.log(formattedData);

    return formattedData;
  } catch (error) {
    // responseHandler.error(res);
    console.log(error);
  }
};

export { fetchCastFromApi, fetchCastCreditsFromApi };
