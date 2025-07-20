// Toggle between login and signup forms
document.getElementById('signupLink').addEventListener('click', function() {
  document.getElementById('loginForm').classList.add('hidden');
  document.getElementById('signupForm').classList.remove('hidden');
});

document.getElementById('loginLink').addEventListener('click', function() {
  document.getElementById('signupForm').classList.add('hidden');
  document.getElementById('loginForm').classList.remove('hidden');
});

// Handle Signup
document.getElementById('signupForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const username = document.getElementById('signupUsername').value;
  const email = document.getElementById('signupEmail').value;
  const password = document.getElementById('signupPassword').value;
  
  const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
  });
  
  const data = await response.json();
  
  if (response.ok) {
      alert(data.message);
      // Optionally redirect to login
  } else {
      alert('Signup failed');
  }
});

// Handle Login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (response.ok) {
      alert(data.message);
      const userId = data.userId;
      fetchUserData(userId);  // Fetch user data after successful login
  } else {
      alert('Login failed: ' + response.statusText);
  }
});

// Fetch User Data after Login
async function fetchUserData(userId) {
  const response = await fetch(`http://localhost:3000/user/${userId}`);
  const userData = await response.json();
  
  if (response.ok) {
      // Display user data on frontend
      alert(`Welcome ${userData.username}! Your email is ${userData.email}`);
      // You can update the page with the user's data here.
  } else {
      alert('Error fetching user data');
  }
}

// Handle Login
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent the form from refreshing the page
  
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  
  const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  
  if (response.ok) {
      alert(data.message); // Show login success message
      const userId = data.userId;
      // Redirect to another page after successful login
      window.location.href = `/shop.html?userId=${userId}`;  // Redirect to dashboard or shop page with user ID
  } else {
      alert('Login failed: ' + response.statusText);
  }
});




// ADD TO CART
app.post('/cart', (req, res) => {
  const cartItems = req.body.cart;  // Expecting an array of cart items
  const userId = req.body.userId;   // Example: logged-in user's ID

  // Save cartItems to a MySQL database (assuming you have a Cart table)
  const query = 'INSERT INTO Cart (user_id, product_name, product_price) VALUES ?';
  const values = cartItems.map(item => [userId, item.name, item.price]);

  db.query(query, [values], (error, results) => {
      if (error) {
          return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json({ message: 'Cart saved successfully' });
  });
});
// Send cart data to the backend
async function saveCartToBackend(cart) {
  const response = await fetch('http://localhost:3000/cart', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart: cart, userId: 1 })  // userId is just an example
  });

  const data = await response.json();
  if (response.ok) {
      console.log('Cart saved successfully');
  } else {
      console.error('Error saving cart:', data.error);
  }
}
