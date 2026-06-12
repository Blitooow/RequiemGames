/* =====================================================================
   RequiemGames - script.js
   Lógica principal de la aplicación e-commerce.
   Basado en un Registro "Juego" representado como objeto JS,
   almacenado dentro de un arreglo (catálogo).
   ===================================================================== */

/* =====================================================================
   1. REGISTRO PRINCIPAL: ARREGLO DE OBJETOS "JUEGO"
   ---------------------------------------------------------------------
   Cada elemento del arreglo representa un registro con los campos:
   codigoJuego (Entero), nombre (Cadena), plataforma (Cadena),
   tipo (Cadena: "Físico" o "Digital"), genero (Cadena),
   precio (Real), stock (Entero), imagen (Cadena - URL),
   destacado (Booleano - usado para la sección de destacados)
   ===================================================================== */
const catalogoJuegos = [
  {
    codigoJuego: 1,
    nombre: "Resident Evil Requiem",
    plataforma: "Steam",
    tipo: "Digital",
    genero: "Survival Horror",
    precio: 69999,
    stock: 15,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co9p0t.jpg",
    destacado: true
  },
  {
    codigoJuego: 2,
    nombre: "Cyberpunk 2077",
    plataforma: "PC",
    tipo: "Digital",
    genero: "RPG / Acción",
    precio: 45999,
    stock: 30,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r7f.jpg",
    destacado: true
  },
  {
    codigoJuego: 3,
    nombre: "Elden Ring",
    plataforma: "PlayStation 5",
    tipo: "Físico",
    genero: "RPG / Souls-like",
    precio: 59999,
    stock: 12,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg",
    destacado: true
  },
  {
    codigoJuego: 4,
    nombre: "Black Myth: Wukong",
    plataforma: "PC",
    tipo: "Digital",
    genero: "Acción / RPG",
    precio: 52999,
    stock: 20,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6x94.jpg",
    destacado: true
  },
  {
    codigoJuego: 5,
    nombre: "Red Dead Redemption 2",
    plataforma: "Xbox Series X",
    tipo: "Físico",
    genero: "Acción / Mundo Abierto",
    precio: 39999,
    stock: 18,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.jpg",
    destacado: false
  },
  {
    codigoJuego: 6,
    nombre: "GTA V",
    plataforma: "PlayStation 5",
    tipo: "Físico",
    genero: "Acción / Mundo Abierto",
    precio: 29999,
    stock: 25,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.jpg",
    destacado: false
  },
  {
    codigoJuego: 7,
    nombre: "Clair Obscur: Expedition 33",
    plataforma: "PC",
    tipo: "Digital",
    genero: "RPG por turnos",
    precio: 44999,
    stock: 22,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co8mfh.jpg",
    destacado: false
  },
  {
    codigoJuego: 8,
    nombre: "The Witcher 3: Wild Hunt",
    plataforma: "Nintendo Switch",
    tipo: "Físico",
    genero: "RPG / Aventura",
    precio: 34999,
    stock: 17,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.jpg",
    destacado: false
  }
];

/* =====================================================================
   2. ESTRUCTURA DEL CARRITO
   ---------------------------------------------------------------------
   El carrito también es un arreglo de objetos. Cada objeto contiene
   una referencia a los datos del juego más una cantidad (cantidad)
   ===================================================================== */
let carrito = [];

/* =====================================================================
   3. REFERENCIAS A ELEMENTOS DEL DOM
   ===================================================================== */
const destacadosContainer = document.getElementById("destacadosContainer");
const catalogoContainer = document.getElementById("catalogoContainer");
const noResults = document.getElementById("noResults");

const searchInput = document.getElementById("searchInput");
const filterPlataforma = document.getElementById("filterPlataforma");
const filterTipo = document.getElementById("filterTipo");
const resetFiltersBtn = document.getElementById("resetFilters");

const cartBtn = document.getElementById("cartBtn");
const navCarrito = document.getElementById("navCarrito");
const cartPanel = document.getElementById("cartPanel");
const cartOverlay = document.getElementById("cartOverlay");
const closeCartBtn = document.getElementById("closeCart");

const cartItemsContainer = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotalItems = document.getElementById("cartTotalItems");
const cartTotalPrice = document.getElementById("cartTotalPrice");

