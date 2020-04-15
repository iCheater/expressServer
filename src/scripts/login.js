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
  document.getElementById('password').value = ''
  document.getElementById('phone').value = ''
}

function checkInputTel () {
  // let phoneString = document.getElementById('phone').value
  // let isWrongPhone = false
  //
  // if (phoneString[0] === '+' && phoneString[1] === '7') {
  //   phoneString = phoneString.substring(1)
  // }
  //
  // for (let i = 0; i < phoneString.length; i++) {
  //   const elem = parseInt(phoneString[i])
  //   if (!Number.isInteger(elem)) {
  //     isWrongPhone = true
  //     break
  //   }
  // }
  //
  // const errorInput = document.getElementById('auth-error')
  //
  // if (isWrongPhone) {
  //   errorInput.style.display = 'block'
  // } else {
  //   errorInput.style.display = 'none'
  // }

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
