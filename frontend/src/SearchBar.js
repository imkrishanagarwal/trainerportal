import React, { useState } from 'react';

const SearchBar = ({ onSearch, onReset }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleReset = () => {
    setSearchTerm(''); // Clear the search input
    onReset(); // Call the reset function in the parent component
  };

  return (
    <div className='searchContainer w-100'>
  <input
    type="text"
    placeholder="Search by name, email, phone, or skills"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="form-control searchBar"
  />
  <button className="btn p-2 searchBtn" onClick={handleSearch}>Search</button>
  <button className="btn p-2" onClick={handleReset}>Reset</button>
</div>

  );
};

export default SearchBar;
