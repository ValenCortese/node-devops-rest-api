const pokemonService = require('../services/pokemon.service');

// Controlador para obtener pokemon por nombre
exports.getPokemonByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    const pokemon = await pokemonService.fetchPokemonByName(name);
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    res.status(200).json(pokemon);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    next(error);
  }
};

// Controlador para obtener pokemon aleatorio
exports.getRandomPokemon = async (req, res, next) => {
  try {
    const pokemon = await pokemonService.fetchRandomPokemon();
    res.status(200).json(pokemon);
  } catch (error) {
    next(error);
  }
};
