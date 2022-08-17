const items = [
  {
    id: 1,
    name: "Hoodies",
    price: 14.0,
    image: "assets/images/featured1.png",
    category: "hoodies",
    quantity: 10,
  },
  {
    id: 2,
    name: "Shirts",
    price: 24.0,
    image: "assets/images/featured2.png",
    category: "shirts",
    quantity: 15,
  },
  {
    id: 3,
    name: "Sweatshirts",
    price: 24.0,
    image: "assets/images/featured3.png",
    category: "sweatshirts",
    quantity: 20,
  },
];

document.addEventListener("scroll", (e) => {
  const position = window.scrollY;
  const navegation = document.getElementById("nav");

  if (position > 20) {
    navegation.classList.replace("no-scrolling", "scrolling");
  } else {
    navegation.classList.replace("scrolling", "no-scrolling");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "bx-moon") {
    themeButton.classList.replace("bx-sun", "bx-moon");
    document.body.classList.add("dark-theme");
  } else {
    document.body.classList.remove("dark-theme");
    themeButton.classList.replace("bx-moon", "bx-sun");
  }
  load();
  articulosLoader(items);
  // showProducts( items )
});

/* =========== LOADER ========== */
const loader = document.getElementById("loader");
function load() {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 1500);
}

/* =========== Articulos a la venta ==========*/

function articulosLoader(arr) {
  let htmlText = ``;
  arr.map((item) => {
    htmlText += `
    <div class="card">
    <div class="card-add-cart">
      <span>+</span>
    </div>
<div class="card-img">
  <img class="img-card" src=${item.image} alt="">

</div>
    <div  class="description-card">
      <p><h2>$${item.price}.00</h2> | Stock: ${item.quantity} <br><span>Hoodies</span></p>
    </div>
  </div>
  `;
  });
  articulos.innerHTML = htmlText;
}

/* =========DARK MODE======== */
const themeButton = document.getElementById("theme-button");

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");

  if (themeButton.classList.contains("bx-moon")) {
    themeButton.classList.replace("bx-moon", "bx-sun");
    localStorage.setItem("theme", "bx-sun");
  } else {
    themeButton.classList.replace("bx-sun", "bx-moon");
    localStorage.setItem("theme", "bx-moon");
  }
});

const menu = document.getElementById("nav-toggle");
const elementoMenu = document.getElementById("elemento-menu");
const elementoCart = document.getElementById("elemento-cart");
const cart = document.getElementById("cart-shop");
const cartOut = document.getElementById("cart");
const articulos = document.getElementById("articulos");

menu.addEventListener("click", (e) => {
  displayMenu();
});

cart.addEventListener("click", (e) => displayCart());
// cartOut.addEventListener("click", (e) => displayCart());

/* ========= carrito ==========*/

function carritoLoader() {
  localStorage.getItem("");
}

function displayMenu() {
  const elementos = document.getElementById("elementos");
  elementos.classList.contains("no-display")
    ? elementoMenu.classList.replace("bx-grid-alt", "bx-chevrons-right")
    : elementoMenu.classList.replace("bx-chevrons-right", "bx-grid-alt");

  elementos.classList.toggle("no-display");
}

function displayCart() {
  const cart = document.getElementById("cart");
  cart.classList.contains("no-display")
    ? elementoCart.classList.replace("bx-shopping-bag", "bx-chevrons-right")
    : elementoCart.classList.replace("bx-chevrons-right", "bx-shopping-bag");

  cart.classList.toggle("no-display");
}

////////////////

// let url = "https://pokeapi.co/api/v2/pokemon/ditto";

// fetch(url)
//   .then((response) => response.json())
//   .then((pokeDatos) => {
//     console.log(pokeDatos);
//   })
//   .catch((error) => console.error(error));
