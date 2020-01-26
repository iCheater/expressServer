console.log('delete loader')
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOMContentLoaded')

  document.querySelectorAll('.deleteBtn').forEach(item => {
    console.log(item)
    item.addEventListener('click', event => {
      event.preventDefault()
      // console.log('href', item.href);
      request(item.href)
    })
  })
})
// 123 x 2
// 55 x 5
function request (href) {
  console.log('req', href)
  // Set up our HTTP request
  const xhr = new XMLHttpRequest()

  // Setup our listener to process completed requests
  xhr.onload = function () {

    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      // What do when the request is successful
      console.log('success!', xhr)
      // Simulate a mouse click:
      if(xhr.status === 200) {
        const url = JSON.parse(xhr.response).redirect;
        console.log(url);
        window.location.href = url;
      }
    } else {
      // What do when the request fails
      console.log('The request failed!')
    }
    // Code that should run regardless of the request status
    console.log('This always runs...')
  }

  // Create and send a GET request
  // The first argument is the post type (GET, POST, PUT, DELETE, etc.)
  // The second argument is the endpoint URL
  xhr.open('delete', href)
  xhr.send()
}
