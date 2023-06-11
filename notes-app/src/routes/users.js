const express = require('express') // se requiere el servidor para llamar a router
const router = express.Router(); // se usa el método router para crear las rutas

// rutas del usuario
router.get('/users/signin',(req,res) => {
    res.render('users/signin');
});

router.get('/users/signup',(req,res) => {
    res.render('users/signup');
});

module.exports = router; // se exporta el módulo.