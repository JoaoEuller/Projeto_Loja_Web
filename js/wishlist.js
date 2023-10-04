import { suggested } from "./products.js";
/**
 * @param {*} newProducts
 */
function loadWishlist(newWishlist) {
    localStorage.setItem('WishList', JSON.stringify(newWishlist));
}
/**
 * @param {*} newProducts
 */
function load(newProducts) {
    localStorage.setItem('products', JSON.stringify(newProducts));
}

/**
 * @returns json
 */
function readWishlist() {
    const stringWishList = localStorage.getItem('WishList');
    return JSON.parse(stringWishList);
}
/**
 * @returns json
 */
function readAll() {
    const stringProducts = localStorage.getItem('products');
    return JSON.parse(stringProducts);
}

var cart = readAll()
if (cart == null) {
    cart = []
}

var wishlist = readWishlist()
if (wishlist == null) {
    wishlist = []
}

function totalItens() {
    let total_indicator1 = document.getElementById("totalItens1")
    let total_indicator2 = document.getElementById("totalItens2")
    let total_itens = 0
    if (cart != null && cart.length != 0) {
        for (let product of cart) {
            total_itens += parseInt(product["amount"])
        }
        if (String(total_itens).length == 1) {
            total_indicator1.innerText = total_itens
        }
        else {
            total_indicator2.innerText = total_itens
            total_indicator1.innerText = ''
        }
    }
}
function totalWishlist() {
    let total_indicator1 = document.getElementById("totalWishlist1")
    let total_indicator2 = document.getElementById("totalWishlist2")
    let total_itens = 0
    if (wishlist != null && wishlist.length != 0) {
      for (let product of wishlist) {
        total_itens += parseInt(product["amount"])
      }
      if (String(total_itens).length == 1) {
        total_indicator1.innerText = total_itens
      }
      else {
        total_indicator2.innerText = total_itens
        total_indicator1.innerText = ''
      }
    }
  }

const wishlist_button = document.getElementById("wishlist-button")

if (wishlist_button != null) {
    var wishlist_cont = 0

    wishlist_button.onclick = function (e) {
        let name = document.getElementById("name").innerText
        let price = document.getElementById("price").innerText
        let amount = 1
        let installments = document.getElementById("installments").innerText
        let company = document.getElementById("company").innerText
        let images = document.getElementsByClassName("product-images")
        let item = { name: `${name}`, price: `${price}`, amount: `${amount}`, image: `${images[0].src}`, installments: `${installments}`, company: `${company}` }

        for (let product of wishlist) {
            if (product['name'] == item['name']) {
                swal("ESSE PRODUTO JÁ ESTÁ NA SUA LISTA DE DESEJOS", "", "info")
                wishlist_cont++
            }
        }
        if (wishlist_cont == 0) {
            wishlist.push(item)
            loadWishlist(wishlist)
            swal("PRODUTO ADICIONADO A LISTA DE DESEJOS", "", "success")
            totalWishlist()
        }
        wishlist_cont = 0
    }
}

if (wishlist.length == 0) {
    let item = document.getElementById("cards-container")
    item.innerHTML = `
<div id="empty" class="card mb-3" style="border: none;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="./images/icons/empty.png" class="img-fluid rounded-start" alt="..." style="margin-left: 80%">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h4 class="card-title">Não há itens nesta lista de desejos.<br>Adicione os itens que você deseja comprar.</h4>
        </div>
      </div>
    </div>
</div>`
}
function wishlistItem(product, id) {
    let link
    for (let element of suggested) {
        if (element['name'] == product['name']) {
            link = element['link']
        }
    }

    let item =
        `<div class="card card-hover my-1 mx-1 py-1" style="width: 14.3rem;">
        <div class="remove-from-wishlist" id="${id}">
            <button type="button" class="btn-close" aria-label="Close" style="width: 15%; margin-left:90%; border: none;"></button>
        </div>
        <a href="${link}" style="text-decoration: none;">
            <img src="${product.image}" class="card-img-top" alt="..." style="display: block; margin: auto;">
        </a>
            <div class="card-body">
                <a href="${link}" style="text-decoration: none;color: black;">
                    <h5 class="product">${product.name}</h5>
                </a>
                <b>R$${product.price}</b>
            </div>
        <div class="add-cart" id="${product.name}">
            <button type="button" class="btn btn-warning" id="${product.name}" style="margin-left: 5%">Adicionar ao carrinho</button>
        </div>
    </div>`
    return item
}

const itens = document.getElementById("cards")
function wishlistItens() {
    let id = 0
    if (wishlist != null && wishlist != []) {
        for (let product of wishlist) {
            let item = wishlistItem(product, id)
            id++
            itens.insertAdjacentHTML("beforeend", item)
        }
    }
    id = 0
}
wishlistItens()

function refreshPage() {
    window.location.reload();
}

const add_cart_button = document.getElementsByClassName("add-cart")

for (let button of add_cart_button) {
    let cart_contains = 0
    button.onclick = function (e) {
        let item
        let id = button.id
        for (let element of wishlist) {
            if (element['name'] == id) {
                item = element

            }
        }

        for (let product of cart) {
            if (product['name'] == item['name']) {
                cart_contains = 1
            }
        }

        if (cart_contains == 0) {
            cart.push(item)
            load(cart)
            swal("PRODUTO ADICIONADO AO CARRINHO", "", "success")
            totalItens()

        }
        else {
            swal("ESSE PRODUTO JÁ ESTÁ NO SEU CARRINHO", "", "info")
        }
    }
    cart_contains = 0
}

const wishlist_remove = document.getElementsByClassName("remove-from-wishlist")
const wishlist_itens = document.getElementById("cards")
for (let button of wishlist_remove) {
    button.onclick = function (e) {
        let id = button.id
        wishlist.splice(id, 1)
        wishlist_itens.removeChild(button.parentNode)
        loadWishlist(wishlist)
        refreshPage()
    }
}