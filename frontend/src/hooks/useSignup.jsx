import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();
  //   const { dispatch } = useAuthContext()

  const base = 'http://localhost:4000/api/v1';

  const signup = async ({
    email,
    password,
    confirmPassword,
    username,
    firstname,
    lastname,
  }) => {
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

      console.log(response.data);
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
