document.addEventListener('DOMContentLoaded', () => {
  console.log('order.js loaded')

  const arrShipping = document.getElementsByClassName('way__shipping')
  console.log('arrShipping', arrShipping)

  for(let i = 0; i < arrShipping.length; i++) {
    arrShipping[i].addEventListener('click', (event,test2) => {
      for (let i = 0; i < arrShipping.length; i++) {
        arrShipping[i].classList.remove('active-border')
      }
      console.log('click!!!!', event)
      event.target.closest('.way__shipping').classList.add('active-border')
    })
  }
})
