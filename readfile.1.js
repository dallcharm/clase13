const fs = require('fs')
const path = require('path')

const http = require('http')
const port = 9000
const url = require('url')


const file = path.resolve(__dirname,'static/index.html')

let globalResponse = ''
let globalFile = ''

function handleExistence(err) {
    if(err){
        console.log('El archivo no existe')
    }
    else
        fs.readFile(globalFile,'utf-8',handleRead)

}

function handleRead(err,output) {
	if(err) {
        console.log('Archivo no Existe')
        
	} else {
        //console.log(output)
    	globalResponse.write(output)
    	globalResponse.end()
}
}

function responseHandler (request,response) {
    globalResponse = response
	response.writeHead(200,{'Content-Type':'text/plain'})
    const myURL = url.parse(request.url,true)
    
    if(myURL.pathname === null || myURL.pathname === '/' || myURL.pathname === '/index.html')
        globalFile = path.resolve(__dirname,'static/index.html')
    else if (myURL.pathname === '/about'){
        globalFile = path.resolve(__dirname,'about.html') 
        }
    else {
        globalFile = path.resolve(__dirname,'static/index.html')
    }
//	response.write(globalFile)
//	response.end()

fs.access(globalFile,fs.constants.F_OK,handleExistence);

}


const server = http.createServer(responseHandler)

server.listen(port)
