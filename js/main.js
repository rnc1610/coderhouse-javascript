// Función para agregar un producto al carrito
function agregarProducto(nombreProducto, precioProducto) {
    let carrito = localStorage.getItem("carrito");
    if (carrito === null) {
      carrito = [];
    } else {
      carrito = JSON.parse(carrito);
    }
    let producto = {
      nombre: nombreProducto,
      precio: precioProducto
    };
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito"+producto);
  }
  
  // Función para calcular el total de la compra
  function calcularTotal() {
    let carrito = localStorage.getItem("carrito");
    if (carrito !== null) {
      carrito = JSON.parse(carrito);
      let total = 0;
      for (let i = 0; i < carrito.length; i++) {
        total += carrito[i].precio;
      }
      return total;
    } else {
      return 0;
    }
  }
  
  // Ejemplo de uso de las funciones
  agregarProducto("Producto 1", 10);
  agregarProducto("Producto 2", 15);
  console.log(calcularTotal());