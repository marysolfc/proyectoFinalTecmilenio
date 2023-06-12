// importar el modulo qrcode
const QRCode = require("qrcode");

const QRGenerate = async (text) => {
  try {
    const qr = await QRCode.toString(text, { type: "terminal" });
    console.log(qr);
  } catch (err) {
    console.log(err);
  }
};

//QRGenerate('México');

module.exports = QRGenerate; // se exporta el módulo.