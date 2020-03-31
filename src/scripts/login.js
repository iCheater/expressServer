document.addEventListener('DOMContentLoaded', () => {
  console.log('login page work')

  const arrBtn = document.getElementsByClassName('sidebar_list-row')
  const arrForms = document.getElementsByClassName('customForm')
  console.log('arrBtn', arrBtn)
  for (let i = 0; i < arrBtn.length; i++) {

    arrBtn[i].addEventListener('click', (event, test2) => {
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

function socialAuth () {
  // const classFind = document.getElementById('social-auth').closest('.sidebar_list-row')
  // const addClass = classFind.classList.add('row-active')
  //
  // console.log('addClass', addClass)
  // const contentSocialAuth = document.querySelector('.form-content_social')
  // const changeDisplay = contentSocialAuth.classList.add('active-content')
  // console.log('changeDisplay', changeDisplay)

  const display = document.querySelector('.form-content_social').classList.contains('inactive-content')
  console.log('display', display)

  if (display === true) {
    document.getElementsByClassName('form-content_social').classList.add('active-content')
  } else {
    document.getElementsByClassName('form-content_social').classList.remove('inactive-content')
  }
}

function phoneAuth () {
  // const classFind = document.getElementById('phone-auth').closest('.sidebar_list-row')
  // const addClass = classFind.classList.add('row-active')
  //
  // console.log('addClass', addClass)
  // const contentSocialAuth = document.querySelector('.form-content_phone')
  // const changeDisplay = contentSocialAuth.classList.add('active-content')
  // console.log('changeDisplay', changeDisplay)
}
//
// function mailAuth () {
//   const classFind = document.getElementById('mail-auth').closest('.sidebar_list-row')
//   const addClass = classFind.classList.add('row-active')
//
//   console.log('addClass', addClass)
//   const contentSocialAuth = document.querySelector('.form-content_email')
//   const changeDisplay = contentSocialAuth.classList.add('active-content')
//   console.log('changeDisplay', changeDisplay)
// }
//
// function fastAuth () {
//   const classFind = document.getElementById('fast-auth').closest('.sidebar_list-row')
//   const addClass = classFind.classList.add('row-active')
//
//   console.log('addClass', addClass)
//   const contentSocialAuth = document.querySelector('.form-content_fast-auth')
//   const changeDisplay = contentSocialAuth.classList.add('active-content')
//   console.log('changeDisplay', changeDisplay)
// }

// function selectAuthType () {
// смена цвета при click

// }

// const elems  = find all elems by class
// elems -> elem.on('hover', functiton(())
