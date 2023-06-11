// llamada a modulos
const express = require('express'); //para el servidor
const path = require('path'); // para las rutas
const exphbs = require('express-handlebars'); //para el motor de plantillas
const methodOverride = require('method-override'); //para el envio del formulario no solo con get y post, también con put y delete
const session = require('express-session'); // para el manejo de sesiones del usuario


// inicializaciones
const app = express();
require('./database');

//sección de configuración 
app.set('port', process.env.PORT || 3000);
// se configura la carpeta views con join , dirname regresa el directorio actual src
app.set('views',path.join(__dirname,'views'));

// se configura el motor de plantillas con handlebars y se agregan las propiedades para las vistas
// ==> Aquí había un problema, TypeError: exphbs is not a function, solució, agregar engine
app.engine('.hbs',exphbs.engine({
    defaultLayout: 'main', //esta es la plantilla principal
    layoutsDir: path.join(app.get('views'),'layouts'), //indica la ruta a la carpeta views/layouts
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs' //indica con qué extensión terminan los archivos
}));


app.set('view engine', '.hbs');// configura el motor de las vistas

// sección middlewares
// se configuran cosas útiles del servidor
app.use(express.urlencoded({extended: false})); // para permitir el envio de datos del usuario
app.use(methodOverride('_method')); // sirve para que los formularios puedan enviar otro tipo de metodos y no solo get y post
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true 
}));


// seccion de variables globales

//sección de rutas, para las url en la carpeta routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//seccion de archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

//server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});