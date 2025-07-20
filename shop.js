

const express = require('express');
const router = express.Router();
const connection = require('./db'); // MySQL connection

// Purchase route
router.post('/purchase', (req, res) => {
    const { userId, productName } = req.body;

    if (!userId || !productName) {
        return res.status(400).json({ error: 'Missing user ID or product name' });
    }

    // Insert purchase details into the 'orders' table
    const query = `INSERT INTO orders (user_id, product_name) VALUES (?, ?)`;
    connection.query(query, [userId, productName], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json({ message: 'You have purchased an order', orderId: result.insertId });
        }
    });
});

module.exports = router;




// FOR LOGIN FORM CONNECT TO SHOP 
// Function triggered when the user clicks the "Buy" button for a product
function buyProduct(productName, productId) {
    // Get the logged-in user's ID from localStorage
    const userId = localStorage.getItem('userId');

    if (!userId) {
        alert('Please log in to make a purchase.');
        return;
    }

    // Send the purchase request to the backend
    fetch('http://localhost:3000/api/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            userId: userId,
            productName: productName
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'You have purchased an order') {
            alert(`Successfully purchased ${productName} with order ID: ${data.orderId}`);
            // Redirect to the thank-you page with the product details
            window.location.href = `thankyou.html?productName=${encodeURIComponent(productName)}&orderId=${data.orderId}`;
        } else {
            alert('Purchase failed. Please try again.');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during the purchase.');
    });
}




