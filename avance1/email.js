const nodemailer = require('nodemailer');

// crear un objeto transportador a través del método "createTransport" 
let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8cd8cbf5598145",
      pass: "208bd8dd5d6ac8"
    }
  });

  // se define el mensaje y los datos del destinatario y emisor
  message = {
    from: '"Marisol Flores" <no_reply@example.com>', // dirección de envío
    to: "Tecmilenio <tecmilenio@example.com>", // dirección de recepción
    subject: "Avance de proyecto Semana 1 ✔", // titulo del correo    
    html: `<h2>Avance del proyecto semana1 </h2>
    <p>Se envía mensaje por medio del modulo Nodemailer de NodeJs para efectos de ofrecer el servicio de envío y recepción de correos electrónicos automatizados</p>
    `, // cuerpo del correo en html
  }
  
  // con el objeto transportador se envía el correo usando el método sendMail
  transporter.sendMail(message,function(err,info){
    if(err){
        console.log(err)
    }
    else{
        console.log(info);
    }
    transporter.close();
  });




  message = {
    from: "deejemplo@email.com",
    to: "pareejemplo@email.com",
    subject: "Correo SMTP de prueba sin promesas",
    text: "Probando envío de correo con NodeJS nodemailer y mailtrap"
  }
  message2 = {
    from: '"Fred Foo 👻" <foo@example.com>', // dirección de envio
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body

  }
  
