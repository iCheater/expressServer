

document.addEventListener('DOMContentLoaded', () => {
  $(document).ready(() => {
    $('.nav-tabs a').click(function () {
      $(this).tab('show')
    })
    $('.nav-tabs a').on('shown.bs.tab', (event) => {
      var x = $(event.target).text() // active tab
      var y = $(event.relatedTarget).text() // previous tab
      $('.act span').text(x)
      $('.prev span').text(y)
    })
  })
})
