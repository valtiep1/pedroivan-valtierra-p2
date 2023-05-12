function get(element) {
    return document.getElementsByClassName(element);
}

function getQ(element){
    return document.querySelector(element);
}
//Cart
let cartIcon =  getQ('#cart-icon');
let closeCart = getQ('#close-cart');
let cart =      getQ('.cart');

//Open Cart
cartIcon.onclick = () => {
    cart.classList.add("active");
}

//Close Cart
closeCart.onclick = () => {
    cart.classList.remove("active");
}

//Cart
if (document.readyState == "loading") {
    document.addEventListener('DOMContentLoaded', ready);
}
else {
    ready();
}

function ready() {
    //Remove Items From Cart

    var deselect = get('cart-remove');
    console.log(deselect);
    for (var i = 0; i < deselect.length; i++) {
        var button = deselect[i];
        button.addEventListener('click', removeCartItem);
    }
    //Change quantity
    var quantityItems = get('cart-quantity');
    for (var i = 0; i < quantityItems.length; i++) {
        var input = quantityItems[i];
        input.addEventListener('change', quantityUpDown);
    }
    //Add Items to Cart
    var addCart = get("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    //Press buy Button 
    get('btn-buy')[0].addEventListener('click', buyButtonClicked);
}
function buyButtonClicked() {
    alert('Your Order was succesfully placed');
    var cartContent = get('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    totalPayment();
}

//Remove an item from the cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    totalPayment();
}

//Change Quantity Of Items
function quantityUpDown(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    totalPayment();
}
//Add to the Cart
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    totalPayment();
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = get("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("Item is alredy in your cart");
            return;
        }

    }

    var cartBoxContent = `
<img src="${productImg}" alt="" class="cart-image" />
<div class="detail-box">
  <div class="cart-product-title">${title}</div>
  <div class="cart-price">${price}</div>
  <input type="number" value="1" class="cart-quantity" />
</div>
<!--Remove Cart-->
<i class='bx bx-trash cart-remove'></i>`;
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener('click', removeCartItem);

    cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change', quantityUpDown);
}

//Make Total Amount to Pay
function totalPayment() {
    var cartContent = get("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i]
        var priceEl = cartBox.getElementsByClassName("cart-price")[0];
        var quantityEl = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceEl.innerText.replace("$", ""));
        var quantity = quantityEl.value;
        total = total + (price * quantity);
    }
    //If the product price has decimal values it is going to reduce the decimals just to two.
    total = Math.round(total * 100) / 100;
    get('total-price')[0].innerText = '$' + total;

}