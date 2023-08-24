import { ReactComponent as StarIcon } from '../assets/starIcon.svg';

export default function Ratings({ rating }) {
  const maxRating = 5;
  const numberOfEmptyStar = maxRating - rating;

  const starIcons = [];

  for (let i = 0; i < rating; i++) {
    starIcons.push(<StarIcon key={i} className="star" />);
  }

  const emptyStarIcons = [];
  for (let i = 0; i < numberOfEmptyStar; i++) {
    emptyStarIcons.push(<StarIcon key={i} className="emptyStar" />);
  }

  return (
    <>
      {starIcons}
      {emptyStarIcons}
    </>
  );
}
