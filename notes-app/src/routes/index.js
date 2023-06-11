const express = require('express') // se requiere el servidor para llamar a router
const router = express.Router(); // se usa el método router para crear las rutas

// enrutador que permite crear rutas del servidor
router.get('/',(req,res) => {
    res.render('index'); // como respuesta envia el render del archivo index.hbs de las vistas
});

router.get('/about', (req,res) => {
    res.render('about');
})
module.exports = router; // se exporta el módulo.