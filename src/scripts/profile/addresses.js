document.addEventListener('DOMContentLoaded', () => {
  console.log('it work')
})

async function deleteAddress (ctx) {
  const addrId = (ctx.parentNode.parentNode).dataset.id
  const req = await request({
    method: 'DELETE',
    url: ctx.dataset.url,
  })
  deleteStrAddress(req, addrId)
}

function deleteStrAddress (req, addrId) {
  if (req === 'ok') {
    const str = document.getElementById(addrId)
    str.remove()
  }
}

function openFormChangeAddress (ctx) {
  const parent = ctx.parentNode.parentNode
  const form = parent.querySelector('.address-form')
  hiddenOrOpenForm(parent, form)
}

async function changeAddress (ctx) {
  const parent = ctx.parentNode.parentNode
  const formClass = parent.querySelector('.address-form')

  console.log('formClass23',formClass)
  const form = new FormData(formClass)
  const req = await request({
    method: 'PUT',
    url: ctx.dataset.url,
    data: {
      id: form.get('id'),
      address: form.get('address'),
      city: form.get('city'),
      country: form.get('country'),
      postcode: form.get('postcode'),
    },
  })
  hiddenOrOpenForm(parent, formClass)
  changeStrAddr (parent,req)
}

function changeStrAddr (parent,req){
  const addr = parent.querySelector('.address')
  addr.innerHTML = req.country + ', ' + req.city + ', ' + req.address
}

function hiddenOrOpenForm (parent, form) {
  const imgEdit = parent.querySelector('.btn_img-edit')
  const imgArrow = parent.querySelector('.btn_img-arrow')
  if (form.classList.contains('show-block')) {
    form.classList.remove('show-block')
    form.classList.add('block')
    imgArrow.style.display = 'none'
    imgEdit.style.display = 'block'
  } else {
    imgEdit.style.display = 'none'
    imgArrow.style.display = 'block'
    form.classList.remove('block')
    form.classList.add('show-block')
  }
}

function request ({ method, url, data = {} }) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function (e) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const resServer = JSON.parse(xhr.response)
        resolve(resServer)
        console.log('resServer', resServer)
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
  showOrHideForm(form)
}

function showOrHideForm (form) {
  const btn = document.getElementById('new-address')
  const span = btn.querySelector('span')

  const imgAdd = document.getElementById('img-add')
  const imgArrow = document.getElementById('img-arrow')
  if (form.classList.contains('show-block')) {
    form.classList.remove('show-block')
    form.classList.add('block')
    span.innerText = 'Добавить новый адрес'

    imgArrow.classList.remove('show-block')
    imgArrow.classList.add('block')
    imgAdd.classList.remove('block')
    imgAdd.classList.add('show-block')
  } else {
    form.classList.remove('block')
    form.classList.add('show-block')
    span.innerText = 'Свернуть'

    imgAdd.classList.remove('show-block')
    imgAdd.classList.add('block')
    imgArrow.classList.remove('block')
    imgArrow.classList.add('show-block')
  }
}

async function createNewAddress (ctx) {
  const parent = ctx.parentNode.parentNode
  const formClass = parent.querySelector('.address-form')
  const form = new FormData(formClass)

  const req = await request({
    method: 'POST',
    url: ctx.dataset.url,
    data: {
      user_id: ctx.dataset.id,
      id: form.get('id'),
      address: form.get('address'),
      city: form.get('city'),
      country: form.get('country'),
      postcode: form.get('postcode'),
    },
  })
  createStrAddr(req)
}

function createStrAddr (req) {
  const parentItems = document.querySelector('.addresses_list')
  const formCreateItems = document.querySelector('.new_address')
  const elem = document.querySelector('.hidden')
  const newElem = elem.cloneNode(true)
  parentItems.insertBefore(newElem, formCreateItems)
  // newElem.style.display = 'block'
  newElem.classList.remove('hidden')
  newElem.classList.add('unhidden')

  const addrRow = formCreateItems.previousSibling
  const addr = addrRow.querySelector('.address')
  addr.innerHTML = req.country + ', ' + req.city + ', ' + req.address

  //функция заполнения полей по вводу
  changeCloneRowVal (req, addrRow)
  const form = formCreateItems.querySelector('#add_new')
  showOrHideForm(form)
  form.reset()
}

// найти скрытую форму по ID
// найти элемент, над которым вставляем
// повесить событие "после успешного сохранения бд записать данные в addresses_item-inner и в форму"

function changeCloneRowVal (req, addrRow) {
  const inputs = addrRow.querySelectorAll('input')
  for(let i = 0; i < inputs.length; i++) {
    const idInput = inputs[i].id
    const inp = addrRow.querySelector('#' + idInput)
    inp.value = req[idInput]
  }
  console.log(
    'req', req,
    'addrRow', addrRow
  )
  addrRow.dataset.id = req.id
  addrRow.id = req.id

  changeUrlBtnClonedRow (addrRow,req)
  // changeAddressClonedRow (addrRow,req)
}

function changeUrlBtnClonedRow (addrRow,req) {
  const btnSaveChanges = addrRow.querySelector('.btn-info')
  btnSaveChanges.dataset.url = "/api/address/" + req.id
  const btnDelete = addrRow.querySelector('.address-delete')
  btnDelete.dataset.url = "/api/address/" + req.id
}

