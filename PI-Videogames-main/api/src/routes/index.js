const express = require ('express');
const axios = require ('axios');


const router = express.Router();

//ROUTES
const videogames = require ('./videogames');
const genres = require ('./genres');
const videogamepost = require ('./videogamepost');

router.use('/videogames', videogames);
router.use('/genres', genres);
router.use('/videogamepost', videogamepost);

module.exports = router;

