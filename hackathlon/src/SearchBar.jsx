import React, { useState } from 'react';

// Define the SearchBar component
const SearchBar = ({ onSearch }) => {
  // Create a state variable to hold the search term within this component
  const [searchTerm, setSearchTerm] = useState('');

  // Function to handle form submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    onSearch(searchTerm); // Call the onSearch function passed via props with the search term
  };

  return (
    <form onSubmit={handleSearch}>
      {/* Input field for the search term */}
      <input
        type="text"
        name="search"
        placeholder="Search for images..."
        value={searchTerm} // Bind the input value to the searchTerm state
        onChange={(e) => setSearchTerm(e.target.value)} // Update the searchTerm state when the input value changes
      />
      <button type="submit">Search</button> {/* Button to submit the form */}
    </form>
  );
};

export default SearchBar; // Export the SearchBar component
