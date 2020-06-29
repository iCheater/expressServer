document.addEventListener('DOMContentLoaded', () => {
  console.log('login page work')

  const arrBtn = document.getElementsByClassName('sidebar_list-row')
  const arrForms = document.getElementsByClassName('customForm')
  const eventName = 'click' // mouseover || click

  for (let i = 0; i < arrBtn.length; i++) {
    arrBtn[i].addEventListener(eventName, (event, test2) => {
      for (let i = 0; i < arrBtn.length; i++) {
        arrBtn[i].classList.remove('row-active')
      }

      for (let i = 0; i < arrForms.length; i++) {
        arrForms[i].classList.remove('active-content')
        arrForms[i].classList.add('inactive-content')
      }

      event.target.classList.add('row-active')
      const id = event.target.dataset.contentId
      document.getElementById(id).classList.add('active-content')
      document.getElementById(id).classList.remove('inactive-content')
    })
  }

  const inputEmail = document.getElementById('email')
  inputEmail.addEventListener('input', () => {
    checkEmailInput()
  })

  const btnSubmit = document.getElementById('btn-reset')
  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('close event form')
  }, false)

  changeActionForm ()
})

function changeInputType () {
  const password = document.getElementById('password')
  if (password.type === 'password') {
    password.type = 'text'
  } else {
    password.type = 'password'
  }
}

function cleanInput () {
  document.getElementById('email').value = ''
  document.getElementById('input-img').hidden = true
  document.getElementById('password').value = ''
}

function checkInputTel () {
  let phoneString = document.getElementById('phone').value

  if (phoneString[0] === '+' && phoneString[1] === '7') {
    phoneString = phoneString.substring(1)
  }

  const errorInput = document.getElementById('auth-error')

  if (isNaN(phoneString) === true) {
    errorInput.style.display = 'block'
  } else {
    errorInput.style.display = 'none'
  }

  if (phoneString.length > 11) {
    const errorInputLenght = document.getElementById('length-error')
    errorInputLenght.style.display = 'block'
  }
}

function enterProfile () {
  console.log('test')
  // window.location.href = '/profile'
}

function checkEmailInput () {
  const email = document.getElementById('email').value
  requestEmailInput({ email: email })
}

function requestEmailInput (data) {
// eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(JSON.parse(xhr.response))
      const resServer = JSON.parse(xhr.response)
      avatarPaste(resServer)
      btnChange(resServer)
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('POST', '/login/email')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

function avatarPaste (resServer) {
  switch (resServer.email.status) {
    case 'user exists': {
      const newImg = document.createElement('img')
      newImg.id = 'input-img'
      newImg.src = resServer.avatar
      const tagAfterImg = document.getElementById('clear-input')
      const parentDiv = tagAfterImg.parentNode
      parentDiv.insertBefore(newImg, tagAfterImg)
      break
    }
    case 'user does not exist': {
      if (document.getElementById('input-img')) {
        document.getElementById('input-img').remove()
      }
      break
    }
    default: {
      console.log('wrong data')
    }
  }
}

function btnChange (resServer) {
  const btnForm = document.getElementById('btn-auth')
  const linkReset = document.getElementById('link-reset')
  switch (resServer.email.status) {
    case 'user exists': {
      // btnForm.style.backgroundColor = '#005bff'

      btnForm.value = 'Войти'
      btnForm.classList.remove('btn-register')
      btnForm.classList.add('btn-enter')
      linkReset.style.display = 'block'
      break
    }
    case 'user does not exist': {
      btnForm.value = 'Зарегистрироваться'
      btnForm.classList.remove('btn-enter')
      btnForm.classList.add('btn-register')
      linkReset.style.display = 'none'
      break
    }
    default: {
      console.log('wrong data')
    }
  }
}

function changeActionForm () {
  const btnSubmit = document.getElementById('btn-auth')
  btnSubmit.addEventListener('click', (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    requestAuthStatusForm ({email: email, password: password})
    // console.log('close event')
  }, false)
}

function requestAuthStatusForm (data) {
// eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(JSON.parse(xhr.response))
      const resServer = JSON.parse(xhr.response)
      showMsg (resServer)
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  console.log('data', data)
  xhr.open('POST', '/auth/localauth')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

function showMsg (resServer) {
  console.log('resServer', resServer)
  const inputPassword = document.getElementById('password')
  const msg = document.getElementById('auth-msg')
  switch (resServer.status) {
    case 'success': {
      inputPassword.style.border = "1px solid #3ac267"
      // inputEmail.classList.add('success')
      // inputPassword.classList.add("success")
      console.log('1')
      // timer
      setTimeout(
        () => {
          console.log('Hello after 2 seconds')
          window.location.href = '/'
        },
        2 * 1000
      )
      break
    }
    case 'fail': {
      inputPassword.style.border = "1px solid #f91155"
      msg.style.display = 'block'
      // inputEmail.classList.add('fail')
      // inputPassword.classList.add("fail")
      console.log('2')
      break
    }
    default: {
      console.log('wrong data')
    }
  }
}

function openFormResetPassword () {
  const formBlock = document.getElementById('form-content_email')
  formBlock.classList.remove('active-content')
  formBlock.classList.add('inactive-content')

  const formReset = document.getElementById('form-reset')
  formReset.classList.remove('inactive-content')
  formReset.classList.add('active-content')
}

function resetPassword () {
  console.log('zapusheno')
  const email = document.getElementById('email-reset').value
  requestResetPassword ({email: email, status: 'reset'})

  const btnReset = document.getElementById('btn-reset')
  // btnReset.addEventListener('click', (e) => {
    const formReset = document.getElementById('form-reset')
    formReset.classList.remove('active-content')
    formReset.classList.add('inactive-content')

    const msgReset = document.getElementById('msg-reset')
    msgReset.classList.remove('inactive-content')
    msgReset.classList.add('active-content')
  // })
}

function requestResetPassword (data) {
// eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      // console.log(JSON.parse(xhr.response))
      const resServer = JSON.parse(xhr.response)
      showMsgReset(resServer)
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  console.log('req', data)
  xhr.open('POST', '/resetpassword/forgot')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

function showMsgReset (resServer) {
  console.log('resServer reset', resServer)
}
