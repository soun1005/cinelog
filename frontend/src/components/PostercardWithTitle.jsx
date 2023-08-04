const PostercardWithTitle = ({ title, date, poster }) => {
  return (
    <div className="postercard-title__container">
      <div className="postercard-title__container-infoWrap">
        <span>{title} </span>
        <span>({date})</span>
      </div>
      <div className="postercard-title__container-posterWrap">
        <img src={poster} alt={title} />
      </div>
    </div>
  );
};

export default PostercardWithTitle;
