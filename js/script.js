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

/**
 * @returns json
 */
 function readWishlist() {
  const stringWishList = localStorage.getItem('WishList');
  return JSON.parse(stringWishList);
}

var footer = document.getElementById('footer')
footer.innerHTML =
`<br><button id="back-to-top" class="btn btn-secondary">Voltar ao topo</button>
<div class="bg-dark" id="footer-grid" style="color: white;">
  <div id="footer-grid-1">
    <br><h5 style="margin-left: 12%">Redes Sociais</h5><br>
    <ul>
      <li class="icons"><img src="../images/icons/instagram.png" alt=""><a href="" class="social">Instagram</a></li>
      <li class="icons"><img src="../images/icons/twitter.png" alt=""><a href="" class="social">Twitter</a></li>
      <li class="icons"><img src="../images/icons/facebook.png" alt=""><a href="" class="social">Facebook</a></li>
    </ul>
  </div>

  <div id="footer-grid-2">
    <br><h5 style="margin-left: 10%">Métodos de Pagamento</h5><br>
    <ul>
      <li class="icon"><img src="../images/icons/boleto.png" alt="">Boleto Bancário</li>
      <li class="icon"><img src="../images/icons/mastercard.png" alt="">MasterCard</li>
      <li class="icon"><img src="../images/icons/visa.png" alt="">Visa</li>
      <li class="icon"><img src="../images/icons/pix.png" alt="" width="50" height="50">Pix</li>
    </ul>
  </div>

  <div id="footer-grid-3">
    <br><h5 style="margin-left: 8%">Suporte ao Cliente</h5><br>
    <ul>
      <li class="icon"><img src="../images/icons/email.png" alt="">suporte@empireofgaming.com</li>
      <li class="icon"><img src="../images/icons/telefone.png" alt="">(83) 2561-8708</li>
    </ul>
  </div>

  <div id="footer-grid-4">
    <br><h5 style="margin-left: 11%">Políticas da Loja</h5><br>
    <ul>
      <li class="icons" style="margin-top:5%"><a href="" class="terms">Política de privacidade</a></li>
      <li class="icons"><a href="" class="terms">Termos e condições</a></li>
      <li class="icons"><a href="" class="terms">Política de troca e devolução</a></li>
      <li class="icons"><a href="" class="terms">Política de envio</a></li>
    </ul>
  </div>
</div>`

var btn = document.querySelector("#back-to-top");

btn.addEventListener("click", function () {
  window.scrollTo(0, 0);
});

var cart = readAll()

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

var wishlist = readWishlist()

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

var images = document.getElementsByClassName("product-images")
var product_image = document.getElementById("product-image")
for (let image of images) {
  image.addEventListener("click", function (event) {
    product_image.src = image.src
  })
}

const calculate_button = document.getElementById("calculate")

if (calculate_button != null) {
  const frete = document.getElementById("freight")
  const cep = document.getElementById("cep")
  calculate_button.onclick = function (e) {
    if (cep.value.length != 8) {
      frete.innerHTML = `<div class="alert alert-danger" role="alert">CEP incorreto!</div>`
      setTimeout(function() {
        frete.innerHTML = ""
      }, 3000)
    }
    else {
      let valor1 = Math.floor(Math.random() * 32)
      let valor2 = Math.floor(Math.random() * 32)
      if (valor1 == 0) {
        valor1 = 1
      }

      if (valor2 == 0) {
        valor2 = 1
      }

      if (valor1 == valor2) {
        valor2 += 1
      }

      if (valor1 > valor2) {
        frete.innerHTML = `Entrega entre ${valor2}-${valor1} dias após o envio`
      }
      else {
        frete.innerHTML = `Entrega entre ${valor1}-${valor2} dias após o envio`
      }
    }
  }
}

totalItens()
totalWishlist()

const buy_button = document.getElementById("buy-button")
const select_options = document.getElementById("amount")
const options = [...select_options.options]
const maxOption = parseInt(options[options.length - 1].value)

if (buy_button != null) {
  var product_count = 0

  buy_button.onclick = function (e) {
    let name = document.getElementById("name").innerText
    let price = document.getElementById("price").innerText
    let amount = document.getElementById("amount").value
    let installments = document.getElementById("installments").innerText
    let company = document.getElementById("company").innerText
    let item = { name: `${name}`, price: `${price}`, amount: `${amount}`, image: `${images[0].src}`, installments: `${installments}`, company: `${company}` }
    if (cart == null) {
      cart = []
    }

    for (let product of cart) {
      if (product.name == item.name) {
        let quantity = parseInt(product.amount) + parseInt(item.amount)

        if (item['amount'] != 0 && quantity <= maxOption) {
          product['amount'] = String(quantity)
          load(cart)
          totalItens()
          swal("PRODUTO ADICIONADO AO CARRINHO", "", "success")
        }

        product_count++

        if (quantity > maxOption) {
          swal("NÃO É POSSIVEL ADICIONAR ESSA QUANTIDADE", "", "error")
        }
      }
    }
    if (product_count == 0 && item['amount'] != 0) {
      cart.push(item)
      load(cart)
      totalItens()
      swal("PRODUTO ADICIONADO AO CARRINHO", "", "success")
    }
  }
}

// const cartImage = document.getElementById('cartImage');
// const totalItens1 = document.getElementById('totalItens1');

// totalItens1.addEventListener('mouseenter', function() {
//   cartImage.classList.add('hovered');
// });

// totalItens1.addEventListener('mouseleave', function() {
//   cartImage.classList.remove('hovered');
// });

export { readAll }