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
  console.log('inputEmailValue', inputEmail)
  inputEmail.addEventListener('input', () => {
    checkEmailInput()
  })
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
      console.log(resServer)
      avatarPaste(resServer)
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
  console.log('status', resServer.email.status)
  // if(resServer.email.status === 'user exists') {
  //   const newImg = document.createElement("img")
  //   newImg.id = 'input-img'
  //   newImg.src = resServer.avatar
  //   const tagAfterImg = document.getElementById("clear-input")
  //   const parentDiv = tagAfterImg.parentNode
  //   parentDiv.insertBefore(newImg, tagAfterImg)
  // } else if(resServer.email.status === 'user does not exist' && document.getElementById('input-img')) {
  //   document.getElementById('input-img').remove()
  // }

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
      if(document.getElementById('input-img')){
        document.getElementById('input-img').remove()
      }
      break
    }
    default: {
      console.log('wrong data')
    }
  }
}

