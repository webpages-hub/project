
let carts = document.querySelectorAll('.cart-btn');

let products = [
   { 
   name: 'Brown Brim',
   price: 25,
   tag: 'brown-brim',
   inCart: 0
   },
   { 
   name: 'Blue Beanie',
   price: 18,
   tag: 'blue-beanie',
   inCart: 0
   },
   { 
   name: 'Brown Cowboy',
   price: 35,
   tag: 'brown-cowboy',
   inCart: 0
   },
   {
   name: 'Grey Brim',
   price: 25,
   tag: 'grey-brim',
   inCart: 0
   },
   { 
   name: 'Adidas NMD',
   price: 220,
   tag: 'adidas-nmd',
   inCart: 0
   },
   {
   name: 'Adidas Yeezy',
   price: 280,
   tag: 'yeezy',
   inCart: 0
   },
   {
   name: 'Black Converse',
   price: 110,
   tag: 'black-converse',
   inCart: 0
   },
   {
   name: 'Nike White Airforce',
   price: 160,
   tag: 'white-nike-high-tops',
   inCart: 0
   },
   {
   name: 'Black Jean Shearling',
   price: 125,
   tag: 'black-shearling',
   inCart: 0
   },
   {
   name: 'Blue Jean Jacket',
   price: 90,
   tag: 'blue-jean-jacket',
   inCart: 0
   },
   {
   name: 'Grey jean jacket',
   price: 90,
   tag: 'grey-jean-jacket',
   inCart: 0
   },
   {
   name: 'Brown Shearling',
   price: 165,
   tag: 'brown-trench',
   inCart: 0
   },
   {
   name: 'Blue Tanktop',
   price: 25,
   tag: 'blue-tank',
   inCart: 0
   },
   {
    name: 'Floral Blouse',
    price: 20,
    tag: 'floral-blouse',
    inCart: 0
    },
    {
    name: 'Floral Dress',
    price: 80,
    tag: 'floral-skirt',
    inCart: 0
    },
    {
    name: 'Red Dots Dress',
    price: 80,
    tag: 'red-polka-dot-dress',
    inCart: 0
    },
    {
    name: 'Camo Down Vest',
    price: 325,
    tag: 'camo-vest',
    inCart: 0
    },
    {
    name: 'Floral T-shirt',
    price: 20,
    tag: 'floral-shirt',
    inCart: 0
    },
    {
    name: 'Black & White Longsleeve',
    price: 80,
    tag: 'long-sleeve',
    inCart: 0
    },
    {
    name: 'Pink T-Shirt',
    price: 25,
    tag: 'pink-shirt',
    inCart: 0
    }
];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i])
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart-itemz span').textContent = productNumbers;
    }
}
function cartNumbers(product, action) {
  let productNumbers = localStorage.getItem('cartNumbers');

  productNumbers = parseInt(productNumbers);
  
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);

  if( action ) {
      localStorage.setItem('cartNumbers', productNumbers - 1);
      document.querySelector('.cart-itemz span').textContent = productNumbers - 1;
      console.log("action running");
  } else if(productNumbers) { 
     localStorage.setItem('cartNumbers', productNumbers + 1);
     document.querySelector('.cart-itemz span').textContent = productNumbers + 1;
  }
  else {
     localStorage.setItem('cartNumbers', 1); 
     document.querySelector('.cart-itemz span').textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);
      let cartItems = localStorage.getItem('productsInCart');
      cartItems = JSON.parse(cartItems);

      if(cartItems != null){
          let currentProduct = product.tag;

          if(cartItems[currentProduct] == undefined) {
              cartItems = {
                  ...cartItems,
                  [currentProduct]: product
              }
          }
          cartItems[currentProduct].inCart += 1;
      }
      else{
        product.inCart = 1;
       cartItems = {
          [product.tag]: product   
      };
      }
      
      localStorage.setItem("productsInCart", JSON.stringify(cartItems));
      }
      function totalCost(product, action) {
          let cart = localStorage.getItem('totalCost');
          
          if( action){
              cart = parseInt(cart);

              localStorage.setItem('totalCost', cart - product.price);
          }else if (cart != null){
              cart = parseInt(cart);
              localStorage.setItem('totalCost', cart + product.price);
          }
          else{
           localStorage.setItem('totalCost', product.price);  
          }
      }

      function displayCart() {
          let cartItems = localStorage.getItem("productsInCart");
          cartItems = JSON.parse(cartItems);

          let cart = localStorage.getItem('totalCost');
          cart = parseInt(cart);

          let productContainer = document.querySelector(".products");

          if( cartItems && productContainer ) {
             productContainer.innerHTML = '';
             Object.values(cartItems).map( (item, index) => { 
              productContainer.innerHTML += `
              
                 <div class="product">
                 <ion-icon class="remove" name="close-circle"></ion-icon>
                    <img src="./images/${item.tag}.png">
                    <span>${item.name}</span>
                    <span class="hiddenTag">${item.tag}</span>
                 </div> 

                 <div class="price">#${item.price}.00</div>

                 <div class="quantity">
                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
                   <span>${item.inCart}</span>
                   <ion-icon class="increase" name="add-circle"></ion-icon>
                 </div>

                 <div class="total">
                 #${item.inCart * item.price}.00
                 </div>
                 ` 
             });
             productContainer.innerHTML += `
                <div class="basketTotalContainer">
                  <h4 class="basketTotalTitle">
                    Total Amount
                  </h4> 
                  <h4 class="basketTotal">
                    #${cart}.00
                  </h4>
                  </div> `

                  deleteButtons();
                  manageQuantity();
          }
      }
      function manageQuantity() {
          let decreaseButtons = document.querySelectorAll('.decrease');
          let increaseButtons = document.querySelectorAll('.increase');
          let cartItems = localStorage.getItem('productsInCart');
          let currentQuantity = 0;
          let currentProduct = '';
          cartItems = JSON.parse(cartItems);
      
      
          for(let i=0; i < decreaseButtons.length; i++) {
              decreaseButtons[i].addEventListener('click', () => {
                  currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
                  currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span.hiddenTag').textContent.trim();
      
                  if(cartItems[currentProduct].inCart > 1){
                      cartItems[currentProduct].inCart -= 1;
                      cartNumbers(cartItems[currentProduct], 'decrease');
                      totalCost(cartItems[currentProduct], 'decrease');
                      localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                      displayCart();
                  }
              });
          }
      
          for(let i=0; i < increaseButtons.length; i++) {
              increaseButtons[i].addEventListener('click', () => {
                  currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
                  currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span.hiddenTag').textContent.trim();
              
                  cartItems[currentProduct].inCart += 1;
                  cartNumbers(cartItems[currentProduct]);
                  totalCost(cartItems[currentProduct]);
                  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
                  displayCart();           
              });
          }
      }
      
      //make delete button work in cart
      function deleteButtons() {
          let deleteButtons = document.querySelectorAll('.product ion-icon');
          let productNumbers = localStorage.getItem('cartNumbers');
          let cartCost = localStorage.getItem("totalCost");
          let cartItems = localStorage.getItem('productsInCart');
          cartItems = JSON.parse(cartItems);
          let productName;
          console.log(cartItems);
      
          for(let i=0; i < deleteButtons.length; i++) {
              deleteButtons[i].addEventListener('click', () => {
                  productName = deleteButtons[i].parentElement.querySelector('span.hiddenTag').textContent.trim();
                  console.log(productName);
                 
                  localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);
                  localStorage.setItem('totalCost', cartCost - ( cartItems[productName].price * cartItems[productName].inCart));
      
                  delete cartItems[productName];
                  localStorage.setItem('productsInCart', JSON.stringify(cartItems));
      
                  displayCart();
                  onLoadCartNumbers();
              });
          }
      }
      
      
      


