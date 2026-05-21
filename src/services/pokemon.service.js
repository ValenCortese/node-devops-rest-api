const axios = require('axios');
const { pokemonFetchCounter, pokemonFetchErrors } = require('../lib/metrics');

const POKEAPI_BASE = 'https://pokeapi.co/api/v2/pokemon';

// Obtener datos simplificados de un pokemon por nombre
exports.fetchPokemonByName = async (name) => {
  try {
    pokemonFetchCounter.add(1, { source: 'pokeapi' });
    const { data } = await axios.get(`${POKEAPI_BASE}/${String(name).toLowerCase()}`);
    return {
      name: data.name,
      height: data.height,
      weight: data.weight,
      types: data.types.map(t => t.type.name)
    };
  } catch (error) {
    pokemonFetchErrors.add(1, { source: 'pokeapi' });
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

// Obtener un pokemon aleatorio
exports.fetchRandomPokemon = async () => {
  // Pokédex nacional tiene 1010 pokémon (hasta Gen 9)
  const maxId = 1010;
  const randomId = Math.floor(Math.random() * maxId) + 1;
  return exports.fetchPokemonByName(randomId);
};
