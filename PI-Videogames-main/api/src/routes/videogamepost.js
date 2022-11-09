const { Router } = require ('express');
require('dotenv').config();
const { sequelize } = require ('sequelize');
const { Videogame, Genre } = require('../db');


const router = Router();

router.post('/', async (req, res) => {
    let { name, description, released, rating, platforms, genres } = req.body; //Hago el post con lo que viene por body
    
    let newVideogame = await Videogame.create ({
        name, description, released, rating, platforms
    }); //Creo el personaje

    //let genresDB = await Genre.findAll({
       // where: {name: genres}
    //}); //El género lo busco dentro del modelo que coincida con lo que entra por body

    //newVideogame.addGenre(genresDB); //Método de sequelize. Le agrego el género al nuevo videogame
    //res.send('¡Personaje creado exitosamente!');
    res.json({msg: 'Mamala', newVideogame})
})




module.exports = router;
