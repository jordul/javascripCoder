const cardProductos = document.getElementById("card");
const productoCarrito = document.getElementById("productoCarrito");
const totalPagar = document.getElementById("precio");

let product,
  carroCompra = [],
  total = 0;

//llamado AJAX fetch para llamar los 6 primeros productos de la api
async function llamada() {
  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=6");
    product = await res.json();
    //collback de la funcion render despues de tener todos los productos
    render(await product);
  } catch (error) {
    console.log(error);
  }
}

//collback de la funcion llamada
llamada();
function render(a) {
  //renderiza los productos mediante el json de que se resibio de la api
  for (const elem of a) {
    cardProductos.innerHTML += `<div id="card${elem.id}">
    <article class="card">
        <figure>
            <img class="productoImg" src="${elem.image}" style="width: 100%;" alt="Hamburgesa criolla">
        </figure>
        <div class="productoContenido">
            <h2 class="productoCardTitulo">${elem.title}</h2>
            <h3 class="card__precio">$${elem.price}</h2>
            <button class="agregar__producto" id="agregar" onclick="agregar(${elem.id})">Agregar</button>
        </div>
    </article>
</div>`;
  }
  return (document.innerHTML = cardProductos);
}

//Function agregar productos al carro de compras
const agregar = (id) => {
  if (carroCompra.find((elem) => elem.id === id) === undefined) {
    const producto = product.find((elem) => elem.id === id);
    carroCompra.push({
      id: producto.id,
      image: producto.image,
      title: producto.title,
      precio: parseFloat(producto.price),
      descripcion: producto.description,
      catidad: 1,
    });
    console.log(product.find((elem) => elem.id === id).price);

    totalCompra(product.find((elem) => elem.id === id).price);
  } else {
    if (carroCompra.find((elem) => elem.id === id) != undefined) {
      const indice = carroCompra.findIndex((elem) => elem.id === id);
      carroCompra[indice] = {
        ...carroCompra[indice],
        catidad: carroCompra[indice].catidad + 1,
        precio: parseFloat(
          parseFloat(carroCompra[indice].precio) +
            parseFloat(product.find((elem) => elem.id === id).price)
        ).toFixed(2),
      };

      totalCompra(product.find((elem) => elem.id === id).price);
    }
  }
  carrito();
};

//Function eliminar productos al carro de compras
const eliminar = (id, eliminarProducto) => {
  const indice = carroCompra.findIndex((elem) => elem.id === id);
  if (carroCompra.find((elem) => elem.id === id) === undefined) {
    console.log("El producto no lo tiene en el carrito de compras");
  } else {
    if (carroCompra[indice].catidad != 0 && eliminarProducto === false) {
      console.log(
        "carro con cantidad != 0 ",
        typeof parseFloat(carroCompra[indice].precio)
      );
      carroCompra[indice] = {
        ...carroCompra[indice],
        catidad: carroCompra[indice].catidad - 1,
        precio: parseFloat(
          parseFloat(carroCompra[indice].precio) -
            parseFloat(product.find((elem) => elem.id === id).price)
        ).toFixed(2),
      };
      console.log(-product.find((elem) => elem.id === id).price);
      totalCompra(parseFloat(-product.find((elem) => elem.id === id).price));
    } else {
      if (carroCompra[indice].catidad === 0) {
        console.log("carro con cantidad = 0");
        console.log(-carroCompra[indice].precio);
        totalCompra(carroCompra[indice].precio);
        carroCompra.splice(indice);
      } else {
        if (eliminarProducto === true) {
          console.log(eliminarProducto === true, " eliminarProducto === true");
          if (carroCompra.length === 1) {
            Swal.fire({
              title: "Estas seguro?",
              text: "Eliminaras el ultimo producto!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  "Eliminado!",
                  "Ahora no tienes ningun producto en el carrito",
                  "success"
                );
                console.log("eliminar producto");
                console.log(-carroCompra[indice].precio);
                totalCompra(-carroCompra[indice].precio);
                carroCompra.splice(indice);
                carrito();
              }
            });
          } else {
            console.log("eliminar producto");
            console.log(-carroCompra[indice].precio);
            totalCompra(-carroCompra[indice].precio);
            carroCompra.splice(indice);
          }
        }
      }
    }
  }
  carrito();
  console.log(carroCompra);
};

//funcion para el total del valor a comprar
const totalCompra = (precio) => {
  console.log(
    `total:${total}, precio:${precio}. total + precio=${
      parseFloat(total) + parseFloat(precio)
    } `,
    typeof precio,
    typeof total
  );
  total = (parseFloat(total) + parseFloat(precio)).toFixed(2);
  totalPagar.innerHTML = `$${total}`;
};

//Function carrito para renderizar el carrito de compras
function carrito() {
  productoCarrito.innerHTML = "";
  for (const elem of carroCompra) {
    productoCarrito.innerHTML += `<div class="producto${elem.id}" id=${elem.id}>
      <img src="${elem.image}" alt="" style="width: 8%;">
      <h4>${elem.title}</h4>
      <div>
        <button onclick="eliminar(${elem.id},false)">-</button>
        <label for="">${elem.catidad}</label>
        <button onclick="agregar(${elem.id})">+</button>
      </div>
      <h4 id='precio'>$${elem.precio}</h4>
      <button onclick="eliminar(${elem.id}, true)"><img src="./img/basura.png" alt="" style="width: 10%;"></button>
      </div>`;
  }

  console.log(productoCarrito);
}
