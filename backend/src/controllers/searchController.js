// search movies and get a data
import responseHandler from '../handlers/response.handler.js';
import fetchDataFromApi from '../resolver/fetchDataFromApi.js';

// update a workout
const getSearchResult = async (req, res) => {
  const data = await fetchDataFromApi(req.query.query);
  // console.log(data);
  // const movies = [];
  if (data) {
    res.json(data); // Return the data as JSON response
  } else {
    responseHandler.error(res);
  }
};

export default {
  getSearchResult,
};
