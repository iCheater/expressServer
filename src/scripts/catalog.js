document.addEventListener('DOMContentLoaded', () => {
  console.log('catalog.js loaded')

})

async function addItemInFavorites (ctx) {
  const requestParams = {
    method: '',
    url: '',
    data: {
      product_id: ctx.dataset.id,
    },
  }

  if (ctx.classList.contains('selected')) {
    ctx.classList.remove('selected')
    requestParams.method = 'DELETE'
    requestParams.url = '/api/favorite/' + ctx.dataset.favorite
  } else {
    ctx.classList.add('selected')
    requestParams.method = 'POST'
    requestParams.url = '/api/favorite/'
  }
  const req = await request(requestParams)
  // write id to favorite item in html
  addFavoriteId(ctx, req)
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
    console.log('data', data)
    console.log('method', method)
    xhr.open(method, url)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify(data))
  })

}

function addFavoriteId (ctx, req) {
  ctx.dataset.favorite = req.id
}
