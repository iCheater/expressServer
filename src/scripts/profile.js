document.addEventListener('DOMContentLoaded', () => {
  console.log('profile page work')
})


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
      console.log (resServer)
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  console.log(data)
  xhr.open('PUT', '/api/user/'+ data.id)
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
      console.log (resServer)
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('PUT', '/api/address/'+ data.id)
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}




