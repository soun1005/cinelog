import { useState } from 'react';

const FilterBySearchbar = ({ setSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleOnChange = (e) => {
    const lower = e.target.value.toLowerCase();
    console.log(lower);
    setSearchTerm(lower);
    setSearch(lower);
  };

  return (
    <div>
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