const clearCartBtn = document.getElementById("clearCartBtn");
const checkoutBtn = document.getElementById("checkoutBtn");

const confirmOverlay = document.getElementById("confirmOverlay");
const closeConfirmBtn = document.getElementById("closeConfirm");

/* =====================================================================
   4. FUNCIONES DE FORMATO
   ===================================================================== */

// Formatea un número como precio en pesos argentinos
function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-AR");
}

/* =====================================================================
   5. RENDERIZADO DE TARJETAS (CATÁLOGO Y DESTACADOS)
   ---------------------------------------------------------------------
   Recibe un arreglo de juegos y un contenedor del DOM, y genera
   dinámicamente las tarjetas HTML de cada juego.
   ===================================================================== */
function renderizarTarjetas(arregloJuegos, contenedor) {
  // Limpiamos el contenedor antes de volver a dibujar
  contenedor.innerHTML = "";

  // Recorremos el arreglo de juegos (estructura de datos principal)
  arregloJuegos.forEach((juego) => {
    // Determina si hay stock disponible
    const sinStock = juego.stock <= 0;

    // Creamos la tarjeta como un string de HTML
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card");

    tarjeta.innerHTML = `
      <img src="${juego.imagen}" alt="${juego.nombre}" loading="lazy">
      <div class="card-body">
        <span class="card-title">${juego.nombre}</span>
        <div class="card-info">
          <span>${juego.plataforma}</span>
          <span>${juego.genero}</span>
        </div>
        <div class="card-tags">
          <span class="tag tipo-${juego.tipo}">${juego.tipo}</span>
        </div>
        <div class="card-footer">
          <div>
            <div class="card-price">${formatearPrecio(juego.precio)}</div>
            <div class="card-stock">Stock: ${juego.stock}</div>
          </div>
        </div>
        <button class="btn-add" data-codigo="${juego.codigoJuego}" ${sinStock ? "disabled" : ""}>
          ${sinStock ? "Sin stock" : "Agregar al carrito"}
        </button>
      </div>
    `;

    contenedor.appendChild(tarjeta);
  });

  // Mostramos u ocultamos el mensaje de "sin resultados"
  if (arregloJuegos.length === 0) {
    noResults.style.display = "block";
  } else {
    noResults.style.display = "none";
  }
}

/* =====================================================================
   6. CARGA DE FILTROS DE PLATAFORMA (DINÁMICO)
   ---------------------------------------------------------------------
   Recorre el catálogo y extrae las plataformas únicas para
   completar el <select> de filtros.
   ===================================================================== */
function cargarFiltroPlataformas() {
  const plataformas = [];

  // Recorremos el arreglo principal para obtener plataformas únicas
  catalogoJuegos.forEach((juego) => {
    if (!plataformas.includes(juego.plataforma)) {
      plataformas.push(juego.plataforma);
    }
  });

  // Generamos las opciones del select
  plataformas.forEach((plataforma) => {
    const opcion = document.createElement("option");
    opcion.value = plataforma;
    opcion.textContent = plataforma;
    filterPlataforma.appendChild(opcion);
  });
}

/* =====================================================================
   7. FUNCIÓN DE FILTRADO Y BÚSQUEDA
   ---------------------------------------------------------------------
   Aplica los filtros de plataforma, tipo y el texto de búsqueda
   sobre el arreglo "catalogoJuegos" y renderiza el resultado.
   ===================================================================== */
function aplicarFiltros() {
  const textoBusqueda = searchInput.value.trim().toLowerCase();
  const plataformaSeleccionada = filterPlataforma.value;
  const tipoSeleccionado = filterTipo.value;

  // Usamos filter() sobre el arreglo de objetos (juegos)
  const resultado = catalogoJuegos.filter((juego) => {
    const coincideNombre = juego.nombre.toLowerCase().includes(textoBusqueda);
    const coincidePlataforma =
      plataformaSeleccionada === "todas" || juego.plataforma === plataformaSeleccionada;
    const coincideTipo =
      tipoSeleccionado === "todos" || juego.tipo === tipoSeleccionado;

    return coincideNombre && coincidePlataforma && coincideTipo;
  });

  renderizarTarjetas(resultado, catalogoContainer);
}

