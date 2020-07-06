document.addEventListener('DOMContentLoaded', () => {
  console.log('profile page work')
})


//edit
function collectData () {
  const phone = document.getElementById('phone').value

  const email = document.getElementById('email').value

  const name = document.getElementById('name').value

  const surname = document.getElementById('surname').value

  const address = document.getElementById('address').value

  const city = document.getElementById('city').value

  const country = document.getElementById('country').value

  const postcode = document.getElementById('postcode').value

  const textarea = document.getElementById('textarea').value

  requestCollectData({
    phone:phone,
    email: email,
    name:name,
    surname:surname,
    address: address,
    city:city,
    country: country,
    postcode: postcode,
    infoAbout: textarea,
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
  console.log('data', data)
  xhr.open('POST', '/profile/edit/')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}




