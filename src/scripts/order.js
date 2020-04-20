document.addEventListener('DOMContentLoaded', () => {
  console.log('order.js loaded')

  const arrShipping = document.getElementsByClassName('way__shipping')
  console.log('arrShipping', arrShipping)

  for(let i = 0; i < arrShipping.length; i++) {
    arrShipping[i].addEventListener('click', (event,test2) => {
      for (let i = 0; i < arrShipping.length; i++) {
        arrShipping[i].classList.remove('active-border')
      }
      console.log('click!!!!', event)
      event.target.closest('.way__shipping').classList.add('active-border')
    })
  }

  const parentContainer = document.getElementsByClassName('way__pay')
  const arrPayment = document.getElementsByClassName('payment-method')

  for(let i = 0; i < arrPayment.length; i++) {
    arrPayment[i].addEventListener('click', (event,test2) => {
      for (let i = 0; i < arrPayment.length; i++) {
        arrPayment[i].classList.remove('method-changed')
      }
      event.target.closest('.payment-method').classList.add('method-changed')
    })
  }

  const promocodeInput = document.getElementById('promocode')
  const promocodeBtn = document.getElementById('btn-promo')

  console.log('promocodeInput', promocodeInput)
  promocodeInput.addEventListener('input', evt => {
    promocodeInput.classList.add('active-border')
    promocodeBtn.disabled = false
    promocodeBtn.style.background = '#005bff'
  })
  promocodeBtn.addEventListener('click', evt => {
    evt.preventDefault()
    console.log('dfgv')
    const promocodeReceived = document.getElementById('promocodeReceived')
    const promocodeText = document.querySelector('.promo-text')

    promocodeText.style.display = 'block'
    promocodeReceived.innerHTML = promocodeInput.value
    requestPromocode ({ promocode : promocodeReceived.innerHTML})
    console.log('requestPromocode', promocodeReceived.innerHTML)
  })


})

function requestPromocode (data) {
  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(JSON.parse(xhr.response))
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('POST', '/order/promocode')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

