const movieDataFormat = (data) => {
  return data.results.map(
    ({ id, original_title, poster_path, release_date, overview }) => ({
      id: id,
      title: original_title,
      poster: poster_path,
      releasedDate: release_date,
      overview,
    })
  );
};

export default movieDataFormat;
