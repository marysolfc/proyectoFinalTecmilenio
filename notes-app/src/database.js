const mongoose = require('mongoose');
// conexión a la base de datos en localhost con mongodb

mongoose.connect('mongodb://127.0.0.1/notes-db-app')
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));
