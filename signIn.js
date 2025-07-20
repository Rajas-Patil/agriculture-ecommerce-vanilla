// Toggle between login and signup forms
document.getElementById('signupLink').addEventListener('click', function() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('signupForm').classList.remove('hidden');
});

document.getElementById('loginLink').addEventListener('click', function() {
    document.getElementById('signupForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
});

// Form validation (Basic)
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Perform login request here
    alert("Login form submitted!");
});

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    // Perform signup request here
    alert("Signup form submitted!");
});
