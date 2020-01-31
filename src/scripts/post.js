document.addEventListener('DOMContentLoaded', (event) => {
  console.log('this is /scripts/post.js file')
})

// function ajaxSuccess () {
//   alert(this.responseText)
// }

// function AJAXSubmit (oFormElement) {
//   if (!oFormElement.action) {
//     return
//   }
//   var oReq = new XMLHttpRequest()
//   oReq.onload = ajaxSuccess
//   if (oFormElement.method.toLowerCase() === 'post') {
//     oReq.open('post', oFormElement.action, true)
//     oReq.send(new FormData(oFormElement))
//   } else {
//     var oField, sFieldType, nFile, sSearch = ''
//     for (var nItem = 0; nItem < oFormElement.elements.length; nItem++) {
//       oField = oFormElement.elements[nItem]
//       if (!oField.hasAttribute('name')) {
//         continue
//       }
//       sFieldType = oField.nodeName.toUpperCase() === 'INPUT' ? oField.getAttribute('type').toUpperCase() : 'TEXT'
//       if (sFieldType === 'FILE') {
//         for (nFile = 0; nFile < oField.files.length; sSearch += '&' + escape(oField.name) + '=' + escape(oField.files[nFile++].name))
//       } else if ((sFieldType !== 'RADIO' && sFieldType !== 'CHECKBOX') || oField.checked) {
//         sSearch += '&' + escape(oField.name) + '=' + escape(oField.value)
//       }
//     }
//     oReq.open('get', oFormElement.action.replace(/(?:\?.*)?$/, sSearch.replace(/^&/, '?')), true)
//     oReq.send(null)
//   }
// }

function getFormData (form) {
  const elements = form.elements
  const obj = {}
  for (let i = 0; i < elements.length; i++) {
    const item = elements.item(i)
    obj[item.name] = item.value
  }
  console.log('getFormData', obj)
  return obj
}

function AJAXSubmit (formId, method, url) {
  const form = document.getElementById(formId)

  method = method || form.getAttribute('method')
  url = url || form.action
  console.log('method:', method)
  console.log('url:', url)

  // https://developer.mozilla.org/ru/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
  const xhr = new XMLHttpRequest()
  xhr.open(method, url, true)
  xhr.setRequestHeader('Content-type', 'application/json')
  // xhr.addEventListener('progress', updateProgress, false)
  // xhr.addEventListener('load', transferComplete, false)
  // xhr.addEventListener('error', transferFailed, false)
  // xhr.addEventListener('abort', transferCanceled, false)
  xhr.upload.addEventListener('progress', updateProgress, false)
  xhr.upload.addEventListener('load', transferComplete, false)
  xhr.upload.addEventListener('error', transferFailed, false)
  xhr.upload.addEventListener('abort', transferCanceled, false)
  // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onreadystatechange = () => {
    if (this.readyState === 4 && this.status === 200) {
      console.log('server responsed:', this.responseText)
    }
    if (this.status === 301) {
      console.log(this.responseText)
    } else {
      console.log(this.responseText)
    }
    console.log(this.responseText)

//     // Simulate a mouse click:
//     window.location.href = "http://www.w3schools.com";
//
// // Simulate an HTTP redirect:
//     window.location.replace("http://www.w3schools.com");
  }
  const formData = getFormData(form)
  xhr.send(JSON.stringify(formData))
}

// состояние передачи от сервера к клиенту (загрузка)
function updateProgress (oEvent) {
  if (oEvent.lengthComputable) {
    const percentComplete = oEvent.loaded / oEvent.total
    console.log('percentComplete', percentComplete)
  } else {
    console.log('Невозможно вычислить состояние загрузки, так как размер неизвестен')
  }
}

function transferComplete (evt) {
  console.log('Загрузка завершена.')
}

function transferFailed (evt) {
  console.log('При загрузке файла произошла ошибка.')
}

function transferCanceled (evt) {
  console.log('Пользователь отменил загрузку.')
}


// todo pretty good
// const btnSend = document.querySelector('#btn-clac');
//
// btnSend.addEventListener('click', evt => {
//
//   const xhr = new XMLHttpRequest();
//
//   xhr.addEventListener('load', evt => {
//
//     if (xhr.status == 200) {
//       const result = JSON.parse(xhr.response);
//       const resultEle = document.querySelector('#result');
//       resultEle.value = result.sum;
//     }
//   });
//
//   xhr.addEventListener('error', evt => {
//     console.error(evt);
//   });
//
//   xhr.open('post', 'api/add', true);
//
//   const formEle = document.querySelector('#myform');
//   const formData = new FormData(formEle);
//
//   xhr.send(formData);
//
// });
