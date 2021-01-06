let carts = document.querySelectorAll('.menu__button');

let products = [
   { 
   name: 'Jollof Rice and Chicken',
   price: 1200,
   tag: 'jollof',
   inCart: 0
   },
   { 
   name: 'Assorted Macaroni',
   price: 1800,
   tag: 'hot',
   inCart: 0
   },
   { 
   name: 'Pasta and Curry Soup',
   price: 2000,
   tag: 'background3',
   inCart: 0
   }
];

for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
    });
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if (productNumbers){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


function cartNumbers(product, action) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);
    
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if( action ) {
        localStorage.setItem('cartNumbers', productNumbers - 1);
        document.querySelector('.cart span').textContent = productNumbers - 1;
        console.log("action running");
    } else if(productNumbers) { 
       localStorage.setItem('cartNumbers', productNumbers + 1);
       document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    else {
       localStorage.setItem('cartNumbers', 1); 
       document.querySelector('.cart span').textContent = 1;
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
                      <img src="./img/${item.tag}.jpg">
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
                      Grand total
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
        
        
        

        onLoadCartNumbers();
        displayCart();  