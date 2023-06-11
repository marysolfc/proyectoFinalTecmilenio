const express = require("express"); // se requiere el servidor para llamar a router
const router = express.Router(); // se usa el método router para crear las rutas

const Note = require("../models/Note"); //se importa el modelo de las notas
const { isAuthenticated } = require("../helpers/auth"); // para asegurar que el usuario está autenticado

// rutas para el listado de las notas
router.get("/notes", isAuthenticated, async (req, res) => {
  //cuando se hace una consulta a los documentos con find(), por default son regresados como documentos de mongoose
  // con el método lean() los documentos se regresan como objetos planos
  const notes = await Note.find({ user: req.user.id })
    .lean()
    .sort({ date: "desc" }); // trae todos los documentos de la colección Notes, se agrega lean() porque había un error al mostrarlo en la vista
  res.render("notes/all-notes", { notes }); //renderiza la vista all-notes y le pasa el objeto con los datos encontrados en la BD
});

//ruta para agregar una nueva nota, se permite sólo si el usuario está logeado con isAuthenticated
router.get("/notes/add", isAuthenticated, (req, res) => {
  res.render("notes/new-note");
});

// ruta para enviar datos con el formulario
// se usa async para decir que habrán procesos asíncronos cuando se guarden los datos con save
router.post("/notes/new-note", isAuthenticated, async (req, res) => {
  //se usa destructuring para obtener los atributos del body
  const { title, description } = req.body; // se obtienen los atributos del formulario a partir del body
  //se crea un arreglo para mensajes de error
  const errors = [];
  //validar campos
  if (!title) {
    errors.push({ text: "Please write a title" });
  }
  if (!description) {
    errors.push({ text: "Please write a description" });
  }
  if (errors.length > 0) {
    //si existen errores, se los pasa a la vista junto los los datos obtenidos del formulario title y description
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  } else {
    const newNote = new Note({ title, description }); // se instancia un objeto de la clase Note
    newNote.user = req.user.id; // obtener el id del usuario y guardarlo en la nota
    console.log(newNote.user);

    // se guardan los datos en la base de Mongo con el metodo save de mongoose, toma algún tiempo y no se sabe cuanto
    // por lo que se realiza una petición asíncrona agregando await

    //await newNote.save(); //esto toma algún tiempo de ejecución pero no bloquea el servidor

    // cuando termine la función asincrona, se envia el mensaje de exito
    req.flash("success_msg", "Note added successfully");
    //y se redirige a la ruta deseada
    res.redirect("/notes");
  }
});

// ruta para editar una nota recibiendo el id
router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id).lean(); // se usa findById para consultar por id es como indicar el where id = ? en mysql
  res.render("notes/edit-note", { note });
});

//ruta para actualizar la nota dado el id
router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description }); // se usa findByIdAndUpdate para actualizar el dato por el id
  req.flash("success_msg", "Note updated successfully");
  res.redirect("/notes");
});

//ruta para borrar una nota dado el id
router.delete("/notes/delete/:id", isAuthenticated, async (req, res) => {
  // se define la ruta
  await Note.findByIdAndDelete(req.params.id); // se usa fidnByIdAndDelete para encontrar y borrar la nota por id
  req.flash("success_msg", "Note deleted successfully"); // se envia un mensaje al usuario
  res.redirect("/notes"); //se redirige a la página principal de notas
});

module.exports = router; // se exporta el módulo.
