document.addEventListener('DOMContentLoaded', () => {
  console.log('login page work')

  const btnSubmit = document.getElementById('btn-change')
  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('close event form')
    collectInputValue ()
  }, false)
})

function changeInputType (context) {
  const parentLink = context.parentNode
  const input = parentLink.querySelector('input')
  const inputData = input.dataset
  const inputId = document.getElementById('password_' + inputData.id)

  if (inputId.type === 'password') {
    inputId.type = 'text'
  } else {
    inputId.type = 'password'
  }
}

function collectInputValue () {
  const inputValueId1 = document.getElementById('password_1')
  const inputValueId2 = document.getElementById('password_2')
  console.log('1',inputValueId1.value)
  console.log('2',inputValueId2.value)
  requestNewPassword ({
    inputValueId1: inputValueId1.value,
    inputValueId2: inputValueId2.value,
  })
}

function requestNewPassword (data) {
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
  console.log('req', data)
  xhr.open('POST', '/resetpassword/newpassword')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}
