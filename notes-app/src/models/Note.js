// Esta es la clase Note que corresponde al modelo

const mongoose = require('mongoose'); //se requiere mongoose para crear el schema de datos
const {Schema} = mongoose;

// se define el esquema para las notas, con los atributos para cada columna/variable
const NoteSchema = new Schema({
    title: { type: String, require: true},
    description: {type: String, require: true},
    date: {type: Date, default: Date.now} // sea asigna un valor por default a la fecha con el atributo now
});

module.exports = mongoose.model('Note', NoteSchema);