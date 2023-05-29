document.addEventListener('DOMContentLoaded', function() {
  const agregarProductoBtns = document.querySelectorAll('.agregarProductoBtn');
  const carritoItems = document.getElementById('carrito-items');
  const carritoTotal = document.getElementById('carrito-total');
  const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

  let carrito = [];
  agregarProductoBtns.forEach(function(btn) {
    btn.addEventListener('click', agregarProductoAlCarrito);
  });
  vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

  // Agregar un producto al carrito
  function agregarProductoAlCarrito(event) {
    const producto = event.target.dataset.producto;
    const existeEnCarrito = carrito.find(item => item.producto === producto);

    if (existeEnCarrito) {
      existeEnCarrito.cantidad++;
    } else {
      carrito.push({
        producto: producto,
        cantidad: 1
      });
    }
    mostrarCarrito();
  }
  // Vaciar el carrito
  function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
  }
  // Mostrar el carrito en la tabla
  function mostrarCarrito() {
    carritoItems.innerHTML = '';
    carrito.forEach(function(item) {
      const fila = document.createElement('tr');
      const columnaImagen = document.createElement('td');
      const imagen = document.createElement('img');
      imagen.src = `assets/Fotos/${item.producto}.avif`;
      imagen.alt = item.producto;
      imagen.classList.add('imgprod');
      columnaImagen.appendChild(imagen);
      fila.appendChild(columnaImagen);

      const columnaProducto = document.createElement('td');
      columnaProducto.textContent = obtenerNombreProducto(item.producto);
      fila.appendChild(columnaProducto);
      const columnaPrecio = document.createElement('td');
      columnaPrecio.textContent = obtenerPrecio(item.producto);
      fila.appendChild(columnaPrecio);

      const columnaCantidad = document.createElement('td');
      const cantidad = document.createElement('span');
      cantidad.textContent = item.cantidad;
      columnaCantidad.appendChild(cantidad);
      const botonEliminar = document.createElement('button');
      botonEliminar.textContent = 'Eliminar producto';
      botonEliminar.addEventListener('click', function() {
        restarProducto(item.producto);
      });
      columnaCantidad.appendChild(botonEliminar);
      fila.appendChild(columnaCantidad);
      
      const columnaSubtotal = document.createElement('td');
      columnaSubtotal.textContent = obtenerSubtotal(item.producto, item.cantidad);
      fila.appendChild(columnaSubtotal);

      // Agregar la fila a la tabla
      carritoItems.appendChild(fila);
    });

    // Actualizar el total del carrito
    carritoTotal.textContent = calcularTotal();
  }

  // Restar un producto del carrito
  function restarProducto(producto) {
    const productoIndex = carrito.findIndex(item => item.producto === producto);

    if (productoIndex !== -1) {
      const cantidad = carrito[productoIndex].cantidad;

      if (cantidad > 1) {
        carrito[productoIndex].cantidad--;
      } else {
        carrito.splice(productoIndex, 1);
      }

      mostrarCarrito();
    }
  }

  // Nombre de un producto
  function obtenerNombreProducto(producto) {
    switch (producto) {
      case 'producto1':
        return 'Cajonera';
      case 'producto2':
        return 'Cama';
      case 'producto3':
        return 'Sofá';
      case 'producto4':
        return 'Silla';
      case 'producto5':
        return 'Mesa';
      case 'producto6':
        return 'Carrito Auxiliar';
      default:
        return 'Producto desconocido';
    }
  }

  // Precio de un producto
  function obtenerPrecio(producto) {
    switch (producto) {
      case 'producto1':
        return '$100';
      case 'producto2':
        return '$150';
      case 'producto3':
        return '$200';
      case 'producto4':
        return '$80';
      case 'producto5':
        return '$120';
      case 'producto6':
        return '$250';
      default:
        return 'Precio no disponible';
    }
  }

  // Calcular el subtotal del producto en el carrito
  function obtenerSubtotal(producto, cantidad) {
    const precio = obtenerPrecio(producto);
    if (precio !== 'Precio no disponible') {
      const precioNum = Number(precio.substring(1));
      const subtotal = precioNum * cantidad;
      return `$${subtotal}`;
    }
    return 'Subtotal no disponible';
  }

  // Calcular el total del carrito
  function calcularTotal() {
    let total = 0;
    carrito.forEach(function(item) {
      const precio = obtenerPrecio(item.producto);
      if (precio !== 'Precio no disponible') {
        const precioNum = Number(precio.substring(1));
        total += precioNum * item.cantidad;
      }
    });
    return `$${total}`;
  }
});