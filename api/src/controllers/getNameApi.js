require('dotenv').config();
const { API_KEY } = process.env;            

const axios = require('axios');

//·Solitud para request por query, mediante nombre!
const getNameApi = async (name) => {
    let urlApi = await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`);
    //console.log(urlApi) // -> me llega un objeto, que tiene propiedad data y a su vez tiene una propiedad -> Results -> es un array.

    try {
        const vgName = await urlApi.data.results.map(el => {
            return {
                id: el.id,
                name: el.name,
                //released: el.released,
                image: el.background_image,
                platforms: el.platforms?.map(el => el.platform.name),// [{platfom{}}] => [""]
                genres: el.genres?.map(el => el.name) // [{}] => ['']
            }
        })
        return vgName;
    } catch (error) {
        console.log('Error getName', error);
    }
};

module.exports = {getNameApi};