import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'; // Import the SearchBar component
import AuthorInfo from './AuthorInfo'; // Import the AuthorInfo component
import AuthorDropdown from './AuthorDropdown'; // Import the AuthorDropdown component

// Define the main UnsplashGallery component
const UnsplashGallery = () => {
  // Create state variables to hold the photos and the search term
  const [photos, setPhotos] = useState([]);
  // Create a state variable to hold the current search term
  const [searchTerm, setSearchTerm] = useState('');
  // Create a state variable to hold the selected author's username
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  // Create a state variable to hold the list of authors
  const [authors, setAuthors] = useState([]);

  // useEffect hook to fetch photos when the search term changes
  useEffect(() => {
    if (searchTerm) {
      fetchPhotos(searchTerm); // Call fetchPhotos when searchTerm changes
    }
  }, [searchTerm]); // This effect runs whenever the searchTerm changes

  // Function to fetch photos from the Unsplash API based on the search term
  const fetchPhotos = async (query) => {
    const accessKey = 'WXZ8zC2Kl5wu0i8bT7XnxCpKtvIkxGv6sVynfmQn_98'; // Your Unsplash API access key
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`;

    try {
      const response = await fetch(url); // Fetch data from the API
      const data = await response.json(); // Parse the JSON response
      setPhotos(data.results); // Update the photos state with the results
      const uniqueAuthors = Array.from(new Set(data.results.map(photo => photo.user.username)))
        .map(username => data.results.find(photo => photo.user.username === username).user);
      setAuthors(uniqueAuthors); // Update the authors state with unique authors from the photo results
    } catch (error) {
      console.error('Error fetching photos from Unsplash:', error); // Log any errors
    }
  };

  // Function to handle when an author's name is clicked
  const handleAuthorClick = (username) => {
    setSelectedAuthor(username); // Set the selected author
  };

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} /> {/* Render the SearchBar component and pass the setSearchTerm function */}
      <AuthorDropdown authors={authors} onSelect={setSelectedAuthor} /> {/* Render the AuthorDropdown component */}
      <div className="gallery">
        {/* Map over the photos and render each one */}
        {photos.map(photo => (
          <div key={photo.id} className="photo">
            <img src={photo.urls.small} alt={photo.alt_description} /> {/* Display the photo */}
            <p onClick={() => handleAuthorClick(photo.user.username)}> {/* Make author name clickable */}
              Photo by {photo.user.name}
            </p>
          </div>
        ))}
      </div>
      {selectedAuthor && <AuthorInfo username={selectedAuthor} />} {/* Render AuthorInfo if an author is selected */}
    </div>
  );
};

export default UnsplashGallery; // Export the UnsplashGallery component
