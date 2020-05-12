document.addEventListener('DOMContentLoaded', () => {
  console.log('order.js loaded')

  const arrShipping = document.getElementsByClassName('way__shipping')

  for (let i = 0; i < arrShipping.length; i++) {
    arrShipping[i].addEventListener('click', (event, test2) => {
      for (let i = 0; i < arrShipping.length; i++) {
        arrShipping[i].classList.remove('active-border')
      }
      // console.log('click!!!!', event)
      event.target.closest('.way__shipping').classList.add('active-border')
      wayShipping()
    })
  }

  // const parentContainer = document.getElementsByClassName('way__pay')
  const arrPayment = document.getElementsByClassName('payment-method')

  for (let i = 0; i < arrPayment.length; i++) {
    arrPayment[i].addEventListener('click', (event, test2) => {
      for (let i = 0; i < arrPayment.length; i++) {
        arrPayment[i].classList.remove('method-changed')
      }
      event.target.closest('.payment-method').classList.add('method-changed')
      wayPay()
    })
  }

  //promocode part
  // const promocodeInput = document.getElementById('promocode')
  // const promocodeBtn = document.getElementById('btn-promo')
  //
  // promocodeInput.addEventListener('input', evt => {
  //   promocodeInput.classList.add('active-border')
  //   promocodeBtn.disabled = false
  //   promocodeBtn.style.background = '#005bff'
  // })
  // promocodeBtn.addEventListener('click', evt => {
  //   evt.preventDefault()
  //   const promocodeReceived = document.getElementById('promocodeReceived')
  //   const promocodeText = document.querySelector('.promo-text')
  //
  //   promocodeText.style.display = 'block'
  //   promocodeReceived.innerHTML = promocodeInput.value
  //   requestPromocode({ promocode: promocodeReceived.innerHTML })
  // })

})

