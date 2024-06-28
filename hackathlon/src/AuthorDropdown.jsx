import React, { useState } from 'react';

const AuthorDropdown = ({ authors, onSelect }) => {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredAuthors = authors.filter(author =>
    author.username.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search for authors..."
        value={filter}
        onChange={handleFilterChange}
      />
      <select onChange={(e) => onSelect(e.target.value)}>
        <option value="">Select an author</option>
        {filteredAuthors.map(author => (
          <option key={author.id} value={author.username}>
            {author.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AuthorDropdown;
