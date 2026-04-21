<<<<<<< HEAD
const API_URL = 'https://fakestoreapi.com/products';

const container = document.querySelector('.col-md-8');



function renderCard(product, container) {

    let divEl = document.createElement('div');
    divEl.classList.add('card', 'mb-3', 'p-4', 'd-flex', 'flex-row', 'align-items-center');

    divEl.innerHTML = `
        <img src="${product.image}" class="me-5 product-img">

        <div class="flex-grow-1">
            <h6>${product.title}</h6>
            <div>$${product.price}</div>
        </div>

        <button class="btn btn-link text-danger me-3 fs-5 btn-delete">
            <img src="public/img/delete_14090243.png" class="delete">
        </button>

        <div class="amount-pos">
            <button class="btn btn-light">-</button>
            <span class="mx-2">1</span>
            <button class="btn btn-light">+</button>
        </div>
    `;

    container.appendChild(divEl);
}




function fetchProduct(id) {
    fetch( `${API_URL}/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);


            container.innerHTML = '';


         renderCard(data, container);
        });
        

}

fetchProduct(1);
fetchProduct(18);
=======
const API_URL = 'https://fakestoreapi.com/';

const shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

if(shoppingCart.length == 0){
   alert('Ваша корзина порожня')
}

console.log(shoppingCart);
function renderCard(data) {
   // тут ми відображаємо наш товар з корзини на сторінці 
}
function fetchProduct(id) {
   //fetch(API_URL + ID)
   //тут нам потрібно отримати інформацію про товар його назву його ціну і зображення
   renderCard(data)
}

shoppingCart.forEach(product => {
   console.log(product);
   fetchProduct(product.id)

   
})

>>>>>>> 39b517d082f495d378bd6aafd102e925d758d75d
