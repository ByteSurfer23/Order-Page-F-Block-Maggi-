let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCart');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'THE ORIGINAL MAGGI',
        image: 'maggi_normal.JPG',
        price: 15
    },
    {
        id: 2,
        name: 'REFRESHING BLACK COFFEE',
        image: 'black_coffee.JPG',
        price: 12
    },
    {
        id: 3,
        name: 'SOOTHING BLACK TEA',
        image: 'black_tea.JPG',
        price: 10
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">${value.price.toLocaleString()}.Rs</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = totalPrice.toLocaleString()+".Rs";
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}
document.addEventListener('DOMContentLoaded', function () {
    // Get references to the button and popup container
    var Place_order_button = document.getElementById('place_order');
    var popupContainer = document.getElementById('popupContainer');

    // Get reference to the close button inside the popup
    var closeButton = document.getElementById('closePopup');

    // Open the popup when the button is clicked
    Place_order_button.addEventListener('click', function () {
        popupContainer.style.display = 'block';
    });

    // Close the popup when the close button is clicked
    closeButton.addEventListener('click', function () {
        popupContainer.style.display = 'none';
    });

    // Close the popup if the user clicks outside the popup content
    window.addEventListener('click', function (event) {
        if (event.target == popupContainer) {
            popupContainer.style.display = 'none';
        }

    });
});
