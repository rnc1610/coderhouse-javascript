//Función para agregar un producto al carrito con prompt
function agregarProducto() {
  const productos = {
    "cajonera": 100,
    "cama": 150,
    "sofa": 200,
    "silla": 80,
    "mesa": 220,
    "carrito auxiliar": 50,
  };

  let carrito = localStorage.getItem("carrito");
  if (carrito === null) {
    carrito = [];
  } else {
    carrito = JSON.parse(carrito);
  }

  let continuar = true;

  while (continuar) {
    let opcion = prompt("Ingrese una opción:\n1. Agregar producto (ingrese el numero 1)\n2. Eliminar producto (ingrese el numero 2)\n3. Vaciar carrito (ingrese el numero 3)");
    
    if (opcion === "1") {
      let nombreProducto = prompt("Ingrese el nombre del producto:\n" + Object.keys(productos).join(", "));
      nombreProducto = nombreProducto.toLowerCase();
      let precioProducto = productos[nombreProducto];

      if (nombreProducto && precioProducto) {
        let producto = {
          nombre: nombreProducto,
          precio: precioProducto,
        };
        carrito.push(producto);
      } else {
        alert("Producto no válido");
      }
    } else if (opcion === "2") {
      let nombreProducto = prompt("Ingrese el nombre del producto a eliminar del carrito:\n" + carrito.map(producto => producto.nombre).join(", "));
      nombreProducto = nombreProducto.toLowerCase();
      
      let indiceProducto = carrito.findIndex(producto => producto.nombre === nombreProducto);
      if (indiceProducto !== -1) {
        carrito.splice(indiceProducto, 1);
        alert("Producto eliminado del carrito: " + nombreProducto);
      } else {
        alert("El producto no se encontró en el carrito");
      }
    } else if (opcion === "3") {
      carrito = [];
      alert("El carrito ha sido vaciado");
    } else {
      alert("Opción inválida");
    }

    continuar = confirm("¿Desea realizar más operaciones en el carrito?");
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));

  let mensajeCarrito = "Productos en el carrito:\n";
  let totalCarrito = 0;

  for (let i = 0; i < carrito.length; i++) {
    let producto = carrito[i];
    mensajeCarrito += "- " + producto.nombre + " - Precio: $" + producto.precio + "\n";
    totalCarrito += producto.precio;
  }

  mensajeCarrito += "Total del carrito: $" + totalCarrito;
  alert(mensajeCarrito);

  console.log(carrito);
}
//Ejemplo de uso de las funciones
agregarProducto();
console.log(calcularTotal());
alert("Su total es $" + calcularTotal());










/*Clase Arrays

const palabras = ["hola","precio","cantidad","color"];
console.log(palabras);
const autos = [{nombre: "mazda",motor: "1.6",},{nombre: "ford",motor: "2.0",}];
console.log(autos);
console.log(autos[0]); //para ver el obejto en la posicion 0 por consola
*/
