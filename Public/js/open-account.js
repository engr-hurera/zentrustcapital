    function nextStep(n) {
      document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
      document.querySelectorAll('.step-dot').forEach(d => d.classList.remove('active'));
      document.getElementById('step-' + n).classList.add('active');
      for (let i = 1; i <= n; i++) {
        document.getElementById('dot-' + i).classList.add('active');
      }
    }

    function submitAccount() {
      alert('🎉 Account created successfully! Check your email for login credentials.');
    }