/* =====================================================================
   8. CARRITO DE COMPRAS
   ===================================================================== */

// Busca un juego en el catálogo por su código (recorrido de arreglo)
function buscarJuegoPorCodigo(codigo) {
  // find() recorre el arreglo y devuelve el primer elemento que cumple la condición
  return catalogoJuegos.find((juego) => juego.codigoJuego === codigo);
}

// Agrega un juego al carrito (o incrementa su cantidad si ya existe)
function agregarAlCarrito(codigo) {
  const juego = buscarJuegoPorCodigo(codigo);
  if (!juego) return;

  // Verificamos si el juego ya está en el carrito
  const itemExistente = carrito.find((item) => item.codigoJuego === codigo);

  if (itemExistente) {
    // Si ya existe, solo aumentamos la cantidad (respetando el stock)
    if (itemExistente.cantidad < juego.stock) {
      itemExistente.cantidad++;
    } else {
      alert("No hay más stock disponible de este producto.");
      return;
    }
  } else {
    // Si no existe, lo agregamos como nuevo registro al arreglo carrito
    carrito.push({
      codigoJuego: juego.codigoJuego,
      nombre: juego.nombre,
      precio: juego.precio,
      imagen: juego.imagen,
      cantidad: 1
    });
  }

  guardarCarrito();
  actualizarCarrito();
}

// Elimina un producto completo del carrito
function eliminarDelCarrito(codigo) {
  // filter() crea un nuevo arreglo sin el elemento eliminado
  carrito = carrito.filter((item) => item.codigoJuego !== codigo);
  guardarCarrito();
  actualizarCarrito();
}

// Aumenta la cantidad de un producto en el carrito
function aumentarCantidad(codigo) {
  const item = carrito.find((i) => i.codigoJuego === codigo);
  const juego = buscarJuegoPorCodigo(codigo);

  if (item && juego && item.cantidad < juego.stock) {
    item.cantidad++;
    guardarCarrito();
    actualizarCarrito();
  }
}

// Disminuye la cantidad de un producto en el carrito (y lo elimina si llega a 0)
function disminuirCantidad(codigo) {
  const item = carrito.find((i) => i.codigoJuego === codigo);

  if (item) {
    item.cantidad--;
    if (item.cantidad <= 0) {
      eliminarDelCarrito(codigo);
    } else {
      guardarCarrito();
      actualizarCarrito();
    }
  }
}

// Vacía completamente el carrito
function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

/* =====================================================================
   9. RENDERIZADO Y ACTUALIZACIÓN DEL CARRITO
   ===================================================================== */
