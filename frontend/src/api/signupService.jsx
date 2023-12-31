import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiEndpoint } from '../constant/api';

export const SignupService = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const base = apiEndpoint;

  const signup = async ({ email, password, username, firstname, lastname }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${base}/signup`,
        {
          email,
          password,
          username,
          firstname,
          lastname,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        navigate('/login');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  return { signup, isLoading, error };
};

export default SignupService;
