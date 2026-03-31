const API_URL = 'https://fakestoreapi.com/';
const newProductsContainer = document.querySelector('.new-products-container')



function renderCard(product, container) {

    let divEl = document.createElement('div');
    divEl.classList.add('card', 'product-card', 'col-md-3', );
    divEl.innerHTML = `
 <img src="${product.image}"
     class="card-img-top">
    <div class="card-body text-center">
        <h5 class="card-title">${product.title}</h5>
        <p class="price">$${product.price}</p>
    </div>
    <a href="product.html?id=${product.id}" class="btn btn-primary view">View Product<a>
`;
    container.appendChild(divEl)
}



const fetchProducts = async () => {
    const response = await fetch(API_URL + 'products');
    const data = await response.json();
    console.log(data);
    newProductsContainer.innerHTML = '';



    for (let i = 0; i < data.length; i++) {
        let random = Math.floor(Math.random() * 19) + 1;
        console.log(random);
        data.forEach(product => {
            if (product.id === random) {
                renderCard(product, newProductsContainer);
            }

        });

    }


}
fetchProducts();


