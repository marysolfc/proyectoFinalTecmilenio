// importar el modulo qrcode
const QRCode = require("qrcode");

//Se define la función asíncrona para generar el código QR con el parámetro text
const QRGenerate = async (text) => {
  try {
    // se genera el código y se muestra en terminal con la función toString
    const qr = await QRCode.toString(text, { type: "terminal" });
    console.log(qr);
  } catch (err) {
    console.log(err);
  }
};

QRGenerate("México");

/*
var qrcode = new QRCode("qrcode");

function makeCode () {    
  var elText = document.getElementById("text");
  
  if (!elText.value) {
    alert("Input a text");
    elText.focus();
    return;
  }
  
  qrcode.makeCode(elText.value);
}

makeCode();

$("#text").
  on("blur", function () {
    makeCode();
  }).
  on("keydown", function (e) {
    if (e.keyCode == 13) {
      makeCode();
    }
  });
  */
