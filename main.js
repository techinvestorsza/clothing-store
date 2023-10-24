let shop = document.getElementById("shop");

let shopItemsData = [
    {
        id: 'asijfiasfnsifsih',
        name: "Casual Shirt",
        price: 45,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
        img: "images/long-sleeve-shirt.png"
    },
    {
        id: 'dfiushfuiwnssfs',
        name: "office Shirt",
        price: 100,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
        img: "images/two-shirts-with-tie.png"
    },
    {
        id: 'afuiahsoufiasnsis',
        name: "T Shirt",
        price: 25,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
        img: "images/white-t-shirt.png"
    },
    {
        id: 'sfiishaofieeusihbv',
        name: "Mens Suit",
        price: 300,
        desc: "Lorem ipsum dolor, sit amet consectetur adipisicing.",
        img: "images/suit-with-tie-t-shirt.png"
    }
];

let basket = [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((item) => {
        let {id, name, price, desc, img } = item;
        return `
        <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="Long sleeve shirt">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <a onclick="decrement(${id})" class="bi bi-dash-lg">
                        <img src="images/icons/minus_btn.png" alt="minus button">
                    </a>
                    <div id=${id} class="quanity">0</div>
                    <a onclick="increment(${id})" class="bi  bi-plus-lg">
                        <img src="images/icons/plust_btn.png" alt="plus button">
                    </a>
                </div>
            </div>
        </div>
        </div>
        `
    }).join(""));
}

generateShop();

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

    console.log(basket);
};

let decrement = (id) => {
    let seletedItem = id;
    console.log(seletedItem.id);
};
let update = () => {};
