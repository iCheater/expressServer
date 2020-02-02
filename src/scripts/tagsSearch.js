document.addEventListener('DOMContentLoaded', () => {
  console.log('sdvgs')
  // const form = document.querySelector('#formElem')
  const form = document.getElementById('search')
  form.addEventListener('input', (e) => {
    console.log(form.value)
    request(form.value)
  })
})

function request (arg) {
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(JSON.parse(xhr.response))
      createTable(JSON.parse(xhr.response))
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('POST', '/admin/tags/search')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify({ value: arg }))
}

function createTable (obj) {
  // создай тут элементы
  const table = document.getElementById('tagsTable')
  const tBody = table.lastChild

  table.removeChild(tBody)

  const newtBody = document.createElement('tbody')
  for (const i in obj) {
    const tag = obj[i]
    const tr = document.createElement('tr')

    for (const prop in tag) {
      const td = document.createElement('td')
      td.innerHTML = tag[prop]
      td.className = 'tableTd'
      tr.appendChild(td)
      newtBody.appendChild(tr)
      table.appendChild(newtBody)
    }

    const td = document.createElement('td')
    const aElem = document.createElement('a')
    aElem.innerHTML = 'delete'
    aElem.className = 'text-danger deleteBtn'
    aElem.href = `/admin/tags/${tag.id}`
    td.appendChild(aElem)
    tr.appendChild(td)
  }

  console.log(newtBody)
}
