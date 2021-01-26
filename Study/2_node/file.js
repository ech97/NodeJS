const fs = require('fs').promises;

async function loadText() {
	let data = await fs.readFile('./asdf.txt')
    console.log(data.toString());
}
loadText();