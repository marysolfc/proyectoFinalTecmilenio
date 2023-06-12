// módulo para autenticar al usuario, se hace de manera local pero se podría con google, etc
//import passport from "passport";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

// se usa la estrategia de autenticacion buscando el email y comprobando el password
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async (email, password, done) => {
      const user = await User.findOne({ email: email }); // busca al usuario
      if (!user) {
        // si no lo encuentra, le manda 3 parámetros en el callback done,
        // el primer dato es para el error, quiere decir que si es nulo no encotró error
        //  el segundo es false significa que no hay ningún usuario y el tercer parámetro es el mensaje que se le envía
        return done(null, false, { message: "Usuario no encontrado" });
      } else {
        // si si existe el usuario se comprueba la contraseña
        const match = await user.matchPassword(password);
        if (match) {
          // si coinciden las contraseñas, regresa, null porque no encontró error y el user que sí encontró
          return done(null, user);
        } else {
          return done(null, false, { message: "Password incorrecto" });
        }
      }
    }
  )
);

// se crea una session para el usuario autenticado, serializando por id
passport.serializeUser((user, done) => {
  done(null, user.id); //cuando el usuario se autentica se almacena en una sesión el id del usuario
});

// proceso inverso, toma un id para buscar en la sesion al usuario y desearizarlo para tomar sus datos
/*
// este código manda error por la nueva versión de mongoose que ya no acepta callback en findById()
passport.deserializeUser((id) => {
     User.findById(id,(err,user)=>{ //si encuentra el usuario
        done(err,user); // lo devuelve con la función callback done 

    });
});
*/
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).lean(); // se usa lean() porque marcaba error Handlebars: Access has been denied to resolve the property "name" because it is not an "own property" of its parent.
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
