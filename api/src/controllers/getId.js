require('dotenv').config();
const { API_KEY } = process.env;

const axios = require('axios');
const { Videogame, Genres } = require('../db');

//·Solicitud para mi request por params
//·Endpoint -> https://api.rawg.io/api/games/{id}
const getIdApi = async (id) => {
    try {
        let resApi = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        if (resApi) { //si me llega info...
            const vgId = await resApi.data;
            const game = {
                id: vgId.id,
                name: vgId.name,
                image: vgId.background_image,
                genres: vgId.genres?.map(g => g.name),
                description: vgId.description,
                released: vgId.released,
                rating: vgId.rating,
                platforms: vgId.platforms?.map(el => el.platform.name)
            }
            return game;
        }
        else {
            return ('No hay videojuego con ese id');
        }
    } catch (error) {
        console.log('No hay game id', error);
    } 
};

//·Solicitud a la bd
const getDb = async (id) => {
    try {
        const vGame = await Videogame.findByPk(id, {
            include: [{
                model: Genres,
                atributes: ['name'],
                throught: { 
                    attributes: [] 
                }
            }]
        })
        return vGame;
    } catch (error) {
        console.log('no info Db', error);
    }
};

//·Union de las dos solicitudes (a api y db)
const videogameId = async (id) => {
    const dbId = id.includes('-')
    if(dbId){//si mi id contiene un signo "-"
        const vgDb = await getDb(id);
        return vgDb
    }
    else {
        vgApi = await getIdApi(id);
        return vgApi;
    }
};

module.exports = { videogameId };