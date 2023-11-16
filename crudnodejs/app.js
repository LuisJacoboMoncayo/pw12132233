var express = require("express");
var mysql = require("mysql");
var app = express();//Ejecutamos constructor

//Configuramos la conexion
var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'pw1213'
});

//Probar la conexion
conexion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("Conectado a la base de datos")
    }
})

app.get("/", function(req, res){
    res.send("<h1>Ruta de inicio</h1>")
});

//Verbos de solicitud del cliente
//app.get();
//app.post();
//app.put();
//app.delete();
//Mostrar todos los maestros
app.get('/api/maestros', (req, res)=>{
    conexion.query("SELECT * FROM maestros", (error, filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});

//Mostrar a un solo maestro
app.get('/api/maestros/:id', (req, res)=>{
    conexion.query("SELECT * FROM maestros WHERE clave = ? LIMIT 1", [req.params.id], (error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    });
});

//Encende el servidor
app.listen("3000", function(){
    console.log("Servidor puerto 3000");
});