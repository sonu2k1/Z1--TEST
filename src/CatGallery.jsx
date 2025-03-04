import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CatGallery() {
  const [cats, setCats] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'YOUR_THE_CAT_API_KEY'; // Replace with your API key

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await axios.get('https://api.thecatapi.com/v1/breeds', {
          headers: { 'x-api-key': API_KEY },
        });
        setBreeds(response.data);
      } catch (err) {
        setError('Failed to fetch cat breeds.');
        console.error(err);
      }
    };

    fetchBreeds();
    fetchCats(); // Fetch initial cats
  }, []);

  const fetchCats = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = `https://api.thecatapi.com/v1/images/search?limit=10`; // Fetch 10 images
      if (selectedBreed) {
        url += `&breed_ids=${selectedBreed}`;
      }

      const response = await axios.get(url, {
        headers: { 'x-api-key': API_KEY },
      });
      setCats(response.data);
    } catch (err) {
      setError('Failed to fetch cat images.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBreedChange = (e) => {
    setSelectedBreed(e.target.value);
  };

  const handleRefresh = () => {
    fetchCats();
  };

  return (
    <div>
        <h1>Cat Gallery</h1>
      <div>
        <select value={selectedBreed} onChange={handleBreedChange}>
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
        <button onClick={handleRefresh}>Refresh</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
        {cats.map((cat) => (
          <div key={cat.id}>
            <img src={cat.url} alt="Cat" style={{ maxWidth: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CatGallery;