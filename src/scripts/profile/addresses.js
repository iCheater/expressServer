document.addEventListener('DOMContentLoaded', () => {
  console.log('it work')
  // const btn =
})
function deleteAddress (ctx) {
  request({
    method: 'DELETE',
    url: ctx.dataset.url,
  })
}

function deleteStrAddress (resServer) {
  if(resServer === 'ok') {
    console.log('sldjjs')
  }
}

function openFormChangeAddress (ctx) {
  const parent = ctx.parentNode.parentNode
  const form = parent.querySelector('.address-form')
  hiddenOrOpenForm (parent, form)
}

function changeAddress (ctx) {
  const parent = ctx.parentNode.parentNode
  const formClass = parent.querySelector('.address-form')
  const form = new FormData(formClass)
  request ({
    method: 'PUT',
    url: ctx.dataset.url,
    data: {
    id: form.get('id'),
    address: form.get('address'),
    city: form.get('city'),
    country: form.get('country'),
    postcode: form.get('postcode'),
    }
  })
  hiddenOrOpenForm (parent,formClass)
}

function hiddenOrOpenForm (parent, form) {
  const imgEdit = parent.querySelector('.btn_img-edit')
  const imgArrow = parent.querySelector('.btn_img-arrow')
  if(form.classList.contains("show-block")) {
    form.classList.remove("show-block")
    form.classList.add("block")
    imgArrow.style.display = 'none'
    imgEdit.style.display ='block'
  } else {
    imgEdit.style.display ='none'
    imgArrow.style.display ='block'
    form.classList.remove("block")
    form.classList.add("show-block")
  }
}

function request ({ method, url, data = {} }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function (e) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const resServer = JSON.parse(xhr.response)
        resolve(resServer)
        console.log(resServer)
      } else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText,
        })
      }
    }
    xhr.onerror = () => {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      })
    }
    console.log('url', url)
    xhr.open(method, url)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify(data))
  })
}

function addNewAddress (ctx) {
  const parent = ctx.parentNode
  const form = parent.querySelector('.address-form')
  const btn = document.getElementById('new-address')
  const span = btn.querySelector('span')
  showOrHideForm (form, span)
}

function showOrHideForm (form,span) {
  const imgAdd = document.getElementById('img-add')
  const imgArrow = document.getElementById('img-arrow')
  if(form.classList.contains("show-block")) {
    form.classList.remove("show-block")
    form.classList.add("block")
    span.innerText = 'Добавить новый адрес'

    imgArrow.classList.remove("show-block")
    imgArrow.classList.add("block")
    imgAdd.classList.remove("block")
    imgAdd.classList.add("show-block")
  } else {
    form.classList.remove("block")
    form.classList.add("show-block")
    span.innerText = 'Свернуть'

    imgAdd.classList.remove("show-block")
    imgAdd.classList.add("block")
    imgArrow.classList.remove("block")
    imgArrow.classList.add("show-block")
  }
}

function createNewAddress (ctx) {
  const parent = ctx.parentNode.parentNode
  const formClass = parent.querySelector('.address-form')
  const form = new FormData(formClass)
  request ({
    method: 'POST',
    url: ctx.dataset.url,
    data: {
      user_id: ctx.dataset.id,
      id: form.get('id'),
      address: form.get('address'),
      city: form.get('city'),
      country: form.get('country'),
      postcode: form.get('postcode'),
    }
  })
}
