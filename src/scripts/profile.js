function edit (ctx) {
  console.log('functon edit')
  const parent = document.getElementById(ctx.dataset.section)
  const inputs = parent.querySelectorAll('.info-input')
  const spans = parent.querySelectorAll('.info-span')
  changeButtonState(ctx)
  changeVisibility(inputs)
  changeVisibility(spans)
}

async function save (ctx) {
  console.log('functon save')
  const parent = document.getElementById(ctx.dataset.section)
  const inputs = parent.querySelectorAll('.info-input')
  const spans = parent.querySelectorAll('.info-span')
  const values = getInputValueAndInsertToSpans(inputs,spans)
  console.log('values', values)
  const id =  document.getElementById('user-id').value
  const response = await sendValuesToServer(values, `/api/${ctx.dataset.url}/${id}`)

  if(response) {
    changeButtonState(ctx)
    changeVisibility(inputs)
    changeVisibility(spans)
  } else {
    // showError()
  }
}

function changeButtonState(ctx) {
  console.log('ctx', ctx)
  console.log('state', ctx.dataset.state)
  switch (ctx.dataset.state) {
    case 'edit': {
      ctx.innerHTML = 'Сохранить'
      ctx.dataset.state = 'save'
      ctx.style.color = '#3ac267'
      ctx.setAttribute( "onClick", "save(this)" );
      break
    }
    case 'save': {
      ctx.innerHTML = 'Изменить'
      ctx.dataset.state = 'edit'
      ctx.style.color = '#999'
      ctx.setAttribute( "onClick", "edit(this)" );
      break
    }
    default : {
      console.error('i do not suppose to be here')
    }
  }
}

function changeVisibility(elems) {
  elems.forEach((elem)=> {
    elem.hidden = !elem.hidden
  })
}
function getInputValueAndInsertToSpans (inputs) {
  const result = {}
  inputs.forEach((input) => {
    result[input.name] = input.value
    const span = document.getElementById(input.name)
    span.innerHTML = input.value
  })
  return result
}
function sendValuesToServer (values, url) {
  return request(values,url, 'PUT', )
}

function request (data, url, method) {
  return new Promise( (resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function (e) {
      if (xhr.status >= 200 && xhr.status < 300) {
        const resServer = JSON.parse(xhr.response)
        resolve(resServer);
        console.log(resServer)
      }  else {
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    }
    xhr.onerror = () => {
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.open(method, url)
    xhr.setRequestHeader('Content-type', 'application/json')
    xhr.send(JSON.stringify(data))
  });
}
