import { useEffect, useState } from 'react';
import axios from 'axios';

const useApiFetch = (endpoint) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState('');

  useEffect(() => {
    axios(endpoint).then((res) => {
      seterror(res.error);
      setdata(res.data);
      setloading(false);
    });
  }, [endpoint]);

  return { data, loading, error };
};

export default useApiFetch;
