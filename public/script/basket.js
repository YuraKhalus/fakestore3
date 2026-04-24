const API_URL = 'https://fakestoreapi.com/products';
const container = document.querySelector('.col-md-8');
const subtotalEl = document.querySelector('.subtotal');
const discountEl = document.querySelector('.discount');
const discountHeader = document.querySelector('.discount-header');
const deliveryFeeEl = document.querySelector('.delivery-fee');
const totalEl = document.querySelector('.total');
let subtotal = 0;
let discount = 0;
let deliveryFee = 15;
let total = 0;

const shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

if (shoppingCart.length == 0) {
   alert('Ваша корзина порожня')
}

function renderCard(product, quantity, container) {
    let divEl = document.createElement('div');
    divEl.classList.add('card', 'mb-3', 'p-4', 'd-flex', 'flex-row', 'align-items-center');

    divEl.innerHTML = `
        <img src="${product.image}" class="me-5 product-img">

        <div class="flex-grow-1">
            <h6>${product.title}</h6>
            <div>$${product.price}</div>
        </div>

        <button class="btn btn-link text-danger me-3 fs-5 btn-delete" data-id="${product.id}">
            <img src="public/img/delete_14090243.png" class="delete">
        </button>

        <div class="amount-pos" data-id="${product.id}">
            <button class="btn btn-light minus">-</button>
            <span class="mx-2">${quantity}</span>
            <button class="btn btn-light plus">+</button>
        </div>
    `;
    container.appendChild(divEl);
    calculateSubtotalQuantity(product.price, 'plus', quantity);
}

function fetchProduct(id, quantity) {
    fetch( `${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
            renderCard(data, quantity, container);
            shoppingCart.find(product => product.id == id).price = data.price;
        });
}

console.log(shoppingCart);
shoppingCart.forEach(product => {
   fetchProduct(product.id, product.quantity)
})

container.addEventListener('click', (e)=> {
   if(e.target.parentElement.classList.contains('btn-delete')){
      deleteProduct(e.target.parentElement, e.target.parentElement.dataset.id);
   }
   if(e.target.classList.contains('plus') || e.target.classList.contains('minus')){
      counterControl(e.target.parentElement.dataset.id, e.target.parentElement, e.target.classList.contains('plus') ? 'plus' : 'minus');
   }
})

function deleteProduct(btn, id){
   btn.parentElement.remove();
   let cardIndex = shoppingCart.findIndex(prod => prod.id == id);
   if (cardIndex !== -1){
      calculateSubtotalQuantity(shoppingCart[cardIndex].price, 'minus', shoppingCart[cardIndex].quantity,)
      shoppingCart.splice(cardIndex, 1);
      console.log(shoppingCart);
      // localStorage.setItem('cart', JSON.stringify(shoppingCart))
      saveToLocalStorage(shoppingCart);
   }
}

function counterControl(id, box, operation){
   let currentProduct = shoppingCart.find(prod => prod.id === id);
   // (operation === 'plus') ? currentProduct.quantity++ : currentProduct.quantity--;

   if(operation === 'plus'){
      if (currentProduct.quantity < 10){
         currentProduct.quantity++;
         calculateSubtotalQuantity(currentProduct.price, 'plus')
      } else{
         alert('Обмежена пропозиція: максимум 10 одиниць в 1 кошику')
      }
   } 

   if (operation === 'minus'){
      if (currentProduct.quantity >= 2){
         currentProduct.quantity--;
         calculateSubtotalQuantity(currentProduct.price, 'minus')
      } else{
         alert('Мінімальна кількисть 1 одиниця.')
      }
   }
   box.children[1].innerHTML = currentProduct.quantity  
   // localStorage.setItem('cart', JSON.stringify(shoppingCart));
   saveToLocalStorage(shoppingCart)
}

function calculateSubtotalQuantity(price, operation, quantity = 1){
   if(operation === 'plus'){
      subtotal += price * quantity;
   }
   if (operation === 'minus'){
      subtotal -= price * quantity;
   }
   subtotalEl.innerHTML = `$ ${subtotal.toFixed(2)}`   
}

function saveToLocalStorage(arr){
   let clearArr = arr.map(product => ({ id: product.id, quantity: product.quantity}))
   localStorage.setItem('cart', JSON.stringify(clearArr))
}

