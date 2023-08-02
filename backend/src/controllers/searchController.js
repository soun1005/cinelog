// search movies and get a data
import responseHandler from '../handlers/response.handler.js';
import fetchDataFromApi from '../resolver/fetchDataFromApi.js';
import fetchCreditFromApi from '../resolver/fetchCreditFromApi.js';
import fetchMovieInfoById from '../resolver/fetchMovieInfoById.js';

const getSearchResult = async (req, res) => {
  const data = await fetchDataFromApi(req.query.query);

  if (data) {
    res.json(data); // Return the data as JSON response
  } else {
    responseHandler.error(res);
  }
};

const getMovie = async (req, res) => {
  // first one for credit, second one for movie info
  const creditData = await fetchCreditFromApi(req.params.id);
  const movieData = await fetchMovieInfoById(req.params.id);
  // console.log('movie id', req.params.id);
  // console.log(creditData);

  if (creditData && movieData) {
    res.json({ creditData, movieData });
  } else {
    responseHandler.error(res);
  }
};

export default {
  getSearchResult,
  getMovie,
};
