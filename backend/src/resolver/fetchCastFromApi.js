import axios from 'axios';

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_API_KEY;

const fetchCastFromApi = async (castId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/person/${castId}?api_key=${key}`
    );
    console.log('fetchCasting called');

    // This will return the data received from the API
    return response.data;
  } catch (error) {
    // responseHandler.error(res);
    console.log(error);
  }
};

const fetchCastImgFromApi = async (castId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/person/${castId}/images?api_key=${key}`
    );
    console.log('fetchCasting called');

    // This will return the data received from the API
    return response.data;
  } catch (error) {
    // responseHandler.error(res);
    console.log(error);
  }
};

export { fetchCastFromApi, fetchCastImgFromApi };