// function cartNumbers(product) {
//     let productNumbers = localStorage.getItem('cartNumbers');

//     productNumbers = parseInt(productNumbers);
    
//     if (productNumbers) { 
//        localStorage.setItem('cartNumbers', productNumbers + 1);
//        document.querySelector('.cart-itemz span').textContent = productNumbers + 1;
//     }
//     else {
//        localStorage.setItem('cartNumbers', 1); 
//        document.querySelector('.cart-itemz span').textContent = 1;
//     }
//     setItems(product);
//   }

//   function setItems(product) {
//         let cartItems = localStorage.getItem('productsInCart');
//         cartItems = JSON.parse(cartItems);
//         if (cartItems != null){

//             if(cartItems[product.tag] == undefined) {
//                 cartItems = {
//                     ...cartItems,
//                     [product.tag]: product
//                 }
//             }
//             cartItems[product.tag].inCart += 1;
//         }
//         else{
//           product.inCart = 1;
//          cartItems = {
//             [product.tag]: product   
//         }
//         }
        
//         localStorage.setItem("productsInCart", JSON.stringify(cartItems));
//         }
//         function totalCost(product) {
//             let cartCost = localStorage.getItem('totalCost');
            
//             console.log("my cartCost is", cartCost);
//             console.log(typeof cartCost);

