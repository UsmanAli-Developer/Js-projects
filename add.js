 let shop = document.querySelector(".all-product")
let totel = document.querySelector(".totel")

let list = JSON.parse(localStorage.getItem("cartList")) || [];

console.log(list)

async function show() {
    let url = await fetch('https://fakestoreapi.com/products')
    let res = await url.json();

    list.forEach((id) => {
        product = res.find((v) => v.id == id)

        if (product) {
            addtocard(product.image, product.price, product.title, product.id)
        }
    });
}

function addtocard(img, price, title, id) {
    let create = `<div class="h mb-3" id="remove-${id}" data-price="${price}"> 
   <input type="checkbox" class="product-checkbox" data-id="${id}" onchange="filterProducts()"> 
    <div class="d-flex align-items-center gap-3">
      <img src="${img}" class="size" style="width: 80px; height: 80px; object-fit: contain;">
      <h2 class="mt-2" style="font-size: 16px;">${title.slice(0, 30)}</h2>
    </div>
    <div class="d-flex justify-content-between align-items-center mt-2">
      <div class="ms-3 d-flex align-items-center gap-2">
        <button onclick="plus(this, ${price})">+</button>
        <p class="quantity mb-0">1</p>
        <button onclick="minus(this)">-</button>
      </div>
      <h5 class="text-danger fs-5 mb-0">$${price}</h5>
      <i class="fa-solid fa-trash text-danger fs-4 me-2" onclick="removeItem(${id}, this)"></i> 
    </div>
  </div>`;

    shop.innerHTML += create;
}

function plus(btn, productprice) {
    let quantityElem = btn.parentElement.querySelector(".quantity");
    let current = Number(quantityElem.innerText);
    quantityElem.innerText = current + 1;
    updateTotal();
}

function minus(btn) {
    let quantityElem = btn.parentElement.querySelector(".quantity");
    let current = Number(quantityElem.innerText);
    if (current > 1) {
        quantityElem.innerText = current - 1;
        updateTotal();
    }
}

function removeItem(id) {
    list = list.filter(val => Number(val) !== Number(id));
    let remove = document.querySelector(`#remove-${id}`);
    if (remove) {
        remove.remove();
        localStorage.setItem("cartList", JSON.stringify(list));

        filterProducts();
        updateTotal();
    }
}

function updateTotal() {
    let total = 0;
    let Checkboxes = document.querySelectorAll('.product-checkbox');

    document.querySelectorAll('.h').forEach(product => {
        let productId = product.id.replace('remove-', '');
        let isChecked = Array.from(Checkboxes).some(checkbox => checkbox.getAttribute('data-id') === productId && checkbox.checked);

        if (isChecked) {
            let quantity = Number(product.querySelector(".quantity").innerText);
            let price = Number(product.getAttribute("data-price"));
            total += quantity * price;
        }
    });

    totel.innerHTML = `Total Price: $${total.toFixed(2)}`;
}

function filterProducts() {
    updateTotal();
}

show();
