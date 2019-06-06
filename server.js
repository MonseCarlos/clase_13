/*const fs = require ('fs')

fs.access ('static/index.html', fs.constants.F_OK,function(err){
    if(err){
        console.log("el archivo no existe")
    }
    else {
        console.log ('el archivo existe')
    }
})*/

//mejor solucion

const fs = require('fs')
const path = require('path')

const http = require('http')
const url = require('url')
const port = 9000

let requestGlobl = ''
let filepath = ''
function responseHandler (request,response){
    let myUrl = url.parse(request.url)
    
    requestGlobl = response

    if(myUrl.pathname === '/')
    {
        filepath = path.resolve(__dirname,'static/index.html')
    }
    else{
        filepath = path.resolve(__dirname,'static/about.html' )
    }
    
    fs.access(filepath,fs.constants.F_OK,hadler)
    
}


function hadler(err){
    if (err){
        requestGlobl.write('el archivo no existe')
    }
    else{
        fs.readFile(filepath,'utf-8',leercontenido)
    }
}

function leercontenido(err,contenido){
    if(err){
        requestGlobl.write( "Error al leer")
    }
    else {
        requestGlobl.write(contenido)
        requestGlobl.end()
        //response.write(contenido)
    }
}

//fs.access(filepath,fs.constants.F_OK,hadler)

const server = http.createServer(responseHandler)

server.listen(port)