// Function to display the product image
function displayProductImage(previewUrl) {
    const imagePreview = document.getElementById('imagePreview');
    imagePreview.innerHTML = ''; // Clear existing image (if any)

    const img = document.createElement('img');
    img.src = previewUrl;
    img.alt = 'Product Preview';
    img.style.maxWidth = '100%';
    imagePreview.appendChild(img);
}

// Function to handle image upload
function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const previewUrl = reader.result;
        displayProductImage(previewUrl); // Display preview image
    };

    reader.readAsDataURL(file);
}

// Example of adding an event listener programmatically
document.getElementById('preview').addEventListener('change', handleImageUpload);


// Define the products object to store product data
var products = {
    "girl": [],
    "boy": []
};

// Function to fetch existing products from the server
function fetchProducts() {
    fetch('http://localhost:3000/girl')
        .then(response => response.json())
        .then(data => {
            products.girl = data;
        })
        .catch(error => console.error('Error fetching girl products:', error));

    fetch('http://localhost:3000/boy')
        .then(response => response.json())
        .then(data => {
            products.boy = data;
        })
        .catch(error => console.error('Error fetching boy products:', error));
}

// Function to generate a unique ID for the new product
function generateUniqueId(productsArray) {
    let highestId = 0;
    for (let product of productsArray) {
        let idNumber = parseInt(product.id.replace('SP', ''));
        if (idNumber > highestId) {
            highestId = idNumber;
        }
    }
    return 'SP' + (highestId + 1);
}

// Function to add a new product
function addProduct(gender) {
    // Get values from input fields
    var name = document.getElementById("name").value;
    var brand = document.getElementById("brand").value;
    var price = document.getElementById("price").value;
    var amount = document.getElementById("amount").value;
    var description = document.getElementById("description").value;

    // Get the image preview URL (if any)
    var previewElement = document.getElementById("preview");
    var previewUrl = previewElement.files.length > 0 ? URL.createObjectURL(previewElement.files[0]) : "";

    // Generate a unique ID for the new product
    var newProductId = generateUniqueId(products[gender]);

    // Create a new product object
    var newProduct = {
        "name": name,
        "brand": brand,
        "price": price,
        "amount": amount,
        "description": description,
        "preview": previewUrl,
        "id": newProductId
    };

    // Send a POST request to add the new product
    fetch('http://localhost:3000/' + gender, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Data added successfully!');
        alert('Sản phẩm đã được thêm vào thành công!');
        // Add the new product to the local products array
        products[gender].push(newProduct);
        // Display the product image after successfully adding the product
        displayProductImage(previewUrl);
    })
    .catch(error => console.error('Error adding data:', error));
}

// Fetch existing products when the page loads
document.addEventListener('DOMContentLoaded', fetchProducts);
