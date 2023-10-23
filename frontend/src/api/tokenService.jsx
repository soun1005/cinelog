import { useState, useEffect } from 'react';

const TokenService = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getToken = localStorage.getItem('token');
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  return token;
};

export default TokenService;
