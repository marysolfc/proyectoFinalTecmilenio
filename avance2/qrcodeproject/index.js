// importar el modulo qrcode
const QRCode = require('qrcode')

const QRGenerate = async text => {
try{
const qr = await QRCode.toString(text,{type: 'terminal'});
console.log(qr);
} catch(err){
console.log(err)
}
};

QRGenerate('México');
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