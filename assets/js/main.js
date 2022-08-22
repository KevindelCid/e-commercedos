

/* ================= Variables y Constantes Globales ================= */
const menu = document.getElementById("nav-toggle");
const elementoMenu = document.getElementById("elemento-menu");
const elementoCart = document.getElementById("elemento-cart");
const cart = document.getElementById("cart-shop");
const cartOut = document.getElementById("cart");
const articulos = document.getElementById("articulos");
const carrito = [];
const cartCounter = document.getElementById("cart-counter");
let cartItems = [];
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


/* ================  UX Functions ============== */

/* === Al hacer scroll aparece fondo blanco en la nav === */

document.addEventListener("scroll", (e) => {
  const position = window.scrollY;
  const navegation = document.getElementById("nav");

  if (position > 20) {
    navegation.classList.replace("no-scrolling", "scrolling");
  } else {
    navegation.classList.replace("scrolling", "no-scrolling");
  }
});

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


/* =========== LOADER ========== */

const loader = document.getElementById("loader");
function load() {
  setTimeout(() => {
    loader.classList.add("hide");
  }, 1500);
}

/* ======== Al cargar el DOMContentLoaded =========== */

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
  cargarDatos();
  // showProducts( items )
});



function cargarDatos() {
  cartCounter.textContent = localStorage.getItem("countCart");
  if (parseInt(cartCounter.textContent) > 0)
    cartContainer.classList.remove("is-empty");

  if (cartCounter.textContent === "") cartCounter.textContent = 0;

  if (localStorage.getItem("carrito") !== "") {
    cartItems = JSON.parse(localStorage.getItem("carrito"));
  }
}

/* =========== Articulos a la venta ==========*/

function articulosLoader(arr) {
  let htmlText = ``;
  arr.map((item) => {
    htmlText += `
    <div class="card"  id=${item.id}>
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
  cartFunctionality();










}





menu.addEventListener("click", () => {
  displayMenu();
});

cart.addEventListener("click", () => displayCart());
// cartOut.addEventListener("click", (e) => displayCart());

/* ========= carrito ==========*/


function apilaritemsCarrito(articulos) {

  const resultado = []


  items.forEach(producto => {


    producto.count = articulos.filter(articulo => articulo.id === producto.id).length
    resultado.push(producto)

  })
  return resultado.filter(item => item.count > 0)



}








function cartFunctionality() {
  //Arreglo con todos los botones
  const btns = document.querySelectorAll(".card-add-cart"); //NodeList

  btns.forEach((button) => {
    button.addEventListener("click", () => {

      const id = parseInt(button.parentElement.id);
      const selectedProduct = items.find((item) => item.id === id);

      if (localStorage.getItem("carrito") !== null) {
        cartItems = JSON.parse(localStorage.getItem("carrito"));
      } else {
        cartItems = [];
      }
      /* ====== instrucción despliegue de items apilados
      // hasta este punto la variable cartItems contiene todos los elementos que hay en el carrito
      // entonces aqui vamos a crear una fucion que retorne un array con los elementos pero sin repetirlos, unicamente con su contador
      */





      cartItems.push(selectedProduct);



      cartItems = apilaritemsCarrito(cartItems);



      localStorage.setItem("carrito", JSON.stringify(cartItems));
      localStorage.setItem("countCart", cartItems.length);
      cartCounter.textContent = cartItems.length;
      if (parseInt(cartCounter.textContent) > 0) {
        cartContainer.classList.remove("is-empty");
      }
    });
  });
}

function displayMenu() {
  const elementos = document.getElementById("elementos");
  elementos.classList.contains("no-display")
    ? elementoMenu.classList.replace("bx-grid-alt", "bx-chevrons-right")
    : elementoMenu.classList.replace("bx-chevrons-right", "bx-grid-alt");

  elementos.classList.toggle("no-display");
}

const cartContainer = document.getElementById("items-cart");

function displayCart() {
  const cart = document.getElementById("cart");
  let emptyHtml = ` <img class="contenedor-elements--img" src="./assets/images/empty-cart.png" alt="cart">
  <h2 class="contenedor-elements--h2">Your cart is empty</h2>
  <p class="contenedor-elements--p">You can add items to your cart by clicking on the ´+´ button on                the product page.</p> `;
  cart.classList.contains("no-display")
    ? elementoCart.classList.replace("bx-shopping-bag", "bx-chevrons-right")
    : elementoCart.classList.replace("bx-chevrons-right", "bx-shopping-bag");

  cart.classList.toggle("no-display");
  if (cartContainer.classList.contains("is-empty")) {
    cartContainer.innerHTML = emptyHtml;
  } else {
    emptyHtml = "";
    JSON.parse(localStorage.getItem("carrito")).map((item) => {
      emptyHtml += `<div class="item">
      <img class="img-into-cart" src=${item.image} alt="">
      <div >
        <h2>${item.name}</h2>
        <p>Stock: ${item.quantity} <span>$${item.price}.00</span></p>
        <h3>Subtotal: $24.00</h3>
        <div class="controls">
          <button type="button" class="countBtnResta" id=${item.id}  >-</button>
        <small id="counterArticle">${item.count} Units</small>
        <button type="button" class="countBtnSuma" >+</button>
        </div>
       
      </div>
      <a href="#">V</a>
        

      
    </div>`;
    });

    cartContainer.innerHTML = emptyHtml;
  }


  const btnsCount = document.querySelectorAll(".countBtnResta"); //NodeList

  btnsCount.forEach((button) => {
      button.addEventListener("click", (e) => {
      


        console.log(button.id)
        const id = parseInt(button.id);
      
    const carrito = JSON.parse(localStorage.getItem("carrito"))
  
        carrito.map((articulo, index) => {
          if(articulo.id === id){
            carrito[index].count --;
            
          }
         })
         localStorage.setItem("carrito", JSON.stringify(carrito))
  
      })
    })





}







function restar(item){

 const carrito = JSON.parse(localStorage.getItem("carrito"))
 carrito.map((articulo, index) => {
  if(articulo.id === item){
    carrito[index].count --;
    console.log(carrito)
  }
 })
 localStorage.setItem("carrito", JSON.stringify(carrito))
//  const counter = getElementById('counterArticle')
//  counter.textContent =

}




////////////////

// let url = "https://pokeapi.co/api/v2/pokemon/ditto";

// fetch(url)
//   .then((response) => response.json())
//   .then((pokeDatos) => {
//     console.log(pokeDatos);
//   })
//   .catch((error) => console.error(error));
