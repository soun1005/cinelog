import { useState } from 'react';
// import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  //   const { dispatch } = useAuthContext()

  const base = 'http://localhost:4000/api/v1';

  const signup = async (email, password, username, firstname, lastname) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(`${base}/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username, firstname, lastname }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      console.log(response);
      // update loading state
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error };
};
