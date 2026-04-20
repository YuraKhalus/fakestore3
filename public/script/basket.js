const API_URL = 'https://fakestoreapi.com/products';

// знайти контейнер
const container = document.querySelector('.col-md-8');

// отримати дані
fetch(API_URL)
    .then(res => res.json())
    .then(data => {
        console.log(data);

        // очистити стару картку (щоб не дублювалась)
        container.innerHTML = '';

        // вивести кілька товарів
        data.slice(0, 1).forEach(product => {
            renderCard(product, container);
        });
    });


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