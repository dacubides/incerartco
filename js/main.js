// PRODUCTOS
const productos = [
    // Cervezas
    {
        id: "Cerveza-rubia",
        titulo: "Cerveza rubia",
        imagen: "./img/cerveza-rubia.JPG",
        categoria: {
            nombre: "Cervezas",
            id: "cervezas"
        },
        precio: 10000
    },
    {
        id: "Cerveza-roja",
        titulo: "Cerveza Roja",
        imagen: "./img/cerveza-roja.jpg",
        categoria: {
            nombre: "Cervezas",
            id: "cervezas"
        },
        precio: 10000
    },
    {
        id: "Cerveza-negra",
        titulo: "Cerveza Negra",
        imagen: "./img/cerveza-negra.jpg",
        categoria: {
            nombre: "Cervezas",
            id: "cervezas"
        },
        precio: 10000
    },
    {
        id: "Cerveza-sanpatricio",
        titulo: "Cerveza de San Patricio",
        imagen: "./img/cerveza-sanpatricio.jpg",
        categoria: {
            nombre: "Cervezas",
            id: "cervezas"
        },
        precio: 25000
    },
    {
        id: "Cerveza-barril",
        titulo: "Barril de cerveza",
        imagen: "./img/cerveza-barril.jpg",
        categoria: {
            nombre: "Cervezas",
            id: "cervezas"
        },
        precio: 150000
    },
    // Sidras
    {
        id: "Sidra-01",
        titulo: "Sidra de manzana criolla",
        imagen: "./img/sidra01.jpg",
        categoria: {
            nombre: "Sidras",
            id: "sidras"
        },
        precio: 28000
    },
    {
        id: "Sidra-02",
        titulo: "Sidra de manzana importada",
        imagen: "./img/sidra3.webp",
        categoria: {
            nombre: "Sidras",
            id: "sidras"
        },
        precio: 25000
    },
    {
        id: "Sidra-03",
        titulo: "Sidra de canela y jengibre",
        imagen: "./img/sidra4.jpg",
        categoria: {
            nombre: "Sidras",
            id: "sidras"
        },
        precio: 35000
    },
    {
        id: "Sidra-04",
        titulo: "Sidra de frutos rojos",
        imagen: "./img/sidra5.jpg",
        categoria: {
            nombre: "Sidras",
            id: "sidras"
        },
        precio: 40000
    },
    {
        id: "sidra-05",
        titulo: "Barril de sidra",
        imagen: "./img/sidra6.webp",
        categoria: {
            nombre: "Sidras",
            id: "sidras"
        },
        precio: 200000
    },
    // Hidromiel
    {
        id: "HIdromiel-01",
        titulo: "Hidromiel tradicional",
        imagen: "./img/hidromiel1.webp",
        categoria: {
            nombre: "Hidromiel",
            id: "hidromiel"
        },
        precio: 40000
    },
    {
        id: "Hidromiel-02",
        titulo: "Hidromiel Bochet",
        imagen: "./img/hidromiel1.jpg",
        categoria: {
            nombre: "Hidromiel",
            id: "hidromiel"
        },
        precio: 50000
    },
    {
        id: "Hidromiel-03",
        titulo: "Hidromiel Capsicumel",
        imagen: "./img/hidromiel3.webp",
        categoria: {
            nombre: "Hidromiel",
            id: "hidromiel"
        },
        precio: 45000
    },
    {
        id: "Hidromiel-04",
        titulo: "Hidromiel Braggot",
        imagen: "./img/hidromiel4.jfif",
        categoria: {
            nombre: "Hidromiel",
            id: "hidromiel"
        },
        precio: 35000
    },
    {
        id: "Hidromiel-05",
        titulo: "Barril de Hidromiel",
        imagen: "./img/hidromiel5.jpg",
        categoria: {
            nombre: "Hidromiel",
            id: "hidromiel"
        },
        precio: 350000
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
