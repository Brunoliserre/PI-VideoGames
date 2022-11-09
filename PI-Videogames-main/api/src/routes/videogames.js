const { Router } = require ('express');
const { getGames, getGamesById, createVideogame} = require ('../controllers/videogames');

const router = Router();

router.get('/', getGames);

router.get('/:id', getGamesById);

router.post('/', createVideogame);

module.exports = router;