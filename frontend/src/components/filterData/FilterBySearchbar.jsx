import { useState } from 'react';

const FilterBySearchbar = ({ setSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleOnChange = (e) => {
    const lower = e.target.value.toLowerCase();
    setSearchTerm(lower);
    setSearch(lower);
  };

  return (
    <div className="search-wrap">
      <input
        type="text"
        value={searchTerm}
        onChange={handleOnChange}
        className="search__input"
        placeholder="Search movie title"
      />
    </div>
  );
};

export default FilterBySearchbar;
