// $(() => {
//   var menuSticky = ('.menu__sticky')
//   var introH = ('.header').innerHeight()
//   var scrollOffset = (window).scrollTop()
//
//   /* Fixed header */
//
//   checkScroll(scrollOffset)
//
//   window.on('scroll', function () {
//     scrollOffset = (this).scrollTop()
//
//     checkScroll(scrollOffset)
//   })
//
//   function checkScroll (scrollOffset) {
//     if (scrollOffset >= introH) {
//       menuSticky.addClass('sticky__active')
//     } else {
//       menuSticky.removeClass('sticky__active')
//     }
//   }
// })

window.onscroll = function () { myFunction() }

const navbar = document.getElementById('menu__sticky')

function myFunction () {
  if (window.pageYOffset > 90) {
    navbar.style.display = 'block'
  } else {
    navbar.style.display = 'none'
  }
}

// var h_hght = 100
// var h_mrg = 0
//
// if(h_hght){
//   const sticky = document.getElementById('menu__sticky')
//
//   console.log(sticky)
//   sticky.style.display = 'flex'
//   sticky.style.justifyContent = 'space-between'
//   sticky.style.width = 'inherit'
//
//   sticky.style.backgroundColor = '#f8f8f8'
//   console.log(sticky)
// }
