// search movies and get a data
import responseHandler from '../handlers/response.handler.js';
import fetchNowPlayingFromApi from '../resolver/fetchNowPlayingFromApi.js';
import fetchUpcomingFromApi from '../resolver/fetchUpcomingFromApi.js';

const getNowPlaying = async (req, res) => {
  const dataLengthToFetch = 12;
  const allData = await fetchNowPlayingFromApi(req.query.query);
  const data = allData.slice(0, dataLengthToFetch);

  if (data) {
    res.json(data); // Return the data as JSON response
  } else {
    responseHandler.error(res);
  }
};

const getUpcoming = async (req, res) => {
  const dataLengthToFetch = 12;
  const allData = await fetchUpcomingFromApi(req.query.query);
  const data = allData.slice(0, dataLengthToFetch);

  if (data) {
    res.json(data); // Return the data as JSON response
  } else {
    responseHandler.error(res);
  }
};

export default {
  getNowPlaying,
  getUpcoming,
};
