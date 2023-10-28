let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

// run calculation everytime the applications loads
calculation();

let generateCartItems = () => {
    if (basket.length !== 0) {
        return (ShoppingCart.innerHTML = basket.map((x) => {
            let {id, item} = x;

            // match id from basket with id form datajs
            let search = shopItemsData.find((y) => y.id === id) || [];

            let {img, name, price} = search;

            return    `
            <div class="cart-item">
                <img width="100" src=${img} alt="">

                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>

                        <img onclick="removeItem(${id})" class="bi bi-x-lg" width='10px' src="images/icons/exitIcon.png" alt="exit-icon">
                    </div>

                    <div class="buttons">
                        <a onclick="decrement(${id})" class="bi bi-dash-lg">
                            <img src="images/icons/minus_btn.png" alt="minus button">
                        </a>
                        <div id=${id} class="quanity">${item}</div>
                        <a onclick="increment(${id})" class="bi  bi-plus-lg">
                            <img src="images/icons/plust_btn.png" alt="plus button">
                        </a>
                    </div>

                    <h3>$ ${item * search.price}</h3>
                </div>
            </div>
            `
        })
        .join(""));
    } else {
        ShoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is Empty</h2>
            <a href="index.html">
                <button class="HomeBtn">Back to home</button>
            </a>
        `;
    }
}

generateCartItems();

let increment = (id) => {
    let seletedItem = id;
    let search = basket.find((item) => item.id === seletedItem.id);

    if (search === undefined) {
        basket.push({
            id: seletedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }

    update(seletedItem.id);

    generateCartItems();

    localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
    let seletedItem = id;
    let search = basket.find((item) => item.id === seletedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else search.item -= 1;

    update(seletedItem.id);

    basket = basket.filter((x) => x.item !== 0);

    generateCartItems();

    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((item) => item.id === id);
    // console.log(search.item);
    document.getElementById(id).innerHTML = search.item;

    calculation();
    TotalAmount();
};

let removeItem = (id) => {
    let seletedItem = id;
    // console.log(seletedItem.id)
    basket = basket.filter((x) => x.id !== seletedItem.id);

    generateCartItems();
    TotalAmount();
    calculation();

    localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
    basket = [];
    generateCartItems();
    calculation();

    localStorage.setItem("data", JSON.stringify(basket));
}


let TotalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket.map((x) => {
            let {id, item} = x;

            // match id from basket with id form datajs
            let search = shopItemsData.find((y) => y.id === id) || [];

            return item * search.price;
        }).reduce((x, y) => x + y, 0);

        // console.log(amount);

        label.innerHTML = `
            <h2>Total Bill: $ ${amount}</h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `
    }
    else return;
};

TotalAmount();
