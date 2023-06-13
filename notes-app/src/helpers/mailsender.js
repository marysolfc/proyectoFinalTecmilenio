const nodemailer = require('nodemailer');

async function sendMail(nombre,email){
let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8cd8cbf5598145",
      pass: "208bd8dd5d6ac8"
    }
  });

    message = {
    from: '"Marisol Flores" <no_reply@example.com>', // sender address
    to: `${nombre} <${email}>`, // list of receivers
    subject: "Registro exitoso! ✔", // Subject line    
    html: `<h2>Estimado ${nombre}<br>Se ha registrado satisfactoriamente a la App de notas </h2>
    <p>Se envía mensaje por medio del modulo Nodemailer de NodeJs para efectos de ofrecer el servicio de envío y recepción de correos electrónicos automatizados</p>
    `, // html body
  }

let info = await transporter.sendMail(message);
console.log("Mensaje enviado: %s",info.messageId);
}

module.exports = sendMail; // se exporta el módulo.
