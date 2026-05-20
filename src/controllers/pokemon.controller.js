const pokemonService = require('../services/pokemon.service');
const logger = require('../lib/logger');

// Controlador para obtener pokemon por nombre
exports.getPokemonByName = async (req, res, next) => {
  try {
    const { name } = req.params;
    logger.info({ pokemonName: name }, 'Buscando información de pokemon por nombre');
    
    const pokemon = await pokemonService.fetchPokemonByName(name);
    if (!pokemon) {
      logger.warn({ pokemonName: name }, 'Pokemon no encontrado');
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    
    logger.info({ pokemonName: pokemon.name }, 'Pokemon obtenido exitosamente');
    res.status(200).json(pokemon);
  } catch (error) {
    if (error.response && error.response.status === 404) {
      logger.warn({ pokemonName: req.params.name, error: error.message }, 'Pokemon no encontrado en servicio externo');
      return res.status(404).json({ error: 'Pokemon not found' });
    }
    logger.error({ err: error }, 'Error en controlador getPokemonByName');
    next(error);
  }
};

// Controlador para obtener pokemon aleatorio
exports.getRandomPokemon = async (req, res, next) => {
  try {
    logger.info('Solicitando pokemon aleatorio');
    const pokemon = await pokemonService.fetchRandomPokemon();
    logger.info({ pokemonName: pokemon.name }, 'Pokemon aleatorio obtenido exitosamente');
    
    res.status(200).json(pokemon);
  } catch (error) {
    logger.error({ err: error }, 'Error en controlador getRandomPokemon');
    next(error);
  }
};
