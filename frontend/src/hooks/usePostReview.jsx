import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const usePostReview = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const navigate = useNavigate();

  const base = 'http://localhost:4000/api/v1';
  //   const token = localStorage.getItem('token');

  const review = async ({ title, date, comment, ratings, mediaId }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${base}/review`,
        {
          title,
          date,
          comment,
          ratings,
          mediaId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log(response.data);
      if (response.status === 200) {
        navigate('/movie');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      setError(error.response.data.error);
    }
  };

  return { review, isLoading, error };
};
