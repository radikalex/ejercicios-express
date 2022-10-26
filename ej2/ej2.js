const express = require("express");
const puerto = 3000;
const app = express();

app.get('/',(req,res)=>{
    res.send({msg: 'Hola, bienvenido/a!'})
})

app.get('/productos',(req,res)=>{
    res.send({msg: 'Listado de productos'})
})

app.post('/productos',(req,res)=>{
    res.send({msg: 'Crear un producto'})
})

app.put('/productos',(req,res)=>{
    res.send({msg: 'Actualizar un producto'})
})

app.delete('/productos',(req,res)=>{
    res.send({msg: 'Eliminar un producto'})
})

app.get('/usuarios',(req,res)=>{
    res.send({msg: 'Listado de usuarios'})
})

app.post('/usuarios',(req,res)=>{
    res.send({msg: 'Crear un usuario'})
})

app.put('/usuarios',(req,res)=>{
    res.send({msg: 'Actualizar un usuario'})
})

app.delete('/usuarios',(req,res)=>{
    res.send({msg: 'Borrar un usuario'})
})

// En la carpeta ej2 hay un archivo json de postman donde está el json que representa una colección de postman
// donde se han ido guardando las distintas requests para las pruebas

app.listen(puerto, () => {
  console.log(`Servidor levantado en el puerto ${puerto}`);
});