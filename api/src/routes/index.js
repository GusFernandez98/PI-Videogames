const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRoute = require("./videogames")
const genresRoute = require('./genres')
const gameRoute = require('./videogame')
//const filtradosByRoute = require('./filtrados.js')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames', videogamesRoute);  //get
router.use('/genres', genresRoute)
router.use('/videogame', gameRoute)         //get por id y post
//router.use('/filtrados', filtradosByRoute)


module.exports = router;
