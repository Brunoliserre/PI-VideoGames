const express = require ('express');
const axios = require ('axios');


const router = express.Router();

//ROUTES
const videogames = require ('./videogames');
const genres = require ('./genres');

router.use('/videogames', videogames);
router.use('/genres', genres);

module.exports = router;

