const { sequelize } = require('sequelize');
const { getAllGames } = require('../helpers/videogames');
const { Videogame, Genre } = require('../db');


const getGames = async (req, res) => {
    const name = req.query.name; //Incluyo la busqueda por query en la ruta
    let totalVideogames = await getAllGames();
    if (name) {
        let videogameName = await totalVideogames.filter(el => el.name.toLowerCase().includes(name.toLowerCase())) //Para que incluya cuando se carga en minúscula 
        videogameName.length ? 
        res.status(200).send(videogameName) :
        res.status(404).send('Videojuego no encontrado');
    } else {
        res.status(200).send(totalVideogames);
    }
};

const getGamesById = async (req, res) => {
    const id = req.params.id;
    const totalVG =  await getAllGames();
    if (id) {
        let videogameID = await totalVG.filter(el => el.id == id) //Dentro de los videogames busco el que tenga la ID que me pasan
        videogameID.lenght ?
        res.status(200).send(videogameID) :
        res.status(404).send('Videojuego no encontrado');
    }
};

const createVideogame = async (req, res) => {
    let { name, description, released, rating, platforms, genres} = req.body; 
    
    let newVideogame = await Videogame.create ({name, description, released, rating, platforms});

    let genreDb = await Genre.findAll({
        where: { name : genres}
    });

    newVideogame.addGenre(genreDb); 

    res.send('Videojuego creado con éxito');
}


module.exports = {getGames, getGamesById, createVideogame};