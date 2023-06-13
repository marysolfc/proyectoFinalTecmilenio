// Se importan los módulos para generar un servidor
const http = require("http");
const express = require("express");
const path = require("path");

// se crea una instancia de express para poder generar el servidor
const app = express();
app.use(express.json()); 
app.use(express.static("express")); // esta es la url por default para el sitio web
app.use("/", function (req, res) { // se define la ruta raiz del sitio web
  res.sendFile(path.join(__dirname + "/express/index.html")); // se indica la union de la ruta principal con la ruta de algúna otr app  
});

// se indican los parámetros de configuración del servidor
const server = http.createServer(app);
const port = 3000;
server.listen(port);
console.debug("Server listening on port " + port);
