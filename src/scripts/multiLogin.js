document.addEventListener('DOMContentLoaded', () => {
  console.log('multilogin')
  const yandexLink = document.getElementById('yandexLink')
  yandexLink.addEventListener('click', request)
})



function request () {
 console.log('request')
}

function httpGetAsync (theUrl, callback) {
  var xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) { callback(xmlHttp.responseText) }
  }
  xmlHttp.open('GET', theUrl, true) // true for asynchronous
  xmlHttp.send(null)
}
