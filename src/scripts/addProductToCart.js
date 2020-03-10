document.addEventListener('DOMContentLoaded', () => {
  console.log('add product to cart.js')
})

// eslint-disable-next-line no-unused-vars
function requestAndElemSwap (id) {
  request(id)
}

function request (id) {
  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      const response = JSON.parse(xhr.response)
      console.log(response)
      updateCartQuantity(response)
      changeTextBtn(id)
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('PUT', '/cart/' + id)
  // xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send()
}

function updateCartQuantity (data) {
  const cartLength = document.getElementById('cartLength')
  cartLength.innerHTML = data.cartLength
}

function changeTextBtn (id) {
  const productQty = document.createElement('div')
  productQty.setAttribute('class', 'product-qty')

  const btnMinus = document.createElement('button')
  const btnMinusContent = document.createTextNode('-')
  btnMinus.appendChild(btnMinusContent)
  btnMinus.setAttribute('class', 'btnMinus')
  btnMinus.onclick = function () {
    decreaseValue(id)
  }

  const btnPlus = document.createElement('button')
  const btnPlusContent = document.createTextNode('+')
  btnPlus.setAttribute('class', 'btnPlus')
  btnPlus.onclick = function () {
    increaseValue(id)
  }
  btnPlus.appendChild(btnPlusContent)

  const inputQty = document.createElement('input')
  inputQty.setAttribute('class', 'quantityProduct')
  inputQty.id = 'input' + id
  inputQty.type = 'number'
  inputQty.value = '1'
  inputQty.min = '0'
  inputQty.onchange = function () {
    quantityInput(id)
  }
  productQty.appendChild(btnMinus)
  productQty.appendChild(inputQty)
  productQty.appendChild(btnPlus)
  const btn = document.getElementById('btn' + id)
  btn.parentNode.replaceChild(productQty, btn)
}
