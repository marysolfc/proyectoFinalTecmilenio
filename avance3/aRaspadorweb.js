// en avance 3
// 1. Iniciar el proyecto con el comando: npm init -y
// npm install --save puppetter jsdom

const puppeteer = require('puppeteer');
const jsdom = require('jsdom');

(async () => {
	try{
	// se abre una instancia del puppeteer y accede a la url de google
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const response = await page.goto('https://www.google.com/search?q=web+scraping+libros');
	const body = await response.text();
	
	//se crea una instancia del resultado devuelto por puppeter para parsearlo con jsdom
	const { window: {document} } = new jsdom.JSDOM(body);
	
	// se seleccionan los títulos y se muestran en consola
	document.querySelectorAll('.g h3').forEach(element => console.log(element.textContent));
	
	// se cierra el puppeteer
	await browser.close();
	} catch(error){
		console.error(error);
	}
})();

//correr con node aRaspadorweb.js

