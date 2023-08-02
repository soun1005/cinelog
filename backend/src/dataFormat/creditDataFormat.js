// from the full credit data (with crew and cast)
// 1. from [cast] array -> return only first two actors
// 2. from [crew] array -> filter and return only one who is Director

const creditDataFormat = (data) => {
  const filteredCast = [data.cast[0], data.cast[1]];
  // filteredCast.push(data.crew[0], data.crew[1])
  const filteredCrew = data.crew.filter((crew) => crew.job === 'Director');
  return { filteredCast, filteredCrew };
};

export default creditDataFormat;
