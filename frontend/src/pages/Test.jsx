import useMovieInfo from '../hooks/useMovieInfo';

const Test = () => {
  const movieInfo = useMovieInfo('884605');
  console.log(movieInfo);

  return <div>Hello</div>;
};

export default Test;
