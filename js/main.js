// Función para agregar un producto al carrito con prompt
  function agregarProducto() {
    let carrito = localStorage.getItem("carrito");
    if (carrito === null) {
        carrito = [];
    } else {
        carrito = JSON.parse(carrito);
    }

    let continuar = true;

    while (continuar) {
        let nombreProducto = prompt("Ingrese el nombre del producto que desea agregar:");
        let precioProducto = parseFloat(prompt("Ingrese el precio del producto:"));

        let producto = {
            nombre: nombreProducto,
            precio: precioProducto,
        };
        carrito.push(producto);

        continuar = confirm("¿Desea agregar más productos al carrito?");
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    console.log(carrito);
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
  
  //Ejemplo de uso de las funciones
  agregarProducto();
  console.log(calcularTotal());
  alert("Su total es " + calcularTotal());


  /*Funcion sin prompt 
    function agregarProducto(nombreProducto, precioProducto) {
    let carrito = localStorage.getItem("carrito");
    if (carrito === null) {
      carrito = [];
    } else {
      carrito = JSON.parse(carrito);
    }
    let producto = {
      nombre: nombreProducto,
      precio: precioProducto,
    };
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Se ha agregado al carrito el producto"+" "+ nombreProducto +" por un valor de $"+ precioProducto);
    console.log("Se ha agregado al carrito el producto"+" "+ nombreProducto +" por un valor de $"+ precioProducto);
  }
*/