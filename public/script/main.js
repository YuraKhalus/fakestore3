const API_URL = 'https://fakestoreapi.com/';
const newProductsContainer = document.querySelector('.new-products-container');
const mensContainer = document.querySelector('.mens-container');
const womensContainer = document.querySelector('.womens-container');
const electronicsContainer = document.querySelector('.electronics-container');
const jewelryContainer = document.querySelector('.jewelry-container');



function renderCard(product, container, slider) {

    let divEl = document.createElement('div');
    divEl.classList.add('card', 'product-card', 'col-md-3', `${slider}`);
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



    for (let i = 0; i < 4; i++) {
        let random = Math.floor(Math.random() * data.length);
        console.log(random);
        data.forEach(product => {
            if (product.id === random) {
                renderCard(product, newProductsContainer);
            }

        });

    }



  
    const womensResponse = await fetch(API_URL + "products/category/women's clothing");
    const womensData = await womensResponse.json();
    womensContainer.innerHTML = '';

        womensData.forEach(product => {
                renderCard(product, womensContainer, 'swiper-slide');
        
        });
  


  
    const mensResponse = await fetch(API_URL + "products/category/men's clothing");
    const mensData = await mensResponse.json();
    mensContainer.innerHTML = '';

    

        mensData.forEach(product => {
           
                renderCard(product, mensContainer);
         
        });
    


 
    const electronicsResponse = await fetch(API_URL + "products/category/electronics");
    const electronicsData = await electronicsResponse.json();
    electronicsContainer.innerHTML = '';

  

        electronicsData.forEach(product => {
            
                renderCard(product, electronicsContainer, 'swiper-slide');
          
        });
 


  
    const jewelryResponse = await fetch(API_URL + "products/category/jewelery");
    const jewelryData = await jewelryResponse.json();
    jewelryContainer.innerHTML = '';

    

        jewelryData.forEach(product => {
           
                renderCard(product, jewelryContainer);
            
        });
    }



fetchProducts();









// const BASE_API_URL = "https://dummyjson.com/";
// const reviewsContainer = document.querySelector('.reviews-container')

// const fetchReview = async (productId) => {
//     try {
//         const response = await fetch(`${BASE_API_URL}comments?limit=4&skip=${productId * 10}`);
//         const data = await response.json();
//         reviewsContainer.innerHTML = '';
//         data.comments.forEach(review => {
//             // console.log(review);
//             renderReview(review);

//         })

//         console.log(data.comments);

//     } catch (err) {
//         console.log(err);
//     }

// }
// fetchReview(+productId);

// function renderReview(review) {
//     const reviewCard = document.createElement('div');
//     // renderCard.classList.add( тут мають бути класи);
//     reviewCard.innerHTML = `
    
//     // контейнер, відображати на сторінці ${review.user.fullname},${review.body},
//     // ${likeReview { review.rating }
// }


// `
// reviewsContainer.appendChild('reviewCard');

// }

// function likeReview(likes){

//     const likesBox = document.createElement('div');
//     // likesBox.classList.add(мають бути класи)
//     for(let i = 1; i <= likes; i++){
//        likesBox.innerHTML = `
//     //    зображення зірки
//     `
//     }
//     console.log(likesBox);


//     return likesBox.outerHTML;

// }
