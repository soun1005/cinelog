// from the full credit data (with crew and cast)
// 1. from [cast] array -> return only first two actors
// 2. from [crew] array -> filter and return only one who is Director

const creditDataFormat = (data) => {
  const filteredCast = [data.cast[0], data.cast[1], data.cast[2]];
  const filteredCrew = data.crew.filter((crew) => crew.job === 'Director');

  // returns first 3 actors and director data
  return { filteredCast, filteredCrew };
};

export default creditDataFormat;
