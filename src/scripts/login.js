document.addEventListener('DOMContentLoaded', () => {
  console.log('login page work')

  const arrBtn = document.getElementsByClassName('sidebar_list-row')
  const arrForms = document.getElementsByClassName('customForm')
  console.log('arrBtn', arrBtn)
  const eventName = 'mouseover' // mouseover || click

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

