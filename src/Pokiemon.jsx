import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pokiemon() {
  const [pokemon, setPokemon] = useState(null);
  const [pokemonId, setPokemonId] = useState(1); // Start with Bulbasaur
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        setPokemon(response.data);
      } catch (err) {
        setError('Failed to fetch Pokémon data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [pokemonId]);

  const handlePrev = () => {
    setPokemonId((prevId) => Math.max(1, prevId - 1));
  };

  const handleNext = () => {
    setPokemonId((prevId) => prevId + 1);
  };

  return (
    <div>
        <h1>Pokiemon</h1>
      <div>
        <button onClick={handlePrev}>Previous</button>
        <button onClick={handleNext}>Next</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {pokemon && (
        <div>
          <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
          <h3>Stats:</h3>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Pokiemon;