function actualizarCarrito() {
  cartItemsContainer.innerHTML = "";

  // Variables acumuladoras (similar a un algoritmo de sumatoria)
  let totalProductos = 0;
  let totalPrecio = 0;

  if (carrito.length === 0) {
    cartItemsContainer.innerHTML = `<p class="cart-empty">Tu carrito está vacío.</p>`;
  } else {
    // Recorremos el arreglo "carrito" para construir la lista visual
    carrito.forEach((item) => {
      totalProductos += item.cantidad;
      totalPrecio += item.precio * item.cantidad;

      const div = document.createElement("div");
      div.classList.add("cart-item");

      div.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.nombre}</div>
          <div class="cart-item-price">${formatearPrecio(item.precio)} c/u</div>
          <div class="cart-item-qty">
            <button class="qty-btn" data-action="restar" data-codigo="${item.codigoJuego}">−</button>
            <span>${item.cantidad}</span>
            <button class="qty-btn" data-action="sumar" data-codigo="${item.codigoJuego}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-codigo="${item.codigoJuego}" title="Eliminar">🗑️</button>
      `;

      cartItemsContainer.appendChild(div);
    });
  }

  // Actualizamos los totales en pantalla
  cartTotalItems.textContent = totalProductos;
  cartTotalPrice.textContent = formatearPrecio(totalPrecio);
  cartCount.textContent = totalProductos;
}

/* =====================================================================
   10. PERSISTENCIA CON localStorage
   ===================================================================== */

// Guarda el arreglo "carrito" en localStorage como JSON
function guardarCarrito() {
  localStorage.setItem("requiemgames_carrito", JSON.stringify(carrito));
}

// Recupera el carrito guardado al cargar la página
function cargarCarrito() {
  const datosGuardados = localStorage.getItem("requiemgames_carrito");
  if (datosGuardados) {
    carrito = JSON.parse(datosGuardados);
  }
}

/* =====================================================================
   11. APERTURA Y CIERRE DEL PANEL DEL CARRITO
   ===================================================================== */
function abrirCarrito() {
  cartPanel.classList.add("active");
  cartOverlay.classList.add("active");
}

function cerrarCarrito() {
  cartPanel.classList.remove("active");
  cartOverlay.classList.remove("active");
}

/* =====================================================================
   12. SIMULACIÓN DE COMPRA (FINALIZAR COMPRA)
   ===================================================================== */
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío. Agrega productos antes de finalizar la compra.");
    return;
  }

  // Mostramos el modal de confirmación
  confirmOverlay.classList.add("active");

  // Vaciamos el carrito y restauramos la interfaz
  vaciarCarrito();
  cerrarCarrito();
}

function cerrarConfirmacion() {
  confirmOverlay.classList.remove("active");
}

/* =====================================================================
   13. EVENT LISTENERS (DELEGACIÓN DE EVENTOS)
   ===================================================================== */

// Delegación de eventos para los botones "Agregar al carrito" (catálogo y destacados)
document.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("btn-add")) {
    const codigo = parseInt(evento.target.getAttribute("data-codigo"));
    agregarAlCarrito(codigo);
  }
});

// Delegación de eventos dentro del carrito (sumar, restar, eliminar)
cartItemsContainer.addEventListener("click", (evento) => {
  const codigo = parseInt(evento.target.getAttribute("data-codigo"));

  if (evento.target.classList.contains("cart-item-remove")) {
    eliminarDelCarrito(codigo);
  }

  if (evento.target.classList.contains("qty-btn")) {
    const accion = evento.target.getAttribute("data-action");
    if (accion === "sumar") {
      aumentarCantidad(codigo);
    } else if (accion === "restar") {
      disminuirCantidad(codigo);
    }
  }
});

// Búsqueda en tiempo real
searchInput.addEventListener("input", aplicarFiltros);

// Filtros de plataforma y tipo
filterPlataforma.addEventListener("change", aplicarFiltros);
filterTipo.addEventListener("change", aplicarFiltros);

// Botón para limpiar filtros
resetFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  filterPlataforma.value = "todas";
  filterTipo.value = "todos";
  aplicarFiltros();
});

// Abrir / cerrar carrito
cartBtn.addEventListener("click", abrirCarrito);
navCarrito.addEventListener("click", (e) => {
  e.preventDefault();
  abrirCarrito();
});
closeCartBtn.addEventListener("click", cerrarCarrito);
cartOverlay.addEventListener("click", cerrarCarrito);

// Vaciar carrito y finalizar compra
clearCartBtn.addEventListener("click", vaciarCarrito);
checkoutBtn.addEventListener("click", finalizarCompra);

// Cerrar modal de confirmación
closeConfirmBtn.addEventListener("click", cerrarConfirmacion);

/* =====================================================================
   14. NAVEGACIÓN: RESALTAR ENLACE ACTIVO EN EL MENÚ
   ===================================================================== */
const navLinks = document.querySelectorAll(".nav-link[data-section]");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.forEach((l) => l.classList.remove("active"));
    link.classList.add("active");
  });
});

/* =====================================================================
   15. INICIALIZACIÓN DE LA APLICACIÓN
   ===================================================================== */
function inicializarApp() {
  // Cargamos el carrito guardado previamente (si existe)
  cargarCarrito();

  // Generamos los filtros de plataforma de forma dinámica
  cargarFiltroPlataformas();

  // Filtramos los juegos destacados (campo booleano "destacado")
  const juegosDestacados = catalogoJuegos.filter((juego) => juego.destacado === true);

  // Renderizamos las secciones de destacados y catálogo completo
  renderizarTarjetas(juegosDestacados, destacadosContainer);
  renderizarTarjetas(catalogoJuegos, catalogoContainer);

  // Actualizamos la vista del carrito con los datos guardados
  actualizarCarrito();
}

// Ejecutamos la inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", inicializarApp);
