const signupFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#username-signup');
  const emailEl = document.querySelector('#email-signup');
  const passwordEl = document.querySelector('#password-signup');

  if (!usernameEl || !emailEl || !passwordEl) {
    alert ('Please fill out all fields.')
  } else {
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl.value,
        email: emailEl.value,
        password: passwordEl.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    // How do I pass the signed in status to the homepage when it renders?
    if (response.ok) {
      alert('Account created successfully!')
      document.location.replace('/dashboard');
    } else {
      alert('Failed to sign up.');
    }
  };
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
