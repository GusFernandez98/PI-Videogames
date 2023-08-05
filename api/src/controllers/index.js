require('dotenv').config();
const { API_KEY } = process.env;            //EndPoint api -> https://api.rawg.io/api/games

const axios = require('axios');
const { Videogame, Genres } = require('../db');

//Solicitud a la api, para traer los videogames
// const getInfoApi = async () => {
//     const urlApi = `https://api.rawg.io/api/games?key=044d3903350545cd87ee42c2c8ed3bad`;
//     let videogames = [];

//     try {
//         for (let i = 0; i < 5; i++){    //Recorro la api con un for, ya que es un arreglo.
//             const response = await axios.get(urlApi)    //Realizo la peticion.
//             //·En data voy a encontrar la propiedad que necesito -> results -> en cual voy a mapear.
//             response.data.results.map(vg => { //a la respuesta de la api, la mapeo
//                 videogames.push({             //pusheo en el array vacio todo lo que mapeo.
//                     id: vg.id,
//                     name: vg.name,
//                     image: vg.image,
//                     rating: vg.rating,
//                     platforms: vg.platforms?.map(elem => elem.platforms.name),
//                     genres: vg.genres?.map(el => el.name),
//                 })
//             })
//             //·next -> es donde voy a entrar para pasar a la siguente pagina.
//             urlApi = req.data.next
//         }
//         return videogames;          //retorno el array con toda la info.

//     } catch (error) {
//         console.log('no llega info', error);
//     }
// };

const getInfoApi = async ()=> {
    const apiInfo = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`) // me limita hasta 40..
    const infoVideo = await apiInfo.data.results.map((e)=>{
        return {
            id: e.id,
            name: e.name,
            genres: e.genres.map(e=> e.name).join(', '),
            img: e.background_image,
            description: e.description,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms.map((e) => e.platform.name).join(', '),//le hago un mapeo a plataform por nombre y uno los elementos con el join. si no me trae demasiada info!!
            /* createdAtDb: e.createdAtDb */
        };
    });
    return infoVideo;// aca devuelvo todo lo que le solicite arriba a la api
};


//·Solicitud a la base de datos
const getInfoDb = async () => {
    try {
        const resDb = await Videogame.findAll({     //Seria -> SELECT * FROM videogame.
            include: [{
                model: Genres,
                atributes: ['name'],
                throught: { 
                    attributes: [] 
                }
            }]
        });
        return resDb;
    } catch (error) {
        console.log('no llega info de Db', error);
    }
};

//·unó la info de la api y de la base de datos.
const allInfo = async () => {
    //para unir mis dos solicitudes, guardo en una variable la ejecucion de mis funciones
    const apiInfo = await getInfoApi();
    const dbInfo = await getInfoDb();
    //ahora uno mis dos constantes contenedoras de funciones
    const info = apiInfo.concat(dbInfo)
    return info;
};

module.exports = {
    getInfoApi,
    getInfoDb,
    allInfo
};