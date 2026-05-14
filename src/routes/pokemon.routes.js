const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemon.controller');

// Obtener pokemon por nombre
router.get('/:name', pokemonController.getPokemonByName);

// Obtener pokemon aleatorio
router.get('/random', pokemonController.getRandomPokemon);

module.exports = router;
