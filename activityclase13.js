import { readFile, access, constants } from 'fs';
import { resolve } from 'path';
import { createServer } from 'http';
import { parse } from 'url';
const port = 9000

let requestGlobal = ''
let file = ''

function handleExistence(err) {
    if(err){
        requestGlobal.write('Archivo no existe')
        requestGlobal.end()
    }
    else
        requestGlobal.write(readFile(file,'utf-8',handleRead))
        requestGlobal.end()
        

}

function handleRead(err,output) {
	if(err) {
		requestGlobal.write('Archivo no existe')
        requestGlobal.end()
	} else {
        requestGlobal.write(output)
        requestGlobal.end()
}
}


function responseHandler (request,response) {
    requestGlobal = response

    response.writeHead(200,{'Content-Type':'text/plain'})
    
    const myURL = parse(request.url,true)
   
    if(myURL === null) {
        file = resolve(__dirname,'/static/index.html')
        
    }
    else if (myURL === '/'){
        file = resolve(__dirname,'/static/index.html')
     
    }
    else if (myURL === '/about'){
        file = resolve(__dirname,'about.html')
      
    }
    access(file,constants.F_OK,handleExistence);
    
    
}

const server = createServer(responseHandler)

server.listen(port)