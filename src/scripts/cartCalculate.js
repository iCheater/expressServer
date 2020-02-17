document.addEventListener('DOMContentLoaded', () => {
  console.log('carCalculate.js loaded')
})

// function increaseValue (btn) {
//   const tableRow = btn.closest('tr')
//   const eltInput = tableRow.querySelector('input')
//   let eltVal = parseInt(eltInput.value)
//   eltVal++
//   eltInput.value = eltVal
//   const subtotal = tableRow.querySelector('.subtotal')
//   const price = tableRow.querySelector('.price').innerHTML
//   subtotal.innerHTML = eltVal * parseInt(price)
//   calcTotal()
// }

// function decreaseValue (btn) {
//   const tableRow = btn.closest('tr')
//   const eltInput = tableRow.querySelector('input')
//   let eltVal = parseInt(eltInput.value)
//   if (eltVal === 0) {
//     return
//   }
//   eltVal--
//   eltInput.value = eltVal
//   const subtotal = tableRow.querySelector('.subtotal')
//   const price = tableRow.querySelector('.price').innerHTML
//   subtotal.innerHTML = eltVal * parseInt(price)
//   calcTotal()
// }

// function calcTotal () {
//   const elemArr = document.getElementsByClassName('subtotal')
//   var sum = 0
//   for (let i = 0; i < elemArr.length; i++) {
//     const valueElem = parseInt(elemArr[i].innerHTML)
//     console.log(`valueElem ${i}: ${valueElem}`)
//     sum += valueElem
//   }
//   const sumTotal = document.getElementById('sumTotal')
//   sumTotal.innerHTML = sum
// }

function switchAllCheckbox (checkbox) {
  const checkboxArr = document.getElementsByClassName('form-check-input')
  const checkboxIdArr = {}
  for (let i = 0; i < checkboxArr.length; i++) {
    checkboxArr[i].checked = checkbox.checked === true
    checkboxIdArr[checkboxArr[i].dataset.id] = checkboxArr[i].checked
  }
  selectRequest(checkboxIdArr)
}

function selectRequest (data) {
  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      console.log(JSON.parse(xhr.response))
    } else {
      console.log('server not work')
    }
    // console.log('request', xhr.response)
  }
  xhr.open('POST', '/cart/select')
  xhr.setRequestHeader('Content-type', 'application/json')
  xhr.send(JSON.stringify(data))
}

// eslint-disable-next-line no-unused-vars
function removeProduct (btn) {
  if (!btn.classList.contains('wait')) {
    removeRequest(btn)
  }
  deactivateRemoveButton(btn)
}

function removeRequest (btn) {
  // eslint-disable-next-line no-undef
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      removeProductRow(btn)
    } else {
      activateRemoveButton(btn)
    }
    // console.log('request', e)
  }
  console.log()
  xhr.open(btn.dataset.method, btn.getAttribute('href'))
  xhr.send()
}

function deactivateRemoveButton (btn) {
  btn.classList.remove('text-danger')
  btn.classList.add('text-muted')
  btn.classList.add('wait')
  btn.innerHTML = 'deleting...'
  btn.disabled = true
}

function activateRemoveButton (btn) {
  btn.classList.remove('text-muted')
  btn.classList.remove('wait')
  btn.classList.add('text-danger')
  btn.innerHTML = 'delete'
  btn.disabled = false
}

function removeProductRow (btn) {
  const tr = btn.closest('tr')
  tr.parentNode.removeChild(tr)
}
