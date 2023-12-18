import fallback from '../assets/fallback_img.png';

// fallback image replace poster if the img is null
const FallbackPoster = (poster) => {
  const posterSrc = poster.includes('null') ? fallback : poster;
  return posterSrc;
};

export default FallbackPoster;
