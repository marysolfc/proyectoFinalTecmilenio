const nodemailer = require('nodemailer');

async function main(){
let transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8cd8cbf5598145",
      pass: "208bd8dd5d6ac8"
    }
  });

  message = {
    from: "deejemplo@email.com",
    to: "pareejemplo@email.com",
    subject: "Correo SMTP de prueba sin promesas",
    text: "Probando envío de correo con NodeJS nodemailer y mailtrap"
  }
  message2 = {
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body

  }
  message3 = {
    from: '"Marisol Flores" <no_reply@example.com>', // sender address
    to: "Tecmilenio <baz@example.com>", // list of receivers
    subject: "Avance de proyecto Semana 1 ✔", // Subject line    
    html: `<h2>Avance del proyecto semana1 </h2>
    <p>Se envía mensaje por medio del modulo Nodemailer de NodeJs para efectos de ofrecer el servicio de envío y recepción de correos electrónicos automatizados</p>
    `, // html body
  }

let info = await transporter.sendMail(message3);
console.log("Mensaje enviado: %s",info.messageId);

}
main().catch(console.error);
