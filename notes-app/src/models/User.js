// Esta es la clase User que corresponde al modelo
const mongoose = require('mongoose'); //se requiere mongoose para crear el schema de datos
const {Schema} = mongoose;
const bcrypt = require('bcryptjs'); // se importa el módulo para cifrar las contraseñas

// se define el esquema para los usuarios, con los atributos para cada columna/variable
const UserSchema = new Schema({
    name: { type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    date: {type: Date, default: Date.now} // sea asigna un valor por default a la fecha con el atributo now
});

// se crea el método para cifrar la contraseña
UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);  //aplica el algoritmo para generar un hash 10 veces
    const hash = bcrypt.hash(password,salt); // se obtiene la contraseña cifrada
    return hash;
};

//metodo para comparar las contraseñas 
UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

//para poder usar el modelo se debe exportar el módulo
// se le pasan 2 parámetros, el nombre del modelo y el esquema
module.exports = mongoose.model('User', UserSchema);