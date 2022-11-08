const express = require ('express');
const axios = require ('axios');
const {API_KEY} = process.env;


const router = express.Router();
//Routes
const videogames = require ('./videogames');

router.use('/videogames', videogames);

module.exports = router;

