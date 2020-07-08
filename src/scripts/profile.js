document.addEventListener('DOMContentLoaded', () => {
  console.log('profile page work')
})

//home profile
function changeData (data) {
  const block = (data.parentNode).parentNode
  const blockInfoChildren = block.querySelectorAll('.info')

  for (let i = 0; i < blockInfoChildren.length; i++) {
    let element = blockInfoChildren[i]
    replaceTag(element, 'input')
  }
  const link = block.querySelectorAll('.profile-edit')
  link[0].innerHTML = 'Сохранить'
  console.log('link', link)

  if(block.id === 'data-personal') {
    console.log('sdfasd', block)
    const lastInfo = document.getElementById('info-gender')
    lastInfo.remove()
    const lastChild = document.getElementById('row-gender')
    lastChild.style.display = 'flex'
  }
}

function replaceTag (element, input) {
  const newTag = document.createElement('input')
  element.parentElement.insertBefore(newTag, element)
  for (let i = 0, attrs = element.attributes, count = attrs.length; i < count; ++i) {
    const content = element.innerHTML
    newTag.setAttribute(attrs[i].name, attrs[i].value)
    newTag.value = content
  }
  let childNodes = element.childNodes
  while (childNodes.length > 0) {
    newTag.appendChild(childNodes[0])
  }
  element.parentElement.removeChild(element)
}

//edit
function collectData () {
  const formId = document.getElementById('user-info')
  const form = new FormData(formId)

  requestCollectData({
    id: form.get('id'),
    phone: form.get('phone'),
    email: form.get('email'),
    name: form.get('name'),
    surname: form.get('surname'),
    gender: form.get('gender'),
    infoAbout: form.get('textarea'),
  })
}

function requestCollectData (data) {
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
  console.log(data)
  xhr.open('PUT', '/api/user/' + data.id)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

function collectDataAddress () {
  const formId = document.getElementById('address-info')
  const form = new FormData(formId)
  requestCollectDataAddress({
    id: form.get('id'),
    address: form.get('address'),
    city: form.get('city'),
    country: form.get('country'),
    postcode: form.get('postcode'),
  })
}

function requestCollectDataAddress (data) {
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
  xhr.open('PUT', '/api/address/' + data.id)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}




