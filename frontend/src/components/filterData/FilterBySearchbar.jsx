import { useState } from 'react';

const FilterBySearchbar = ({ setSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleOnChange = (e) => {
    const lower = e.target.value.toLowerCase();
    setSearchTerm(lower);
    setSearch(lower);
  };

  return (
    <>
      <input
        type="text"
        value={searchTerm}
        onChange={handleOnChange}
        className="search__input"
        placeholder="Search movie title"
      />
    </>
  );
};

export default FilterBySearchbar;
