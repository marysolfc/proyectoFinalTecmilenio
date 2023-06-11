const express = require('express') // se requiere el servidor para llamar a router
const router = express.Router(); // se usa el método router para crear las rutas

// rutas para las notas
router.get('/notes',(req,res) => {
    res.send('Notes from database');
});

module.exports = router; // se exporta el módulo.