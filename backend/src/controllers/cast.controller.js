import {
  fetchCastFromApi,
  fetchCastImgFromApi,
} from '../resolver/fetchCastFromApi.js';
import responseHandler from '../handlers/response.handler.js';

const getCast = async (req, res) => {
  const castData = await fetchCastFromApi(req.params.id);
  const castImg = await fetchCastImgFromApi(req.params.id);
  // console.log('req.params', req.params.id);

  console.log(castImg);

  if (castData && castImg) {
    res.json({ castData, castImg }); // Return the data as JSON response
  } else {
    responseHandler.error(res);
  }
};

export default {
  getCast,
};
