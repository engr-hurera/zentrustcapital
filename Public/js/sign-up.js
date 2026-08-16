  const passwordField = document.getElementById('password-field');
  const togglePassword = document.getElementById('toggle-password');

  togglePassword.addEventListener('click', function () {
    // Toggle the type attribute between text and password
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);
    
    // Switch the eye icon indicator depending on state
    this.textContent = type === 'password' ? '👁️' : '🙈';
  });

    
    function submitAccount() {
      alert('🎉 Account created successfully! Check your email for login credentials.');
    }