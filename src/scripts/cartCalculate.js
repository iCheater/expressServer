
document.addEventListener('DOMContentLoaded', () => {
  console.log('carCalculate.js loaded')

})

function increaseValue (btn) {
  const tableRow = btn.closest('tr')
  const eltInput = tableRow.querySelector('input')
  let eltVal = parseInt(eltInput.value)
  eltVal++
  eltInput.value = eltVal
  const subtotal = tableRow.querySelector('.subtotal')
  const price = tableRow.querySelector('.price').innerHTML
  subtotal.innerHTML = eltVal * parseInt(price)
  calcTotal()
}

function decreaseValue (btn) {
  const tableRow = btn.closest('tr')
  const eltInput = tableRow.querySelector('input')
  let eltVal = parseInt(eltInput.value)
  if (eltVal === 0) {
    return
  }
  eltVal--
  eltInput.value = eltVal
  const subtotal = tableRow.querySelector('.subtotal')
  const price = tableRow.querySelector('.price').innerHTML
  subtotal.innerHTML = eltVal * parseInt(price)
  calcTotal()
}

function calcTotal () {
  const elemArr = document.getElementsByClassName('subtotal')
  var sum = 0
  for (let i = 0; i < elemArr.length; i++) {
    const valueElem = parseInt(elemArr[i].innerHTML)
    console.log(`valueElem ${i}: ${valueElem}`)
    sum += valueElem
  }
  const sumTotal = document.getElementById('sumTotal')
  sumTotal.innerHTML = sum
}
