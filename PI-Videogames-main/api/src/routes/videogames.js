const { Router } = require ('express');
const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db');


const router = Router();

const getGamesInfo = async () => {
    const apiUrl = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`);
    const apiInfo = await apiUrl.data.results.map(el => {
        return {
            name: el.name,
            id: el.id,
            description: el.description,
            releaseDate: el.released,
            rating: el.rating,
            platforms: el.platforms.map(el => el),
            genres: el.genres.map(el => el),
        };
    });
    return apiInfo;
};

const getDBInfo = async () => {
    return await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [], //Nos trae 'name' mediante los atributos
            },
        }
    })
}

const getAllGames = async () => {
    const apiInfo = await getGamesInfo();
    const dbInfo =  await getDBInfo();
    const totalInfo = apiInfo.concat(dbInfo);
    return totalInfo;
}

router.get('/', async (req, res) => {
    const name = req.query.name; //Incluyo la busqueda por query en la ruta
    let totalVideogames = await getAllGames();
    if (name) {
        let videogameName = await totalVideogames.filter(el => el.name.toLowerCase().includes(name.toLowerCase())) //Para que incluya cuando se carga en minúscula 
        videogameName.lenght ? 
        res.status(200).send(videogameName) :
        res.status(404).send('Videojuego no encontrado');
    } else {
        res.status(200).send(totalVideogames);
    }
})

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const totalVG =  await getAllGames();
    if (id) {
        let videogameID = await totalVG.filter(el => el.id == id)
        videogameID.lenght ?
        res.status(200).json(videogameID) :
        res.status(404).send('Personaje no encontrado');
    }
})

module.exports = router;