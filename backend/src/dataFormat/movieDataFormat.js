export const moviesDataFormat = (data) => {
  return data.results.map(
    ({ id, original_title, poster_path, release_date, overview }) => ({
      id: id,
      title: original_title,
      poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
      releasedDate: release_date,
      overview,
    })
  );
};

export const movieDataFormat = ({
  id,
  original_title,
  poster_path,
  release_date,
  overview,
  genres,
}) => ({
  mediaId: id.toString(),
  title: original_title,
  poster: `https://image.tmdb.org/t/p/w500${poster_path}`,
  releasedDate: release_date,
  genre: genres[0].name,
  overview,
});

export default { moviesDataFormat, movieDataFormat };
