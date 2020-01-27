console.log('delete from src!!!')

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded')

  document.querySelectorAll('.deleteBtn').forEach(item => {
    item.addEventListener('click', event => {
      event.preventDefault()
      if (!item.classList.contains('wait')) { request(item) }
      deactivateButton(item)
    })
  })
})

function request (item) {
  const xhr = new XMLHttpRequest()
  xhr.onload = function (e) {
    if (xhr.status >= 200 && xhr.status < 300) {
      removeButton(item)
    } else {
      activateButton(item)
    }
    console.log('request', e)
  }
  xhr.open('delete', item.href)
  xhr.send()
}

function deactivateButton (item) {
  item.classList.remove('text-danger')
  item.classList.add('text-muted')
  item.classList.add('wait')
  item.innerHTML = 'deleting...'
  item.disabled = true
}

function activateButton (item) {
  item.classList.remove('text-muted')
  item.classList.remove('wait')
  item.classList.add('text-danger')
  item.innerHTML = 'delete'
  item.disabled = false
}

function removeButton (item) {
  const tr = item.closest('tr')
  tr.parentNode.removeChild(tr)
}

$(document).on('click', '#test-id', () => {
  console.log(2222);
});
