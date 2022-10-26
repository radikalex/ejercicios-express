const divCrear = document.getElementById('nuevo-producto');
const divVer = document.getElementById('ver-productos');
const contenedorProductos = document.getElementById('contenedor-productos')
const btnEnviar = document.getElementsByClassName('enviar')[0];
const inputNombre = document.getElementById('nombre');
const inputPrecio = document.getElementById('precio');
const alertasDiv = document.getElementById('alertas-form');

let productos = []

// Para poder hacer las request en este ejercicio hace falta tener levantado el "servidor" del ej3

function hideAllViews() {
    divCrear.classList.replace('nuevo-producto', 'hide');
    divVer.classList.replace('ver-productos', 'hide');
}

function irNuevoProducto() {
    hideAllViews();
    btnEnviar.disabled = true;
    divCrear.classList.replace('hide', 'nuevo-producto');
}

function irVerProductos() {
    hideAllViews();
    divVer.classList.replace('hide', 'ver-productos');
    obtenerProductos();
}

function mostrarProductos() {
    while(contenedorProductos.firstChild) {
        contenedorProductos.removeChild(contenedorProductos.firstChild);
    }

    for (const producto of productos) {
        contenedorProductos.innerHTML += 
        `
            <div class="card">
                <div class="card-header">${producto.nombre}</div>
                <div class="card-precio"><span class="precio">Precio: </span> <span class="precio-valor">${producto.precio}</span></div>
                <div class="card-eliminar"><button class="btn btn-primary" onclick="eliminarProducto(event, ${producto.id})">Eliminar este producto</button></div>
            </div>
        `;
    }
}

function obtenerProductos() {
    axios
        .get(`http://localhost:3000/productos`)
        .then((res) => {
            productos = res.data.items;
            mostrarProductos();
        })
        .catch((err) => console.error(err));
}

function crearProducto(e) {
    e.preventDefault();
    axios
        .post(`http://localhost:3000/productos`, {nombre: inputNombre.value, precio: parseInt(inputPrecio.value)})
        .then((res) => {
            mostrarAlertaExito();
            inputNombre.value = "";
            inputPrecio.value = "";
        })
        .catch((err) => console.error(err));
}

function vaciarDivAlertas() {
    while(alertasDiv.firstChild) {
        alertasDiv.removeChild(alertasDiv.firstChild);
    }
}

function mostrarAlertaExito() {
    vaciarDivAlertas();

    alertasDiv.innerHTML = 
    `
        <div class="alert alert-success">Usuario creado correctamente</div>
    `;

    setTimeout(vaciarDivAlertas, 2000);
}

function desactivarBoton(e) {
    vaciarDivAlertas();
    btnEnviar.disabled = inputNombre.value.trim() === "" || inputPrecio.value === "";
}

function eliminarProducto(e, id) {
    e.preventDefault();
    axios
        .delete(`http://localhost:3000/productos/id/${id}`)
        .then((res) => {
            obtenerProductos();
        })
        .catch((err) => console.error(err));
}

inputNombre.addEventListener('keyup', desactivarBoton);
inputPrecio.addEventListener('keyup', desactivarBoton);
inputPrecio.addEventListener('change', desactivarBoton);

irNuevoProducto();