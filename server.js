const fs = require('fs')

fs.access('server.js',fs.constants.F_OK,function(err) {
	if(err) {
		console.log('Archivo no Existe')
	} else {
		console.log('Archivo Existe')
}
}
)
