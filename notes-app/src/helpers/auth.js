//modulo helper para validar las sesiones con usuario autenticado
const helpers = {};

helpers.isAuthenticated = (req,res,next) => {
    if(req.isAuthenticated()){// si el usuario está logeado devuelve true en caso contrario false
        return next(); //si está logeado que continue con la siguiente función
    }
    // si no está logeado, lo redirige a login
    req.flash('error_msg','No Autorizado');
    res.redirect('/users/signin');
};

module.exports = helpers;