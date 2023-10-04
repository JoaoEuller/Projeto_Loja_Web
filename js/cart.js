import { suggested } from "./products.js";
/**
 * @returns json
 */
function readAll() {
    const stringProducts = localStorage.getItem('products');
    return JSON.parse(stringProducts);
}

/**
 * @param {*} newProducts
 */
function load(newProducts) {
    localStorage.setItem('products', JSON.stringify(newProducts));
}

var products = readAll()

function totalPrice() {
    let total = [0, 0]
    if (products != null && products.length != 0) {
        for (let product of products) {
            let aux1 = parseInt(product['amount'])
            let aux2 = product['price']
            let aux3 = ""
            for (let caractere of aux2) {
                if (caractere != ".") {
                    aux3 += caractere
                }
            }

            total[0] += aux1
            total[1] += aux1 * parseInt(aux3)
        }
    }


    return total
}


function createProduct(product) {
    let item =
        `<li class="list-group-item">
        <button class="remove" id="${product.name}" style="float:right;">X</button><br>
        <div class="card mb-3 my-2 mx-2 py-2" style="max-width: 100%; border: none">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src=${product.image} class="img-fluid rounded-start"  alt="product image">
                </div>
                <div class="col-md-8">
                    <div class="card-body" >
                        <div class="description">
                            <div id="content">
                                <div id="content-left">
                                    <h5 style="display: inline;">${product.name}</h5>
                                    <b class="companies" style="display: block;">${product.company}</b>
                                    <br><div>
                                        <input type="checkbox" name="gift" class="gift">
                                        <p style="display: inline;">Embrulhar para presente</p>
                                    </div><br>
                                    <p><b>Qtd: ${product.amount}</b></p>
                                </div>
                                <div id="content-right">
                                    <p class="price" style="float: right;"><b>R$${product.price}</b></p><br>
                                    <div style="margin-left:40%; float:right">
                                        <p style="display: inline;"> Em até 10x de R$${product.installments}</p>
                                        <br><p style="display: inline; float: right;">sem juros</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>`
    return item
}

function suggestedProduct(suggested_product) {
    let link
    for (let element of suggested) {
        if (element['name'] == suggested_product['name']) {
            link = element['link']
        }

    }
    let item =
        `<div class="card-body">
        <div class="card card-hover mb-3" style="max-width: 540px; border:none">
            <div class="row g-0">
                <div class="col-md-4">
                    <a href="${link}">
                        <img src=${suggested_product.image} class="img-fluid rounded-start" alt="...">
                    </a>
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <a href="${link}" style="text-decoration: none; color: black">
                            <h5 class="product">${suggested_product.name}</h5>
                        </a>
                        <b class="companies">${suggested_product.company}</b>
                        <p><b class="card-text">R$${suggested_product.price}</b></p>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    return item
}

function initCard() {
    let totalValueFooter = document.getElementById("card-footer")
    let totalValueRight = document.getElementById("total")

    if (products != null) {
        for (let product of products) {
            if (product['amount'] != 0) {
                let products_list = document.getElementById("products-list")
                const item = createProduct(product);
                products_list.insertAdjacentHTML("beforeend", item)
            }
        }
    }

    let itens = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]
    while (true) {
        if (itens[0] != itens[1] && itens[1] != itens[2] && itens[2] != itens[0]) {
            break
        }
        else {
            itens = [Math.floor(Math.random() * 8), Math.floor(Math.random() * 8), Math.floor(Math.random() * 8)]
        }
    }
    for (let item of itens) {
        const product = suggestedProduct(suggested[item])
        const suggestion_card = document.getElementById("card-3")
        suggestion_card.insertAdjacentHTML("beforeend", product)
    }

    let total = totalPrice()

    total[1] = String(total[1])

    if (total[1].length == 4) {
        total[1] = `${total[1][0]}.${total[1].slice(1, 4)}`
    }
    else if (total[1].length == 5) {
        total[1] = `${total[1].slice(0, 2)}.${total[1].slice(2, 5)}`
    }
    else if (total[1].length == 6) {
        total[1] = `${total[1].slice(0, 3)}.${total[1].slice(3, 6)}`
    }

    if (products == null || products.length == 0) {
        totalValueFooter.innerHTML = `<h3>Seu carrinho está vazio!</h3>`
        totalValueRight.innerHTML = `Valor total (0 itens): <b>R$0</b>`
    }
    else if (total[0] == 1) {
        totalValueFooter.innerHTML = `<h5 style="float: right ;">Valor total (${total[0]} item): <b>R$${total[1]}</b></h5>`
        totalValueRight.innerHTML = `Valor total (${total[0]} item): <b>R$${total[1]}</b>`
    }
    else {
        totalValueFooter.innerHTML = `<h5 style="float: right ;">Valor total (${total[0]} itens): <b>R$${total[1]}</b></h5>`
        totalValueRight.innerHTML = `Valor total (${total[0]} itens): <b>R$${total[1]}</b>`
    }

}

initCard()

function refreshPage() {
    window.location.reload();
}

const buttons = document.getElementsByClassName("remove")
var products_cart = document.getElementById("products-list")
var product_index = 0

for (let button of buttons) {
    button.onclick = function (e) {
        let product_removed = button.id
        products_cart.removeChild(button.parentNode)
        for (let product of products) {
            if (product_removed == product["name"]) {
                products.splice(product_index, 1)
                load(products)
            }
            else {
                product_index++
            }
        }
        product_index = 0
        refreshPage()
    }
}