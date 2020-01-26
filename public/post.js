
function loadDoc () {
  const elements = document.getElementById('myForm').elements
  const obj = {}
  for (let i = 0; i < elements.length; i++) {
    let item = elements.item(i)
    obj[item.name] = item.value
  }
  console.log(obj)

  const xhr = new XMLHttpRequest()
  xhr.open('POST', '/admin/goods/add', true)
  xhr.setRequestHeader('Content-type', 'application/json')

  xhr.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log('server responsed:', this.responseText)
    }
  }

  xhr.send(JSON.stringify(obj))
}
