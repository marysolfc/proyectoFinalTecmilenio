const express = require('express') // se requiere el servidor para llamar a router
const router = express.Router(); // se usa el método router para crear las rutas

const User = require('../models/User'); // se importa el modelo de datos
const passport = require('passport'); // importa los metodos de autenticacion

const sendMail = require('../helpers/mailsender')

// rutas del usuario
// ruta para el login del usuario
router.get('/users/signin',(req,res) => {
    res.render('users/signin'); //renderiza la vista del formulario para login
});

//ruta para la autenticación con el modulo de passport local
router.post('/users/signin',passport.authenticate('local',{
    successRedirect: '/notes', //si la autenticación fue correcta lo manda a notas
    failureRedirect: '/users/signin',// si hay error, lo manda a autenticarse al login
    failureFlash: true //si hubo error manda true   
}));

//ruta para mostrar formulario del registro del usuario
router.get('/users/signup',(req,res) => {
    res.render('users/signup'); //renderiza la vista para el formulario del signup
});

// ruta para recibir los datos del usuario, esta se le pasa al formulario en signup.hbs
router.post('/users/signup',async (req,res) => {
    const {name,email,password,confirm_password} = req.body;
    const errors = []; // arreglo para los errores
    // validaciones para los valores que vienen del formulario
    if(name.length <= 0){
        errors.push({text: 'Por favor inserta un nombre'});
    }
    if(password != confirm_password){
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(password.length < 4){
        errors.push({text: 'El password debe ser al menos de 4 caracteres'});
    }
    if(errors.length>0){
        res.render('users/signup',{errors,name,email,password,confirm_password});
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg','El email ya está registrado');
            res.redirect('/users/signup');
        }
        const newUser = new User({name,email,password}); // se crea la instancia de un objeto usuario
        newUser.password = await newUser.encryptPassword(password); // se cifra la contraseña antes de guardar los datos
        await newUser.save(); // se guardan los datos del usuario
        sendMail(name,email);
        req.flash('success_msg',`Gracias por registrarse, se ha envíado un correo de confirmación a ${email}`);
        res.redirect('/users/signin'); //ya que se registró se redirige a la pantalla de login
    }
});

/*
// este código marca error porque necesita un callback
router.get('/users/logout',(req,res) => {
    req.logout();
    res.redirect('/');
});
*/
router.get('/users/logout', (req, res) => {
    req.logout((err) => {
      if (err) {
        console.error(err); //enviar un mensaje al usuario
        return res.redirect('/');
      }
      res.redirect('/');
    });
  });

  
module.exports = router; // se exporta el módulo.