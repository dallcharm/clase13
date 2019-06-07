const fs = require('fs')
const path = require('path')

const file = path.resolve(__dirname,'static/index.html')

function handleExistence(err) {
    if(err){
        console.log('El archivo no existe')
    }
    else
        fs.readFile(file,'utf-8',handleRead)

}

function handleRead(err,output) {
	if(err) {
		console.log('Archivo no Existe')
	} else {
		console.log(output)
}
}

fs.access('server.js',fs.constants.F_OK,handleExistence);
