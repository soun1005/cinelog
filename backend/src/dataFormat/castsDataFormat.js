const castInfoFormat = (data) => {
  const formattedData = {
    biography: data.biography,
    birthday: data.birthday,
    profile_path: `https://image.tmdb.org/t/p/w185/${data.profile_path}`,
    id: data.id,
    name: data.name,
    placeOfBirth: data.placeOfBirth,
    //not included: popularity, known for department
  };

  return formattedData;
};

const castsCreditsFormat = (data) => {
  const formattedData = data.map((movie) => {
    return {
      id: movie.id,
      title: movie.original_title,
      release_date: movie.release_date,
      poster_path: `https://image.tmdb.org/t/p/w185/${movie.poster_path}`,
      overview: movie.overview,
      character: movie.character,
      popularity: movie.popularity,
      role: movie.job,
      // original language, genre ids, backdrop path, video,
      // popularity, credit_id, order, original language not included
    };
  });

  return formattedData;
};

export { castInfoFormat, castsCreditsFormat };
