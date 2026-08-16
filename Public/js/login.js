// <!-- 4. Client Side Password Visibility Handler Script -->
  const loginPasswordField = document.getElementById('login-password');
  const toggleLoginPassword = document.getElementById('toggle-login-password');

  toggleLoginPassword.addEventListener('click', function () {
    const isPassword = loginPasswordField.getAttribute('type') === 'password';
    loginPasswordField.setAttribute('type', isPassword ? 'text' : 'password');
    this.textContent = isPassword ? '🙈' : '👁️';
  });