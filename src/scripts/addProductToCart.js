document.addEventListener('DOMContentLoaded', () => {
  console.log('add product to cart.js')
})

// eslint-disable-next-line no-unused-vars
function reqForServer (btn) {
  const btnId = btn.dataset.id
  request(btnId)
  changeTextBtn(btn)
}

function request (data) {
  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(JSON.parse(xhr.response))
      updateCartQuantity(JSON.parse(xhr.response))
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('PUT', '/cart/' + data)
  // xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send()
}

function updateCartQuantity (data) {
  const cartLength = document.getElementById('cartLength')
  cartLength.innerHTML = data.cartLength
}

function changeTextBtn (domObj) {
  const textLink = document.getElementById('btn' + domObj.dataset.id)
  console.log('textLink', textLink)
  textLink.innerHTML = '<div class="product-qty" data-th="Quantity">\n' +
    '<button class="btnMinus" data-id="{{ product.id }}" onclick="decreaseValue(this)">-</button>\n' +
    '<input type="number" data-id="{{ product.id }}" id="input{{ product.id }}"\n' +
    ' class="form-control text-center quantityProduct"\n' +
    ' value="{{ product.quantity }}" onchange="quantityInput(this)" min="0">\n' +
    '<button class="btnPlus" data-id="{{ product.id }}" onclick="increaseValue(this)">+</button>\n' +
    '                        </div>'
  textLink.style.backgroundColor = 'transparent'
  textLink.style.border = '1px solid #005bf8'
  textLink.style.color = '#005bf8'
}
