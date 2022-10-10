const { Router } = require('express');
const {getAll, getPokemonById, newPokemon} = require("../controllers/getPokemon")
const {getTypes} = require("../controllers/getTypes")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();
router.get("/pokemons", getAll)
router.get("/pokemons/:id", getPokemonById)
router.get("/types", getTypes)
router.post("/newpokemon", newPokemon)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
