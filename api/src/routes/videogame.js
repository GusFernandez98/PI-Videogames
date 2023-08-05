const { Router } = require('express');
const { videogameId } = require('../controllers/getId');
//models:
const {Videogame, Genres} = require('../db')

const router = Router();
//get por ID
router.get('/:idGame', async (req, res, next) => {
    const {idGame } = req.params; //·id llega por params.
    let data = await videogameId(idGame);

    try {
        //·Si tengo data, envio la info, caso contario un 404.
        data ? res.status(200).send(data) : res.status(404).send('El id ingresado no coincide con un videojuego');

    } catch (error) {
        next(error)
    }
});

//Ruta post
router.post('/', async (req, res, next) => {
    const {name, image, genres, released, rating, platforms, description} = req.body;
    try {
        let newGame = await Videogame.create({ //le paso al create el objeto con todos los atributos que quiero que tenga mi nuevo videojuego
            name,
            image,
            released,
            rating,
            platforms,
            description
        }) 
        const relacion = await Genres.findAll({ //en generos, buscame todos aquellos
            where: { //donde
                name: genres
            }
        })
        await newGame.addGenres(relacion) //a mi juego creado, le agrego algun genero
        res.json(newGame)
    } catch (error) {
        next(error)
    }
});

module.exports = router;