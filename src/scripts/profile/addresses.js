document.addEventListener('click', () => {
  console.log('click')

})

function deleteAddress (ctx) {
  request({
    method: 'DELETE',
    url: ctx.dataset.url,
  })
}

function changeAddress (ctx) {
  const form = document.getElementById('address-form')
  console.log('form', form)
  form.style.display = 'flex'
  // form.style.display = 'flex'

  // form.hidden = !form.hidden
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
