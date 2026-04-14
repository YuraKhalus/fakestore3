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

