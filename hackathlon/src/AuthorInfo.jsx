import React, { useState, useEffect } from 'react';

// Define the AuthorInfo component
const AuthorInfo = ({ username }) => {
  // State to hold the author's personal information
  const [authorInfo, setAuthorInfo] = useState(null);
  // State to hold the author's photos
  const [authorPhotos, setAuthorPhotos] = useState([]);
  // Unsplash API access key
  const accessKey = 'WXZ8zC2Kl5wu0i8bT7XnxCpKtvIkxGv6sVynfmQn_98';

  // useEffect hook to fetch author info and photos when the username changes
  useEffect(() => {
    fetchAuthorInfo();
    fetchAuthorPhotos();
  }, [username]); // This effect runs whenever the username changes

  // Function to fetch the author's personal information
  const fetchAuthorInfo = async () => {
    const url = `https://api.unsplash.com/users/${username}?client_id=${accessKey}`;

    try {
      const response = await fetch(url); // Fetch data from the API
      const data = await response.json(); // Parse the JSON response
      setAuthorInfo(data); // Update the authorInfo state with the fetched data
    } catch (error) {
      console.error('Error fetching author info from Unsplash:', error); // Log any errors
    }
  };

  // Function to fetch the author's photos
  const fetchAuthorPhotos = async () => {
    const url = `https://api.unsplash.com/users/${username}/photos?client_id=${accessKey}&per_page=10`;

    try {
      const response = await fetch(url); // Fetch data from the API
      const data = await response.json(); // Parse the JSON response
      setAuthorPhotos(data); // Update the authorPhotos state with the fetched data
    } catch (error) {
      console.error('Error fetching author photos from Unsplash:', error); // Log any errors
    }
  };

  // If authorInfo is not yet fetched, show a loading message
  if (!authorInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{authorInfo.name}</h1> {/* Display the author's name */}
      <p>{authorInfo.bio}</p> {/* Display the author's bio */}
      <p>Total Likes: {authorInfo.total_likes}</p> {/* Display the total likes */}
      <p>Total Downloads: {authorInfo.downloads}</p> {/* Display the total downloads */}
      <div className="gallery">
        {/* Map over the author's photos and render each one */}
        {authorPhotos.map(photo => (
          <div key={photo.id} className="photo">
            <img src={photo.urls.small} alt={photo.alt_description} /> {/* Display the photo */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorInfo; // Export the AuthorInfo component
