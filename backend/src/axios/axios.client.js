import axios from 'axios';

// take url as param, fetch data and return correspond data
const get = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export default { get };
