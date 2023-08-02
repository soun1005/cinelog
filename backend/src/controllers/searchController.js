// search movies and get a data
import responseHandler from '../handlers/response.handler.js';
import fetchDataFromApi from '../resolver/fetchDataFromApi.js';
import fetchCreditFromApi from '../resolver/fetchCreditFromApi.js';

const getSearchResult = async (req, res) => {
  const data = await fetchDataFromApi(req.query.query);
  // console.log(data);

  if (data) {
    res.json(data); // Return the data as JSON response
  } else {
    responseHandler.error(res);
  }
};

const getCredit = async (req, res) => {
  // console.log('req:', req);
  const creditData = await fetchCreditFromApi(req.params.id);
  console.log(req.params.id);
  // console.log(creditData);

  if (creditData) {
    res.json(creditData);
  } else {
    responseHandler.error(res);
  }
};

export default {
  getSearchResult,
  getCredit,
};
