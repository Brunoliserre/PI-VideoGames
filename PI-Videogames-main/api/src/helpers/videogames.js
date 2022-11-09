const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db');

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

module.exports = {getAllGames}