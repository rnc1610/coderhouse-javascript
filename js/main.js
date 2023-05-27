// Obtener referencias a los botones de agregar al carrito y vaciar carrito
const agregarProductoBtns = document.querySelectorAll(".agregarProductoBtn");
const vaciarCarritoBtn = document.getElementById("vaciarCarritoBtn");

// Obtener referencia al contenedor del carrito
const carritoItems = document.getElementById("carritoItems");

// Función para obtener la fila del producto en el carrito
function obtenerFilaProducto(producto) {
  const filas = carritoItems.querySelectorAll("tr");

  for (const fila of filas) {
    const nombreProducto = fila.querySelector("td:nth-child(2)").textContent;
    if (nombreProducto === producto.nombre) {
      return fila;
    }
  }

  return null;
}

// Función para añadir un producto al carrito
function agregarProductoAlCarrito(producto) {
  const filaExistente = obtenerFilaProducto(producto);

  if (filaExistente) {
    // Si el producto ya está en el carrito, aumentar la cantidad y actualizar el subtotal
    const cantidadColumna = filaExistente.querySelector("td:nth-child(4)");
    const cantidad = parseInt(cantidadColumna.textContent);
    cantidadColumna.textContent = cantidad + 1;

    const precio = parseFloat(producto.precio);
    const subtotal = parseFloat(filaExistente.querySelector("td:nth-child(5)").textContent.replace("$", ""));
    const nuevoSubtotal = subtotal + precio;
    filaExistente.querySelector("td:nth-child(5)").textContent = "$" + nuevoSubtotal.toFixed(2);
  } else {
    // Crear fila para el producto en el carrito
    const fila = document.createElement("tr");

    // Agregar imagen en miniatura del producto
    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.classList.add("producto-imagen");
    const imagenColumna = document.createElement("td");
    imagenColumna.appendChild(imagen);
    fila.appendChild(imagenColumna);

    // Agregar nombre del producto
    const nombreColumna = document.createElement("td");
    nombreColumna.textContent = producto.nombre;
    fila.appendChild(nombreColumna);

    // Agregar precio del producto
    const precioColumna = document.createElement("td");
    precioColumna.textContent = "$" + producto.precio;
    precioColumna.classList.add("text-center");
    fila.appendChild(precioColumna);

    // Agregar cantidad del producto
    const cantidadColumna = document.createElement("td");
    cantidadColumna.textContent = "1";
    cantidadColumna.classList.add("text-center");
    fila.appendChild(cantidadColumna);

    // Agregar subtotal del producto
    const subtotalColumna = document.createElement("td");
    subtotalColumna.textContent = "$" + producto.precio;
    subtotalColumna.classList.add("text-center");
    fila.appendChild(subtotalColumna);

    // Agregar botón de eliminar
    const eliminarColumna = document.createElement("td");
    const eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.classList.add("eliminar-btn");
    eliminarBtn.addEventListener("click", () => {
      fila.remove();
      actualizarTotal();
    });
    eliminarColumna.appendChild(eliminarBtn);
    fila.appendChild(eliminarColumna);

    // Agregar fila al carrito
    carritoItems.appendChild(fila);
  }

  // Actualizar el total
  actualizarTotal();
}

// Función para actualizar el total del carrito
function actualizarTotal() {
  const subtotalColumnas = document.querySelectorAll("#carritoItems td:nth-child(5)");
  let total = 0;

  subtotalColumnas.forEach((columna) => {
    const subtotal = parseFloat(columna.textContent.replace("$", ""));
    total += subtotal;
  });

  // Actualizar el contenido del contenedor del total
  const totalContainer = document.getElementById("totalContainer");
  totalContainer.textContent = "El total de su carrito es de $" + total.toFixed(2);
}

// Agregar listeners a los botones de agregar al carrito
agregarProductoBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const productoId = btn.getAttribute("data-producto");
    const producto = obtenerProducto(productoId);
    agregarProductoAlCarrito(producto);
  });
});

// Función para obtener los detalles del producto según su ID
function obtenerProducto(id) {
  switch (id) {
    case "producto1":
      return {
        nombre: "Cajonera",
        precio: 100,
        imagen: "./assets/Fotos/producto1.avif",
      };
    case "producto2":
      return {
        nombre: "Cama",
        precio: 150,
        imagen: "./assets/Fotos/producto2.avif",
      };
    case "producto3":
      return {
        nombre: "Sofa",
        precio: 200,
        imagen: "./assets/Fotos/producto3.avif",
      };
    case "producto4":
      return {
        nombre: "Silla",
        precio: 80,
        imagen: "./assets/Fotos/producto4.avif",
      };
    case "producto5":
      return {
        nombre: "Mesa",
        precio: 220,
        imagen: "./assets/Fotos/producto5.avif",
      };
    case "producto6":
      return {
        nombre: "Carrito auxiliar",
        precio: 50,
        imagen: "./assets/Fotos/producto6.avif",
      };
    default:
      return null;
  }
}

// Vaciar el carrito al hacer clic en el botón "Vaciar carrito"
vaciarCarritoBtn.addEventListener("click", () => {
  carritoItems.innerHTML = "";
  actualizarTotal();
});