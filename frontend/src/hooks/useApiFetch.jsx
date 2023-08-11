import { useEffect, useState } from 'react';
import axios from 'axios';

const useApiFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState('');

  useEffect(() => {
    axios(endpoint).then((res) => {
      seterror(res.error);
      setData(res.data.slice(0, 16)); // 첫 16개 요소만 추출하여 저장
      // setData(res.data);
      setloading(false);
    });
  }, [endpoint]);

  return { data, loading, error };
};

export default useApiFetch;
