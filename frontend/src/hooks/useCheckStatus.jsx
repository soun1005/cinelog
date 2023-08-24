import axios from 'axios';
import { apiEndpoint } from '../constant/api';
import { useEffect, useState } from 'react';

const base = apiEndpoint;
const endpoint = { review: 'reviewStatus' };

const useCheckStatus = (type, mediaId, userId) => {
  const [hasReview, setHasReview] = useState(false);
  const path = endpoint[type];

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await axios.post(
          `${base}/${path}`,
          {
            mediaId: mediaId,
            userId: userId,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        const data = response.data;
        if (data.hasReview) {
          setHasReview(true);
        } else {
          setHasReview(false);
        }
      } catch (error) {
        console.error(error);
        setHasReview(false);
      }
    };
    checkStatus();
  }, [mediaId, path, userId]);

  return hasReview;
};

export default useCheckStatus;
