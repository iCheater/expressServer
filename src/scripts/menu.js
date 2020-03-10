window.onscroll = function () { myFunction() }

const navbar = document.getElementById('menu__sticky')

function myFunction () {
  if (window.pageYOffset > 90) {
    navbar.style.display = 'block'
  } else {
    navbar.style.display = 'none'
  }
}
