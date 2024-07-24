import React from 'react';
import './SearchUsers.css';

const SearchUsers = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  return (
    <div className="search-users">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchUsers;
