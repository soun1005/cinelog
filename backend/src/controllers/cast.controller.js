import {
  fetchCastFromApi,
  // fetchCastImgFromApi,
  fetchCastCreditsFromApi,
} from '../resolver/fetchCastFromApi.js';
import responseHandler from '../handlers/response.handler.js';

const getCast = async (req, res) => {
  const castData = await fetchCastFromApi(req.params.id);
  const castCredits = await fetchCastCreditsFromApi(req.params.id);

  if (castData && castCredits) {
    // Return the data as JSON response
    res.json({ castData, castCredits });
  } else {
    responseHandler.error(res);
  }
};

export default {
  getCast,
};
