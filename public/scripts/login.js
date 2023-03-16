// Client facing scripts here
$(() => {
  $('#login-form').on('submit', (event) => {
    event.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();

    $.ajax({
      url: '/login',
      method: 'POST',
      data: { email, password },
      success: () => {
        window.location.href = '/dashboard';
      }
    }); // ajax
  }); // click event
});



