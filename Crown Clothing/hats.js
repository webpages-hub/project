
let cartsBtn = document.querySelectorAll('.cart-btn');

let Allproducts = [
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
   name: 'Green Beanie',
   price: 18,
   tag: 'green-beanie',
   inCart: 0
   },
   {
   name: 'Palm Tree Cap',
   price: 14,
   tag: 'palm-tree-cap',
   inCart: 0
   },
   {
   name: 'Red Beanie',
   price: 18,
   tag: 'red-beanie',
   inCart: 0
   },
   {
   name: 'Wolf Cap',
   price: 14,
   tag: 'wolf-cap',
   inCart: 0
   },
   {
   name: 'Blue Snapback',
   price: 16,
   tag: 'blue-snapback',
   inCart: 0
   }
];

for (let i=0; i < cartsBtn.length; i++){
    cartsBtn[i].addEventListener('click', () => {
    cartFigures(Allproducts[i]);
    totalCartCost(Allproducts[i])
    })
}

function onLoadcartFigures() {
    let productFigures = localStorage.getItem('cartFigures');
    if (productFigures){
        document.querySelector('.cart-itemz span').textContent = productFigures;
    }
}
function cartFigures(product, action) {
  let productFigures = localStorage.getItem('cartFigures');

  productFigures = parseInt(productFigures);
  
  let cartContent = localStorage.getItem('itemsInCart');
  cartContent = JSON.parse(cartContent);

  if( action ) {
      localStorage.setItem('cartFigures', productFigures - 1);
      document.querySelector('.cart-itemz span').textContent = productFigures - 1;
      console.log("action running");
  } else if(productFigures) { 
     localStorage.setItem('cartFigures', productFigures + 1);
     document.querySelector('.cart-itemz span').textContent = productFigures + 1;
  }
  else {
     localStorage.setItem('cartFigures', 1); 
     document.querySelector('.cart-itemz span').textContent = 1;
  }
  setItems(product);
}

function setItems(product) {
    let productFigures = localStorage.getItem('cartFigures');
    productFigures = parseInt(productFigures);
      let cartContent = localStorage.getItem('itemsInCart');
      cartContent = JSON.parse(cartContent);

      if(cartContent != null){
          let currentproduct = product.tag;

          if(cartContent[currentproduct] == undefined) {
              cartContent = {
                  ...cartContent,
                  [currentproduct]: product
              }
          }
          cartContent[currentproduct].inCart += 1;
      }
      else{
        product.inCart = 1;
       cartContent = {
          [product.tag]: product   
      };
      }
      
      localStorage.setItem("itemsInCart", JSON.stringify(cartContent));
      }
      function totalCartCost(product, action) {
          let cart = localStorage.getItem('totalCartCost');
          
          if( action){
              cart = parseInt(cart);

              localStorage.setItem('totalCartCost', cart - product.price);
          }else if (cart != null){
              cart = parseInt(cart);
              localStorage.setItem('totalCartCost', cart + product.price);
          }
          else{
           localStorage.setItem('totalCartCost', product.price);  
          }
      }

      function showCart() {
          let cartContent = localStorage.getItem("itemsInCart");
          cartContent = JSON.parse(cartContent);

          let cart = localStorage.getItem('totalCartCost');
          cart = parseInt(cart);

          let cartsContainer = document.querySelector(".cart_products");

          if( cartContent && cartsContainer ) {
             cartsContainer.innerHTML = '';
             Object.values(cartContent).map( (item, index) => { 
              cartsContainer.innerHTML += `
              
                 <div class="cart_product">
                 <ion-icon class="remove" name="close-circle"></ion-icon>
                    <img src="./images/${item.tag}.png">
                    <span>${item.name}</span>
                    <span class="hiddenTag">${item.tag}</span>
                 </div> 

                 <div class="cart_price">$${item.price}.00</div>

                 <div class="cart_quantity">
                 <ion-icon class="decrease" name="remove-circle"></ion-icon>
                   <span>${item.inCart}</span>
                   <ion-icon class="increase" name="add-circle"></ion-icon>
                 </div>

                 <div class="cart_total">
                 $${item.inCart * item.price}.00
                 </div>
                 ` 
             });
             cartsContainer.innerHTML += `
                <div class="cartTotalContainer">
                  <h4 class="cartTotalTitle">
                    Total Amount
                  </h4> 
                  <h4 class="cartTotal">
                    $${cart}.00
                  </h4>
                  </div> `

                  deleteBtn();
                  manageQty();
          }
      }
      function manageQty() {
          let decreaseBtn = document.querySelectorAll('.decrease');
          let increaseBtn = document.querySelectorAll('.increase');
          let cartContent = localStorage.getItem('itemsInCart');
          let currentQuantity = 0;
          let currentproduct = '';
          cartContent = JSON.parse(cartContent);
      
      
          for(let i=0; i < decreaseBtn.length; i++) {
              decreaseBtn[i].addEventListener('click', () => {
                  currentQuantity = decreaseBtn[i].parentElement.querySelector('span').textContent;
                  currentproduct = decreaseBtn[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span.hiddenTag').textContent.trim();
      
                  if(cartContent[currentproduct].inCart > 1){
                      cartContent[currentproduct].inCart -= 1;
                      cartFigures(cartContent[currentproduct], 'decrease');
                      totalCartCost(cartContent[currentproduct], 'decrease');
                      localStorage.setItem('itemsInCart', JSON.stringify(cartContent));
                      showCart();
                  }
              });
          }
      
          for(let i=0; i < increaseBtn.length; i++) {
              increaseBtn[i].addEventListener('click', () => {
                  currentQuantity = increaseBtn[i].parentElement.querySelector('span').textContent;
                  currentproduct = increaseBtn[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span.hiddenTag').textContent.trim();
              
                  cartContent[currentproduct].inCart += 1;
                  cartFigures(cartContent[currentproduct]);
                  totalCartCost(cartContent[currentproduct]);
                  localStorage.setItem('itemsInCart', JSON.stringify(cartContent));
                  showCart();           
              });
          }
      }
      
      //make delete button work in cart
      function deleteBtn() {
          let deleteBtn = document.querySelectorAll('.cart_product ion-icon');
          let productFigures = localStorage.getItem('cartFigures');
          let cartCost = localStorage.getItem("totalCartCost");
          let cartContent = localStorage.getItem('itemsInCart');
          cartContent = JSON.parse(cartContent);
          let productName;
          console.log(cartContent);
      
          for(let i=0; i < deleteBtn.length; i++) {
              deleteBtn[i].addEventListener('click', () => {
                  productName = deleteBtn[i].parentElement.querySelector('span.hiddenTag').textContent.trim();
                  console.log(productName);
                 
                  localStorage.setItem('cartFigures', productFigures - cartContent[productName].inCart);
                  localStorage.setItem('totalCartCost', cartCost - ( cartContent[productName].price * cartContent[productName].inCart));
      
                  delete cartContent[productName];
                  localStorage.setItem('itemsInCart', JSON.stringify(cartContent));
      
                  showCart();
                  onLoadcartFigures();
              });
          }
      }
      



  onLoadcartFigures();
  showCart();  
  






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