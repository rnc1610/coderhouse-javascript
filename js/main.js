document.addEventListener("DOMContentLoaded", function() {
  const productos = {
    "cajonera": 100,
    "cama": 150,
    "sofa": 200,
    "silla": 80,
    "mesa": 220,
    "carrito auxiliar": 50,
  };

  function mostrarCarritoEnHTML(carrito) {
    const carritoItems = document.getElementById("carritoItems");
    carritoItems.innerHTML = ""; // Limpiar el contenido anterior

    const subtotales = {}; // Objeto para almacenar los subtotales por tipo de producto
    let totalCarrito = 0; // Variable para calcular el total en valor ($)

    for (let i = 0; i < carrito.length; i++) {
      const producto = carrito[i];

      const li = document.createElement("li");
      li.textContent = producto.nombre + " - Precio: $" + producto.precio + " - Cantidad: " + producto.cantidad;

      const eliminarBtn = document.createElement("button");
      eliminarBtn.textContent = "Eliminar";
      eliminarBtn.classList.add("eliminarBtn");
      eliminarBtn.addEventListener("click", function() {
        eliminarProducto(producto.nombre);
      });

      const cantidadInput = document.createElement("input");
      cantidadInput.type = "number";
      cantidadInput.min = 1;
      cantidadInput.value = producto.cantidad;
      cantidadInput.addEventListener("change", function() {
        cambiarCantidad(producto.nombre, parseInt(cantidadInput.value));
      });

      li.appendChild(eliminarBtn);
      li.appendChild(cantidadInput);
      carritoItems.appendChild(li);

      // Calcular subtotales
      if (!subtotales[producto.nombre]) {
        subtotales[producto.nombre] = 0;
      }
      subtotales[producto.nombre] += producto.precio * producto.cantidad;

      // Calcular totalCarrito
      totalCarrito += producto.precio * producto.cantidad;
    }

    // Mostrar subtotales
    const subtotalContainer = document.getElementById("subtotalContainer");
    subtotalContainer.innerHTML = ""; // Limpiar el contenido anterior

    for (const nombreProducto in subtotales) {
      const subtotalLi = document.createElement("li");
      subtotalLi.textContent = nombreProducto + " - Subtotal: $" + subtotales[nombreProducto];
      subtotalContainer.appendChild(subtotalLi);
    }

    // Mostrar totalCarrito
    const totalCarritoElement = document.getElementById("totalCarrito");
    totalCarritoElement.textContent = "Total del carrito: $" + totalCarrito;
  }

  function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarritoEnHTML([]);
  }

  function agregarProductoAlCarrito(nombreProducto) {
    let carrito = localStorage.getItem("carrito");
    if (carrito === null) {
      carrito = [];
    } else {
      carrito = JSON.parse(carrito);
    }

    const precioProducto = productos[nombreProducto];

    if (nombreProducto && precioProducto) {
      const productoExistente = carrito.find(producto => producto.nombre === nombreProducto);

      if (productoExistente) {
        productoExistente.cantidad++;
      } else {
        const nuevoProducto = {
          nombre: nombreProducto,
          precio: precioProducto,
          cantidad: 1,
        };
        carrito.push(nuevoProducto);
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarritoEnHTML(carrito);
    } else {
      alert("Producto no válido");
    }
  }

  function eliminarProducto(nombreProducto) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const indiceProducto = carrito.findIndex(producto => producto.nombre === nombreProducto);

    if (indiceProducto !== -1) {
      carrito.splice(indiceProducto, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarritoEnHTML(carrito);
    } else {
      alert("El producto no se encontró en el carrito");
    }
  }

  function cambiarCantidad(nombreProducto, cantidad) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const productoExistente = carrito.find(producto => producto.nombre === nombreProducto);

    if (productoExistente) {
      productoExistente.cantidad = cantidad;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      mostrarCarritoEnHTML(carrito);
    }
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  mostrarCarritoEnHTML(carrito);

  // Agregar producto al carrito al hacer clic en el botón correspondiente
  document.getElementById("agregarProductoBtn1").addEventListener("click", function() {
    agregarProductoAlCarrito("cajonera");
  });

  document.getElementById("agregarProductoBtn2").addEventListener("click", function() {
    agregarProductoAlCarrito("cama");
  });

  document.getElementById("agregarProductoBtn3").addEventListener("click", function() {
    agregarProductoAlCarrito("sofa");
  });

  document.getElementById("agregarProductoBtn4").addEventListener("click", function() {
    agregarProductoAlCarrito("silla");
  });

  document.getElementById("agregarProductoBtn5").addEventListener("click", function() {
    agregarProductoAlCarrito("mesa");
  });

  document.getElementById("agregarProductoBtn6").addEventListener("click", function() {
    agregarProductoAlCarrito("carrito auxiliar");
  });

  // Vaciar carrito al hacer clic en el botón correspondiente
  document.getElementById("vaciarCarritoBtn").addEventListener("click", vaciarCarrito);
});