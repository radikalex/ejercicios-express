const express = require("express");
const puerto = 3000;
const app = express();

const productoExiste = function (req, res, next) {
    const found = items.some(item => item.id == req.params.id)//para saber si existe lo que busco
    if(found) {
        next();
    }else{
        res.status(404).send({msg:`No se ha encontrado el producto con id ${req.params.id}`})
    }
}

const items = [{
        id: 1,
        nombre: 'Taza de Harry Potter',
        precio: 300
    },
    {
        id: 2,
        nombre: 'FIFA 22 PS5',
        precio: 1000
    },
    {
        id: 3,
        nombre: 'Figura Goku Super Saiyan',
        precio: 100
    },
    {
        id: 4,
        nombre: 'Zelda Breath of the Wild',
        precio: 200
    },
    {
        id: 5,
        nombre: 'Skin Valorant',
        precio: 120
    },
    {
        id: 6,
        nombre: 'Taza de Star Wars',
        precio: 220
    }
];

app.use(express.json());

app.get('/', (req, res) => {
    res.send({
        msg: 'Hola, bienvenido/a!'
    })
})

app.get('/productos', (req, res) => {
    res.send({
        description: 'Productos',
        items
    })
})

app.post('/productos', (req, res) => {
    if(!req.body.nombre || !req.body.precio){
        res.status(400).send({msg:"Falta alguno de los campos de producto"})
    }
    else{
        items.push({
            id: items.length + 1,
            nombre: req.body.nombre,
            precio: req.body.precio
        });
        res.status(201).send({
            msg: 'Producto creado',
            items
        });
    }
})

app.put('/productos/id/:id', productoExiste, (req, res) => {
    items.forEach(item => {
        if(item.id == req.params.id){
            item.nombre = req.body.nombre ? req.body.nombre : item.nombre,
            item.precio = req.body.precio ? req.body.precio : item.precio
            res.send(item)
        }
    });
})

app.delete('/productos/id/:id', productoExiste, (req, res) => {
    res.send({
        msg: "Producto Eliminado",
        productos: items.filter(item => item.id != req.params.id)}
    )
})

app.get('/elementoPrecio', (req, res) => {
    if(!req.query.precio)
        res.status(400).send({msg: 'No se ha rellenado correctamente el parametro precio de la query'})
    else {
        const item = items.filter(item => item.precio == req.query.precio);
        if(item.length > 0) {
            res.send({
                msg: `Estos son los productos con precio ${req.query.precio}`,
                productos: item
            })
        }
        else
            res.status(404).send({msg: 'No se ha encontrado ningun producto con ese precio'})
    }
})

app.get('/elementoRangoPrecio', (req, res) => {
    if(!req.query.precioMin || !req.query.precioMax)
        res.status(400).send({msg: 'No se ha rellenado correctamente algun parametro de la query'})
    else {
        const item = items.filter(item => item.precio >= req.query.precioMin && item.precio <= req.query.precioMax);
        if(item.length > 0) {
            res.send({
                msg: `Estos son los productos en el rango Min=${req.query.precioMin} y Max=${req.query.precioMax}`,
                productos: item
            })
        }
        else
            res.status(404).send({msg: 'No se ha encontrado ningun producto con ese rango de precio'})
    }
})

app.get('/productos/id/:id', productoExiste, (req, res) => {
    res.send({
        msg: "Producto/s encontrado/s por id",
        members: items.filter(item => item.id == req.params.id)}
    )
})

app.get('/productos/nombre/:nombre', (req, res) => {
    const productosNombre = items.filter(item => item.nombre == req.params.nombre);
    if(productosNombre.length > 0) {
        res.send({
            msg: "Producto/s encontrado/s por nombre",
            members: productosNombre
        })
    } else {
        res.send({
            msg: "No se ha encontrado ningun producto con ese nombre"
        })
    }
})

app.listen(puerto, () => {
    console.log(`Servidor levantado en el puerto ${puerto}`);
});