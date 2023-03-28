const cardProductos = document.getElementById("card");
let product,
  carroCompra = [],
  total = 0;

async function llamada() {
  try {
    const res = await fetch("https://fakestoreapi.com/products?limit=6");
    product = await res.json();
    render(await product);
  } catch (error) {
    console.log(error);
  }
}

llamada();
function render(a) {
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
            <button class="eliminar__producto" id="eliminar" onclick="eliminar(${elem.id})">Eliminar</button>
        </div>
    </article>
</div>`;
  }
  return (document.innerHTML = cardProductos);
}

const agregar = (id) => {
  if (carroCompra.find((elem) => elem.id === id) === undefined) {
    console.log(
      carroCompra.find((elem) => elem.id === id),
      " 1 filtro"
    );
    const producto = product.find((elem) => elem.id === id);
    carroCompra.push({
      id: producto.id,
      title: producto.title,
      precio: producto.price,
      descripcion: producto.description,
      catidad: 1,
    });
    totalCompra(product.find((elem) => elem.id === id).price);
  } else {
    if (carroCompra.find((elem) => elem.id === id) != undefined) {
      console.log(
        carroCompra.find((elem) => elem.id === id),
        " 2 filtro"
      );
      const indice = carroCompra.findIndex((elem) => elem.id === id);
      carroCompra[indice] = {
        ...carroCompra[indice],
        catidad: carroCompra[indice].catidad + 1,
      };
      totalCompra(product.find((elem) => elem.id === id).price);
      total;
    }
  }
  console.log(carroCompra);
};

const eliminar = (id) => {
  const indice = carroCompra.findIndex((elem) => elem.id === id);
  if (carroCompra.find((elem) => elem.id === id) === undefined) {
    console.log("El producto no lo tienes en el carrito de compras");
  } else {
    if (carroCompra[indice].catidad != 0) {
      carroCompra[indice] = {
        ...carroCompra[indice],
        catidad: carroCompra[indice].catidad - 1,
      };
      totalCompra(-carroCompra[indice].precio);
      if (carroCompra[indice].catidad === 0) {
        carroCompra.splice(indice);
      }
    }
  }

  console.log(carroCompra);
};

const totalCompra = (precio) => {
  total = total + precio;
  console.log(total);
};
