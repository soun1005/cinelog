import React from 'react';

const ListTitle = ({ listTitle, dataLength }) => {
  return (
    <div>
      <div className="list-title-wrap">
        {/* review title and number of review */}
        <h1>
          {listTitle}
          {` (${dataLength})`}
        </h1>
      </div>
    </div>
  );
};

export default ListTitle;
