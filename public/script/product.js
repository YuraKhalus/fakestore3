const params = new URLSearchParams(window.location.search)
const productId = params.get('id') || 1;
const API_URL = 'https://fakestoreapi.com/';
console.log(productId);

const title = document.querySelector('#title')
const price = document.querySelector('#price')
const description = document.querySelector('#description')
const image = document.querySelector('#product-img')
const fullprice = document.querySelector('#fullprice')
const stars = document.querySelector('#stars')
const rate = document.querySelector('#rate')
const minus = document.querySelector('#minus')
const quantity = document.querySelector('#quantity')
const plus = document.querySelector('#plus')
const sizebuttons = document.querySelectorAll('#sizebuttons')
const addToCard = document.querySelector('.add-to-cart')

let counter = 1

plus.addEventListener('click', () => {

    if (counter >= 10){
        return;
    } else {
         counter++
         quantity.textContent = counter
    }
})

minus.addEventListener('click', () => {
     if (counter <= 1){
        return;
    } else {
         counter--
         quantity.textContent = counter
    }
})

console.log();

const sizeButtons = document.querySelectorAll('.size-option');

sizeButtons.forEach(button => {
    button.addEventListener('click', () => {
        sizeButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        console.log(`Обрано розмір: ${button.textContent}`);
    });
});


const fetchProduct = async (id) => {
    try {
        const response = await fetch(API_URL + 'products/' + id);
        
        if (!response.ok) {
            throw new Error('Помилка завантаження даних');
        }

        const productData = await response.json();
        console.log(productData);

        title.textContent = productData.title;
        price.textContent = `$${productData.price}`;
        fullprice.textContent = (productData.price / 0.6).toFixed(2);
        console.log(typeof productData.price);
        stars.innerHTML = ``
        for(let i = 1; i <= Math.round(productData.rating.rate) && i <= 5; i++){
            stars.innerHTML += `★`
        }
        rate.textContent = productData.rating.rate
        console.log(productData.rating.rate);
        
        description.textContent = productData.description;
        
    
        if (image) {
            image.src = productData.image;
            image.alt = productData.title;
        }


    } catch (error) {
        console.error('Сталася помилка:', error);
        if (title) title.textContent = "Не вдалося завантажити товар.";
    }
}

fetchProduct(productId);


const BASE_API_URL = 'https://dummyjson.com/'
const reviewsContainer = document.querySelector('.reviews-container')
console.log(reviewsContainer);

const fetchReview = async (productId) => {
    try {
    const response = await fetch(`${BASE_API_URL}comment?limit=4&skip=${productId*10}`);
    const data = await response.json();
    reviewsContainer.innerHTML = '';
    data.comments.forEach(review => {
        // console.log(review);
        renderReview(review);
    })
    console.log(data.comments);
    
    } catch(err){
        console.error(err);
    }
}

fetchReview(+productId);

function renderReview(review){
    const reviewCard = document.createElement('div');
    reviewCard.classList.add('border', 'border-gray-200', 'rounded-2xl', 'p-6', 'flex', 'flex-col')
    reviewCard.innerHTML = `<div class="flex justify-between items-start mb-4">
    ${likeReview(review.likes)}
                <button class="text-gray-400 hover:text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
                </button>
            </div>
            <div class="flex items-center gap-2 mb-3">
                <span class="font-bold text-lg">${review.user.fullName}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#10B981"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#10B981"/><path d="M10 17l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#fff"/></svg>
            </div>
            <p class="text-gray-500 text-sm leading-relaxed mb-6">"${review.body}"</p>
            <div class="mt-auto font-medium text-gray-400 text-sm">Posted on August 14, 2023</div>`
    reviewsContainer.appendChild(reviewCard);
}

function likeReview(rate){
    const likesBox = document.createElement('div');
    likesBox.classList.add('flex', 'text-yellow-400', 'gap-1')
    for(let i = 1; i <= rate && i <= 5; i++){
        console.log(i);
        
        likesBox.innerHTML += `
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>

        `
    }
    console.log(likesBox);
    
    return likesBox.outerHTML;
}

let shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

addToCard.addEventListener('click', () => {
    let product = {
        id: productId,
        quantity: counter
    }
    if(shoppingCart.find(prod => prod.id === product.id) == undefined){
        shoppingCart.push(product)
        localStorage.setItem('cart', JSON.stringify(shoppingCart))
        alert('Товар успішно доповнений в корзину!')
    } else if (shoppingCart.find(prod => prod.id === productId && prod.quantity == product.quantity)){
        alert('Цей товар вже є у вашій корзині в к-ті ' + shoppingCart.find(prod => prod.id === product.id).quantity)
    } else{
        shoppingCart.find(prod => prod.id === product.id).quantity = product.quantity;
        alert('Ваш товар змінено в к-ті' + shoppingCart.find(prod => prod.id === product.id).quantity)
    }
    
    console.log(shoppingCart);
    
    
})