document.addEventListener('DOMContentLoaded', () => {
  console.log('add product to cart.js')
})

// eslint-disable-next-line no-unused-vars
function reqForServer (btn) {
  const btnId = btn.dataset.id
  request(btnId)
}

function request (data) {
  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(JSON.parse(xhr.response))
      updateCartQuantity (JSON.parse(xhr.response))
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
  console.log('2: ', cartLength)
  cartLength.innerHTML = data.cartLength
  console.log('3: ', cartLength)
}
