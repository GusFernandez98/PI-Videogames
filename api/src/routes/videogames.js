const { Router } = require('express');
//·Traen la info:
const { getInfoApi, getInfoDb, allInfo } = require('../controllers/index');
const { getNameApi } = require('../controllers/getNameApi');


const router = Router();

//Rutas get!
router.get('/', async(req, res, next) => {
    const {name} = req.query;      //·El nombre me llega por query.
    let allVideogames = await allInfo();

    if(name){ //·si recibo el nombre...
        try {
            const gameByApi = await getNameApi();
            const gameByDb = await getInfoDb();
            //·Filtra el nombre convertido a minuscula.
            //·incluye la cadena de texto de búsqueda convertida a minúsculas.
            const foundGamesDb = gameByDb.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            const allResults = foundGamesDb.concat(gameByApi);
            //·Si tengo algo el allResults -> va a dar un 200, enviando la info.
            //·Caso contrario -> da un 400, sin info.
            allResults.length ? res.status(200).send(allResults.slice(0,15)) : res.status(400).send('No hay videojuego con ese nombre');
        } catch (error) {
            next(error)
        }
    }
    else {
        return res.send(allVideogames); //·si no se realiza todo lo del if, envia toda la info. 
    }
});



// router.get('/platforms', async(req, res, next) => {
//     try {
//         const all = await getInfoApi();
//         const allPlatforms = []; //·arr vacio para guardar info
//         all.map(el => el.platforms.map(p => {
//             if(!allPlatforms.includes(p)){
//                 allPlatforms.push(p)
//             }
//         }))

//         allPlatforms.length ? res.status(200).json(allPlatforms) : res.status(404).send('Error')

//     } catch (error) {
//         next(error)
//     }
// });

router.get('/platforms', async (req, res, next) => {
    try {
      const all = await getInfoApi();
      const allPlatforms = [];
  
      all.forEach((el) => {
        // Verificar si el.platforms es un array antes de mapearlo
        if (Array.isArray(el.platforms)) {
          el.platforms.forEach((p) => {
            if (!allPlatforms.includes(p)) {
              allPlatforms.push(p);
            }
          });
        }
      });
  
      allPlatforms.length
        ? res.status(200).json(allPlatforms)
        : res.status(404).send('Error');
    } catch (error) {
      next(error);
    }
  });



module.exports = router;