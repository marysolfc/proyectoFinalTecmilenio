// Esta es la clase Note que corresponde al modelo
const mongoose = require("mongoose"); //se requiere mongoose para crear el schema de datos
const { Schema } = mongoose;

// se define el esquema para las notas, con los atributos para cada columna/variable
const NoteSchema = new Schema({
  title: { type: String, require: true }, //titulo de la nota
  description: { type: String, require: true }, //descripción de la nota
  date: { type: Date, default: Date.now }, // sea asigna un valor por default a la fecha con el atributo now
  user_id: { type: String } //cada nota estará enlazada a un id de usuario
});

module.exports = mongoose.model("Note", NoteSchema);
