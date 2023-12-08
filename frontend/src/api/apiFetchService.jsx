import { useEffect, useState } from 'react';
import axios from 'axios';

const ApiFetchService = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState('');

  useEffect(() => {
    axios(endpoint).then((res) => {
      seterror(res.error);
      setData(res.data); // 첫 N개 요소만 추출하여 저장
      setloading(false);
    });
  }, [endpoint]);

  return { data, loading, error };
};

export default ApiFetchService;