function requestPromocode (data) {
  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(JSON.parse(xhr.response))
      const resServer = JSON.parse(xhr.response)
      console.log('resServer', resServer)
      showPromocodeStatus(resServer)
      totalPromoDiscount(resServer)
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('POST', '/order/promocode')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

function totalPromoDiscount (resServer) {
  if (resServer.status === 'error') {
    console.log('status: error')
  }
  if (resServer.status === 'ok') {
    let totalSale = document.getElementById('sumSale')
    let totalWithSale = document.getElementById('sumTotal')
    let totalWithoutSale = document.getElementById('total')
    const totalShipping = document.getElementById('sumShipping')
    let promocodeSale = 0
    let discount = null
    if (resServer.promocode.discountPercent > 0) {
      promocodeSale = resServer.promocode.discountPercent / 100
      discount = Number(totalSale.innerHTML * promocodeSale)
    }
    if (resServer.promocode.discountCurrency > 0) {
      discount = Number(resServer.promocode.discountCurrency)
    }
    const sumDiscountInMoney = Number(totalSale.innerHTML) + discount
    totalSale.innerHTML = sumDiscountInMoney
    totalWithoutSale.innerHTML = Number(totalWithSale.innerHTML) + Number(totalShipping.innerHTML) - sumDiscountInMoney
  }
}

function showPromocodeStatus (resServer) {
  const promoStatusSpan = document.getElementById('promocodeStatus')
  const promocodeText = document.querySelector('.promo-text')

  if (resServer.status === 'error') {
    promocodeText.style.color = '#f91155'
    promoStatusSpan.innerHTML = 'не активен'
  }

  if (resServer.status === 'ok') {
    promocodeText.style.color = '#8dc23c'
    promoStatusSpan.innerHTML = 'активен'
  }
}

function addRecipient () {
  const addRecipientOrder = document.getElementById('add-recipient')
  const showBlock = document.getElementById('new-recipient')

  addRecipientOrder.addEventListener('click', e => {
    showBlock.classList.remove('displayNone')
    showBlock.classList.add('displayBlock')
  })
}

function showInputAddress () {
  const blockInput = document.getElementById('address-block')
  blockInput.style.display = 'flex'
}

function addNewAddress () {
  const addressShipping = document.getElementById('input-address').value
  requestAddress({ address: addressShipping })
}

function wayShipping () {
  const blockShipping = document.getElementsByClassName('active-border')
  console.log('blockShipping', blockShipping)
  let dataShipping = null
  for (let i = 0; i < blockShipping.length; i++) {
    dataShipping = blockShipping[i].dataset.shipping
    console.log('dataShipping', dataShipping)
  }
  requestWayShipping({ wayShipping: dataShipping })
}

function requestWayShipping (data) {
// eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(JSON.parse(xhr.response))
      const resServer = JSON.parse(xhr.response)
      console.log(resServer)
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('POST', '/order/wayShipping')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

function requestAddress (data) {
  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(JSON.parse(xhr.response))
      const resServer = JSON.parse(xhr.response)
      console.log(resServer.address)

      let valueInput = document.getElementById('input-address')
      valueInput.value = resServer.address

    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('POST', '/order/address')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

function cleanInput () {
  let inputBlock = document.getElementById('input-address')
  inputBlock.value = ''
  requestAddress({ address: inputBlock.value })
}

function wayPay () {
  const methodPay = document.getElementsByClassName('method-changed')
  console.log('methodPay', methodPay)

  let dataPay = null
  for (let i = 0; i < methodPay.length; i++) {
    dataPay = methodPay[i].dataset.pay
    console.log('dataPay', dataPay)
  }
  requestMethodPay({ methodPay: dataPay })
}

function requestMethodPay (data) {
// eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(JSON.parse(xhr.response))
      const resServer = JSON.parse(xhr.response)
      console.log(resServer)
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('POST', '/order/methodPay')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

function registerNewUser () {
  const name = document.getElementById('name').value
  const lastname = document.getElementById('lastname').value
  const phone = document.getElementById('phone').value
  const mail = document.getElementById('mail').value

  requestNewUser({
    newUser: {
      name: name,
      lastname: lastname,
      phone: phone,
      mail: mail,
    },
  })
}

function requestNewUser (data) {
// eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(JSON.parse(xhr.response))
      const resServer = JSON.parse(xhr.response)
      checkNameNewUser(resServer)
      checkLastnameNewUser(resServer)
      checkPhoneNewUser(resServer)
      checkEmailNewUser(resServer)
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('POST', '/order/newUser')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

function checkNameNewUser (resServer) {
  const nameInput = document.getElementById('name')
  if (resServer.name.status === 'error') {
    console.log('name error')
    nameInput.closest('.row').classList.remove('done-input')
    nameInput.closest('.row').classList.add('error-input')
  }
  if (resServer.name.status === 'ok') {
    nameInput.closest('.row').classList.remove('error-input')
    nameInput.closest('.row').classList.add('done-input')
  }
  console.log('name ok')
}

function checkLastnameNewUser (resServer) {
  const lastnameInput = document.getElementById('lastname')
  if (resServer.lastname.status === 'error') {
    console.log('name error')
    lastnameInput.closest('.row').classList.remove('done-input')
    lastnameInput.closest('.row').classList.add('error-input')
  }
  if (resServer.lastname.status === 'ok') {
    lastnameInput.closest('.row').classList.remove('error-input')
    lastnameInput.closest('.row').classList.add('done-input')
  }
}

function checkEmailNewUser (resServer) {
  const nearDone = document.getElementById('mail')

  if (resServer.mail.status === 'error') {
    console.log('Введите корректный e-mail')
    nearDone.closest('.row').classList.remove('done-input')
    nearDone.closest('.row').classList.add('error-input')
  }

  if (resServer.mail.status === 'ok') {
    console.log('Корректный e-mail')
    nearDone.closest('.row').classList.remove('error-input')
    nearDone.closest('.row').classList.add('done-input')
  }
}

function checkPhoneNewUser (resServer) {
  const nearDone = document.getElementById('phone')

  if (resServer.phone.status === 'error') {
    console.log('phone error')
    nearDone.closest('.row').classList.remove('done-input')
    nearDone.closest('.row').classList.add('error-input')
  }
  if (resServer.phone.status === 'ok') {
    console.log('phone ok')
    nearDone.closest('.row').classList.remove('error-input')
    nearDone.closest('.row').classList.add('done-input')
  }

}

function addDataRecipient () {
  const name = document.getElementById('recipient-name').value
  const lastname = document.getElementById('recipient-lastname').value
  const phone = document.getElementById('recipient-phone').value
  console.log(name, lastname, phone)
  requestDataRecipient({
    newRecipient: {
      name: name,
      lastname: lastname,
      phone: phone,
    },
  })

}

function requestDataRecipient (data) {
// eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(JSON.parse(xhr.response))
      const resServer = JSON.parse(xhr.response)
      checkDataRecipient (resServer)
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('POST', '/order/newRecipient')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

function checkDataRecipient (resServer) {
  console.log(resServer)
  const nameInput = document.getElementById('recipient-name')
  if (resServer.name.status === 'error') {
    console.log('name error')
    nameInput.closest('.row').classList.remove('done-input')
    nameInput.closest('.row').classList.add('error-input')
  }
  if (resServer.name.status === 'ok') {
    nameInput.closest('.row').classList.remove('error-input')
    nameInput.closest('.row').classList.add('done-input')
  }

  const lastnameInput = document.getElementById('recipient-lastname')
  if (resServer.lastname.status === 'error') {
    console.log('name error')
    lastnameInput.closest('.row').classList.remove('done-input')
    lastnameInput.closest('.row').classList.add('error-input')
  }
  if (resServer.lastname.status === 'ok') {
    lastnameInput.closest('.row').classList.remove('error-input')
    lastnameInput.closest('.row').classList.add('done-input')
  }

  const phoneInput = document.getElementById('recipient-phone')
  if (resServer.phone.status === 'error') {
    console.log('phone error')
    phoneInput.closest('.row').classList.remove('done-input')
    phoneInput.closest('.row').classList.add('error-input')
  }
  if (resServer.phone.status === 'ok') {
    console.log('phone ok')
    phoneInput.closest('.row').classList.remove('error-input')
    phoneInput.closest('.row').classList.add('done-input')
  }

}

function createOrder () {
  window.location.href = '/order/createOrder'
}
