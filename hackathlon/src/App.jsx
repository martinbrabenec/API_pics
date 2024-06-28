import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar'; // Import the SearchBar component
import AuthorInfo from './AuthorInfo'; // Import the AuthorInfo component
import AuthorDropdown from './AuthorDropdown'; // Import the AuthorDropdown component

const ACCESS_KEY = 'WXZ8zC2Kl5wu0i8bT7XnxCpKtvIkxGv6sVynfmQn_98'; // Your Unsplash API access key

// Define the main UnsplashGallery component
const UnsplashGallery = () => {
  // Create state variables to hold the photos and the search term
  const [photos, setPhotos] = useState([]);
  // Create a state variable to hold the search term
  const [searchTerm, setSearchTerm] = useState('');
  // Create a state variable to hold the selected author's username
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  // Create a state variable to hold the list of authors
  const [authors, setAuthors] = useState([]);
  // Create a state variable to hold user details
  const [userDetails, setUserDetails] = useState({});

  // useEffect hook to fetch photos based on the search term
  useEffect(() => {
    if (searchTerm) {
      fetchPhotos(searchTerm);
    }
  }, [searchTerm]);

  // Function to fetch photos based on the search term
  const fetchPhotos = async (query) => {
    const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}&per_page=12`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos(data.results);
      const uniqueAuthors = Array.from(new Set(data.results.map(photo => photo.user.username)))
        .map(username => data.results.find(photo => photo.user.username === username).user);
      setAuthors(uniqueAuthors);
      fetchUserDetails(uniqueAuthors.map(author => author.username));
    } catch (error) {
      console.error('Error fetching photos from Unsplash:', error);
    }
  };

  // Function to fetch user details
  const fetchUserDetails = async (usernames) => {
    const userDetailsPromises = usernames.map(username =>
      fetch(`https://api.unsplash.com/users/${username}?client_id=${ACCESS_KEY}`)
        .then(response => response.json())
    );
    const userDetailsArray = await Promise.all(userDetailsPromises);
    const userDetailsObject = userDetailsArray.reduce((acc, user) => {
      acc[user.username] = user;
      return acc;
    }, {});
    setUserDetails(userDetailsObject);
  };

  // Function to handle when an author's name is clicked
  const handleAuthorClick = (username) => {
    setSelectedAuthor(username); // Set the selected author
  };

  return (
    <div className="container">
      <SearchBar onSearch={setSearchTerm} /> {/* Render the SearchBar component and pass the setSearchTerm function */}
      <AuthorDropdown authors={authors} onSelect={setSelectedAuthor} /> {/* Render the AuthorDropdown component */}
      <div className="main-content">
        <div className="gallery">
          {/* Map over the photos and render each one */}
          {photos.map(photo => (
            <div key={photo.id} className="photo">
              <img src={photo.urls.small} alt={photo.alt_description} /> {/* Display the photo */}
              <h3 onClick={() => handleAuthorClick(photo.user.username)}>{photo.user.name}</h3> {/* Make author name clickable */}
            </div>
          ))}
        </div>
        {selectedAuthor && (
          <div className="author-info">
            <AuthorInfo username={selectedAuthor} /> {/* Render AuthorInfo if an author is selected */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnsplashGallery; // Export the UnsplashGallery component