//             if (cartCost != null){
//                 cartCost = parseInt(cartCost);
//                 localStorage.setItem('totalCost', cartCost + product.price);
//             }
//             else{
//              localStorage.setItem("totalCost", product.price);  
//             }
//         }

//         function displayCart() {
//             let cartItems = localStorage.getItem("productsInCart");
//             cartItems = JSON.parse(cartItems);
//             let productContainer = document.querySelector(".products");
//             let cartCost = localStorage.getItem('totalCost');

//             console.log(cartItems);
//             if( cartItems && productContainer ) {
//                productContainer.innerHTML = '';
//                Object.values(cartItems).map(item => { 
//                 productContainer.innerHTML += `
//                    <div class="product">
//                       <i class="fa fa-remove"></i>
//                       <img src="./images/${item.tag}.png">
//                       <span>${item.name}</span>
//                    </div> 

//                    <div class="price">#${item.price},00</div>

//                    <div class="quantity">
//                      <i class="fa fa-minus" aria-hidden="true"></i>
//                      <span>${item.inCart}</span>
//                      <i class="fa fa-plus" aria-hidden="true"></i>
//                    </div>

//                    <div class="total">
//                    #${item.inCart * item.price},00
//                    </div>
//                    ` 
//                });
//                productContainer.innerHTML += `
//                   <div class="basketTotalContainer">
//                     <h4 class="basketTotalTitle">
//                       Basket total
//                     </h4> 
//                     <h4 class="basketTotal">
//                       #${cartCost},00
//                     </h4>
//                     </div> 
//                `
//             }
//         }

  

  onLoadCartNumbers();
  displayCart();  
  






/*
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }

  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  var addToCartButtons = document.getElementsByClassName("cart-btn");
  for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i];
    button.addEventListener("click", addToCartClicked);
  }
}

function removeCartItem() {
  var buttonClicked = event.target;
  buttonClicked.parentElement.parentElement.remove();
  updateCartTotal();
}

function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
}

function addToCartClicked(event) {
  var button = event.target;
  var shopItem = button.parentElement.parentElement;
  var title = document.getElementsByClassName("title").innerText;
  console.log(title);
}

function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");
  var total = 0;
  for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i];
    var priceElement = cartRow.getElementsByClassName("cart-price")[0];
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0];
    var price = parseFloat(priceElement.innerText.replace("N", ""));
    var quantity = quantityElement.value;
    total = total + price * quantity;
  }
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "N" + total;
   }*/