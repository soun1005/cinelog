import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from './useAuthContext'

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

    const response = await fetch(`${base}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username, firstname, lastname }),
    });
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
      console.log(json);
    }
    if (response.ok) {
      // console.log(response);
      // update loading state
      navigate('/login');
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
