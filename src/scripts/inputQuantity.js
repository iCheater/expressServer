
// eslint-disable-next-line no-unused-vars
function decreaseValue (id) {
  const input = document.getElementById('input' + id)
  if (input.value > 0) {
    input.value--
  }
  const obj = {}
  obj[id] = parseInt(input.value)
  productQantityRequest(obj)
}

// eslint-disable-next-line no-unused-vars
function increaseValue (id) {
  const input = document.getElementById('input' + id)
  const obj = {}
  obj[id] = parseInt(++input.value)
  productQantityRequest(obj)
}

// eslint-disable-next-line no-unused-vars
function quantityInput (id) {
  let value = parseInt(document.getElementById('input' + id).value)
  if (value < 0 || !Number.isInteger(value)) {
    // eslint-disable-next-line no-undef
    alert('Ошибка ввода!')
    document.getElementById('input' + id).value = 0
    value = 0
  }
  const obj = {}
  obj[id] = value
  productQantityRequest(obj)
}
function productQantityRequest (data) {
  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // unblock buttons until good request
    }
    // console.log('request', e)
  }

  xhr.open('POST', '/cart/quantity')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}
