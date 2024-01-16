import {
  fetchCastFromApi,
  // fetchCastImgFromApi,
  fetchCastCreditsFromApi,
} from '../resolver/fetchCastFromApi.js';
import responseHandler from '../handlers/response.handler.js';

const getCast = async (req, res) => {
  const castInfo = await fetchCastFromApi(req.params.id);
  const castCredits = await fetchCastCreditsFromApi(req.params.id);

  if (castInfo && castCredits) {
    // Return the data as JSON response
    responseHandler.ok(res, { castInfo, castCredits });
    // res.json({ castInfo, castCredits });
  } else {
    responseHandler.error(res);
  }
};

export default {
  getCast,
};
