document.addEventListener('DOMContentLoaded', function () {
    // Your existing JavaScript code goes here
    let cart = [];

function showProductDetails(productId) {
    // Simulate fetching product details from a database
    let productName, productDescription, productPrice;

    // Set details based on productId
    if (productId === 1) {
        productName = "Premium Cosmetics Set";
        productDescription = "Enhance your beauty with our exclusive cosmetics set. This set includes a variety of high-quality products to create the perfect look.";
        productPrice = "$49.99";
    } else if (productId === 2) {
        productName = "Stylish Watch";
        productDescription = "Stay punctual and stylish with our modern watch. The perfect accessory for any occasion.";
        productPrice = "$59.99";
    } else if (productId === 3) {
        productName = "Adventure Backpack";
        productDescription = "Explore the outdoors with our durable and spacious adventure backpack. Perfect for hiking and travel adventures.";
        productPrice = "$79.99";
    }

    // Display the product details container
    document.getElementById('home-container').style.display = 'none';
    document.getElementById('product-details-container').style.display = 'block';

    // Display the product details
    document.getElementById('product-details-container').innerHTML = `
        <h2>Product Details</h2>
        <div class="product-details">
            <img src="${getImageUrl(productId)}" alt="${productName}">
            <p>
                ${productName}<br>
                ${productDescription}
            </p>
            <p><strong>Price:</strong> ${productPrice}</p>
            <!-- Add more details as needed -->
            <button onclick="addToCart('${productName}', '${productPrice}')">Add to Cart</button>
            <button onclick="goToHome()">Back to Home</button>
        </div>
    `;
}

function getImageUrl(productId) {
    // Replace this function with actual logic to get the image URL based on productId
    if (productId === 1) {
        return "http://clipart-library.com/new_gallery/256490_cosmetics-products-png.png";
    } else if (productId === 2) {
        return "https://tse4.mm.bing.net/th?id=OIP.lHfNQ4X4wti5VM-W0jtiawHaE7&pid=Api&P=0&h=220";
    } else if (productId === 3) {
        return "https://tse3.mm.bing.net/th?id=OIP.Gzxw5GIvgn5N9S9Ve8_FqQHaKb&pid=Api&P=0&h=220";
    }
}

function goToHome() {
    // Navigate back to the home container
    document.getElementById('product-details-container').style.display = 'none';
    document.getElementById('cart-container').style.display = 'none';
    document.getElementById('home-container').style.display = 'block';
}

function login() {
    // Simulate successful login
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('home-container').style.display = 'block';
}

function addToCart(productName, productPrice) {
    // Add the product to the cart
    cart.push({
        name: productName,
        price: productPrice
    });

    // Update the cart display
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    // Display each item in the cart
    cart.forEach((item, index) => {
        const cartItemElement = document.createElement('div');
        cartItemElement.innerHTML = `
            <p>${item.name} - ${item.price}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItemElement);
    });

    // Show the cart container
    document.getElementById('home-container').style.display = 'none';
    document.getElementById('product-details-container').style.display = 'none';
    document.getElementById('cart-container').style.display = 'block';
}

function removeFromCart(index) {
    // Remove the item from the cart
    cart.splice(index, 1);

    // Update the cart display
    updateCartDisplay();
}

function proceedToCheckout() {
    // Implement logic to proceed to checkout
    alert('Proceeding to Checkout. Implement your checkout logic here.');
}

    // Example: Fetch products from the server and display them
    fetchProducts();
});

function fetchProducts() {
    fetch('/api/products')
        .then(response => response.json())
        .then(products => {
            // Update your UI with the fetched products
            console.log('Fetched products:', products);
        })
        .catch(error => console.error('Error fetching products:', error));
}

function addProduct(productData) {
    fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    })
        .then(response => response.json())
        .then(newProduct => {
            // Handle the newly added product
            console.log('Added product:', newProduct);
        })
        .catch(error => console.error('Error adding product:', error));
}

function updateProduct(productId, productData) {
    fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
    })
        .then(response => response.json())
        .then(updatedProduct => {
            // Handle the updated product
            console.log('Updated product:', updatedProduct);
        })
        .catch(error => console.error('Error updating product:', error));
}

function deleteProduct(productId) {
    fetch(`/api/products/${productId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(deletedProduct => {
            // Handle the deleted product
            console.log('Deleted product:', deletedProduct);
        })
        .catch(error => console.error('Error deleting product:', error));
}
