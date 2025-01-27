import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch an image URL based on the provided parameters.
 * @param {string} icon - The icon path or identifier to fetch.
 * @param {string} type - The type of the resource (e.g., 'champion', 'spell').
 * @returns {string} The fetched image URL.
 */
const useFetchImage = (icon, type) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!icon || !type) return;

    const fetchImage = async () => {
      try {
        const url = await window.api.fetchImage(icon, type);
        setImageUrl(url);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [icon, type]);

  return imageUrl;
};

export default useFetchImage;