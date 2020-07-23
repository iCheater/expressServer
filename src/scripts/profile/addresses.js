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

function changeAddress (ctx) {
  const parent = ctx.parentNode.parentNode
  const formClass = parent.querySelector('.address-form')
  const form = new FormData(formClass)
  request({
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

// function createStrAddr (req) {
//   const parentItems = document.querySelector('.addresses_list')
//   const formCreateItems = document.querySelector('.new_address')
//
//   formCreateItems.insertAdjacentHTML(
//     'beforebegin',
//     '<div class="addresses_list-item" id="{{ address.id }}" data-id="{{ address.id }}">\n' +
//     '                <div class="addresses_item-inner">\n' +
//     '                    <button class="address-delete" data-url="/api/address/{{ address.id }}"\n' +
//     '                            onclick="deleteAddress (this)">\n' +
//     '                        <svg enable-background="new 0 0 32 32" id="Layer_1" version="1.1" viewBox="0 0 32 32"\n' +
//     '                             xml:space="preserve" xmlns="http://www.w3.org/2000/svg"\n' +
//     '                             xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
//     '                    <path d="M20.377,16.519l6.567-6.566c0.962-0.963,0.962-2.539,0-3.502l-0.876-0.875c-0.963-0.964-2.539-0.964-3.501,0  L16,12.142L9.433,5.575c-0.962-0.963-2.538-0.963-3.501,0L5.056,6.45c-0.962,0.963-0.962,2.539,0,3.502l6.566,6.566l-6.566,6.567  c-0.962,0.963-0.962,2.538,0,3.501l0.876,0.876c0.963,0.963,2.539,0.963,3.501,0L16,20.896l6.567,6.566  c0.962,0.963,2.538,0.963,3.501,0l0.876-0.876c0.962-0.963,0.962-2.538,0-3.501L20.377,16.519z"\n' +
//     '                          fill="#515151"/>\n' +
//     '                        </svg>\n' +
//     '                    </button>\n' +
//     '\n' +
//     '                      \n' +
//     '\n' +
//     '                    <div class="address">\n' +
//     '                        {{ address.country }}, {{ address.city }}, {{ address.address }}\n' +
//     '                    </div>\n' +
//     '\n' +
//     '                    <button class="address-change" onclick="openFormChangeAddress (this)">\n' +
//     '                        <svg class="btn_img-edit" enable-background="new 0 0 32 32" version="1.1" viewBox="0 0 32 32"\n' +
//     '                             xml:space="preserve" xmlns="http://www.w3.org/2000/svg"\n' +
//     '                             xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
//     '    <g>\n' +
//     '        <polyline fill="none" points="   649,137.999 675,137.999 675,155.999 661,155.999  " stroke="#FFFFFF"\n' +
//     '                  stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>\n' +
//     '        <polyline fill="none" points="   653,155.999 649,155.999 649,141.999  " stroke="#FFFFFF" stroke-linecap="round"\n' +
//     '                  stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>\n' +
//     '        <polyline fill="none" points="   661,156 653,162 653,156  " stroke="#FFFFFF" stroke-linecap="round"\n' +
//     '                  stroke-linejoin="round" stroke-miterlimit="10" stroke-width="2"/>\n' +
//     '    </g>\n' +
//     '                            <path d="M28.172,3.828c-0.964-0.964-2.186-1.575-3.533-1.767c-1.961-0.278-3.895,0.367-5.294,1.767  c-0.391,0.391-0.391,1.024,0,1.415c0.021,0.021,0.048,0.028,0.07,0.046c0.018,0.021,0.025,0.048,0.046,0.069l2.884,2.884  L7.449,23.138l-2.293-2.293L17.793,8.208c0.391-0.391,0.391-1.023,0-1.414s-1.023-0.391-1.414,0L3.037,20.136  c-0.001,0.001-0.002,0.001-0.003,0.002L2.292,20.88c-0.094,0.094-0.167,0.206-0.217,0.327C2.026,21.329,2,21.458,2,21.587V29  c0,0.553,0.448,1,1,1h7.414c0.265,0,0.52-0.105,0.707-0.293l17.051-17.051C30.605,10.222,30.605,6.262,28.172,3.828z M24.358,4.042  c0.914,0.13,1.744,0.545,2.399,1.2c1.409,1.41,1.606,3.567,0.614,5.199l-2.906-2.907l0,0l0,0l-2.916-2.916  C22.38,4.109,23.363,3.901,24.358,4.042z M4,28v-5.482l2.74,2.74c0.001,0.001,0.001,0.002,0.001,0.002s0.002,0.001,0.002,0.001  L9.482,28H4z M8.863,24.552L23.758,9.656l2.293,2.293L11.155,26.845L8.863,24.552z"/>\n' +
//     '                       </svg>\n' +
//     '\n' +
//     '                        <svg class="btn_img-arrow" enable-background="new 0 0 32 32" height="32px" version="1.1"\n' +
//     '                             viewBox="0 0 32 32" width="32px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"\n' +
//     '                             xmlns:xlink="http://www.w3.org/1999/xlink"><path\n' +
//     '                                    d="M18.221,7.206l9.585,9.585c0.879,0.879,0.879,2.317,0,3.195l-0.8,0.801c-0.877,0.878-2.316,0.878-3.194,0  l-7.315-7.315l-7.315,7.315c-0.878,0.878-2.317,0.878-3.194,0l-0.8-0.801c-0.879-0.878-0.879-2.316,0-3.195l9.587-9.585  c0.471-0.472,1.103-0.682,1.723-0.647C17.115,6.524,17.748,6.734,18.221,7.206z"\n' +
//     '                                    fill="#515151"/>\n' +
//     '                        </svg>\n' +
//     '                    </button>\n' +
//     '                </div>\n' +
//     '\n' +
//     '                <form class="address-form block">\n' +
//     '                    <div class="row">\n' +
//     '                        <label>Адрес</label>\n' +
//     '                        <input class="input-field input-address" id="address" type="text" name="address"\n' +
//     '                               placeholder="Улица, дом, корпус, квартира" value="{{ address.address }}">\n' +
//     '\n' +
//     '                    </div>\n' +
//     '                    <div class="row">\n' +
//     '                        <div class="row-cell">\n' +
//     '                            <label>Город</label>\n' +
//     '                            <input class="input-field" id="city" type="text" name="city" placeholder="Город"\n' +
//     '                                   value="{{ address.city }}">\n' +
//     '                        </div>\n' +
//     '\n' +
//     '                        <div class="row-cell">\n' +
//     '                            <label>Страна</label>\n' +
//     '                            <input class="input-field" id="country" type="text" name="country" placeholder="Страна"\n' +
//     '                                   value="{{ address.country }}">\n' +
//     '                        </div>\n' +
//     '\n' +
//     '                        <div class="row-cell">\n' +
//     '                            <label>Индекс</label>\n' +
//     '                            <input class="input-field" id="postcode" type="text" name="postcode" placeholder="Индекс"\n' +
//     '                                   value="{{ address.postcode }}">\n' +
//     '                        </div>\n' +
//     '                    </div>\n' +
//     '                    <button type="button" class="btn btn-info" data-url="/api/address/{{ address.id }}"\n' +
//     '                            onclick="changeAddress (this)">Сохранить изменения\n' +
//     '                    </button>\n' +
//     '                </form>\n' +
//     '            </div>')
//
//   const count = parentItems.children.length
//   const addrRow = formCreateItems.previousSibling
//
//   const addr = addrRow.querySelector('.address')
//   const test = req.country + ', ' + req.city + ', ' + req.address
//   addr.innerHTML = test
//
//   console.log('count', count)
//   console.log('addr', addrRow)
//   console.log('addr', addr)
//   console.log(parentItems)
// }

function createStrAddr (req) {
  const parentItems = document.querySelector('.addresses_list')
  const formCreateItems = document.querySelector('.new_address')
  const elem = document.querySelector('.addresses_list-item')
  const newElem = elem.cloneNode(true)
  parentItems.insertBefore(newElem, formCreateItems)

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
}
