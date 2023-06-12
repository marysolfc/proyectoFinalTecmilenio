const express = require('express') // se requiere el servidor para llamar a router
const router = express.Router(); // se usa el método router para crear las rutas
const qr = require('../helpers/qrgen');
//import {renderIndex, renderAbout} from "../controllers/index.controller";
//const renderIndex = require("../controllers/index.controller");
//const renderAbout = require("../controllers/index.controller");
// enrutador que permite crear rutas del servidor
router.get('/',(req,res) => {
    res.render('index'); // como respuesta envia el render del archivo index.hbs de las vistas
});

router.get('/about', (req,res) => {
    res.render('about');
});

router.get('/qrgenerator', (req,res) => {    
    res.render('qrgenerator');
});

router.post('/qrgenerator', (req,res) => {      
    const {word} = req.body;
    qr.QRGenerate(word);  
    res.send('Ok');
    //res.redirect('/users/signin');
    //res.render('qrgenerator');
});
//router.get("/", renderIndex);
//router.get("/about", renderAbout);

module.exports = router; // se exporta el módulo.