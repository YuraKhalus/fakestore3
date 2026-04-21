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

        <div class="amount-pos">
            <button class="btn btn-light">-</button>
            <span class="mx-2">${quantity}</span>
            <button class="btn btn-light">+</button>
        </div>
    `;

   //  container.innerHTML += divEl.outerHTML;
    container.appendChild(divEl);
    deleteBtnIntitializer();
    calculateSubtotal(product.price);
}

function fetchProduct(id, quantity) {
    fetch( `${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            renderCard(data, quantity, container);
        });
}

console.log(shoppingCart);
shoppingCart.forEach(product => {
   console.log(product);
   fetchProduct(product.id, product.quantity)

})

function deleteBtnIntitializer() {
   const deleteBtns = document.querySelectorAll('.btn-delete')
   console.log(deleteBtns);
   deleteBtns.forEach(btn => {
      btn.addEventListener('click',() => {
         deleteProduct(btn, btn.dataset.id);
      })
   })
}

function deleteProduct(btn, id){
   btn.parentElement.remove();
   console.log(shoppingCart.findIndex(prod => prod.id == id));
   if(shoppingCart.findIndex(prod => prod.id == id) !== -1){
      shoppingCart.splice(shoppingCart.findIndex(prod => prod.id == id), 1);
      console.log(shoppingCart);
      localStorage.setItem('cart', JSON.stringify(shoppingCart))
   }
}

function calculateSubtotal(productPrice){
   subtotal += productPrice;
   subtotalEl.innerHTML = `$ ${subtotal}`
}


 