function newFunction() {
    const menuItems = document.querySelectorAll('.admin-sidebar-content ul > li > a');

    for (let index = 0; index < menuItems.length; index++) {
        menuItems[index].addEventListener('click', (e) => {
            const submenu = menuItems[index].nextElementSibling; // Get the next sibling of the anchor element
            if (submenu && submenu.classList.contains('sub-menu')) {
                submenu.classList.toggle('active');
                e.preventDefault(); // Prevent the default behavior of anchor elements only if there is a submenu
            }
        });
    }
}

// Call the newFunction once the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    newFunction();
});
// -----------------------------------------------------------------------------------------------------------------

/*---------------------------------ADD_PRODUCT-------------------------------------------------*/
function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const imagePreview = document.getElementById('imagePreview');
        imagePreview.innerHTML = ''; // Xóa hình ảnh hiện có (nếu có)

        const img = document.createElement('img');
        img.src = reader.result;
        img.alt = 'Preview';
        img.style.maxWidth = '100%';
        imagePreview.appendChild(img);
    };
    reader.readAsDataURL(file);
}
// Định nghĩa biến products chứa dữ liệu sản phẩm
var products = {
    "girl": [],
    "boy": []
};
// Hàm thêm sản phẩm mới
function addProduct(gender) {
    // Lấy giá trị từ các ô input
    var name = document.getElementById("name").value;
    var brand = document.getElementById("brand").value;
    var price = document.getElementById("price").value;
    var amount = document.getElementById("amount").value;
    var description = document.getElementById("description").value;

    // Lấy đường dẫn của ảnh (nếu có)
    var previewElement = document.getElementById("preview");
    var previewUrl = previewElement.files.length > 0 ? URL.createObjectURL(previewElement.files[0]) : "";




    // Tạo một đối tượng mới chứa dữ liệu sản phẩm
    var newProduct = {
        "name": name,
        "brand": brand,
        "price": price,
        "amount": amount,
        "description": description,
        "preview": previewUrl,
        "id": 'SP' + (products[gender].length + 1)

    };

    // Gửi yêu cầu POST để thêm sản phẩm mới
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
        // Sau khi thêm sản phẩm thành công, bạn có thể thực hiện các hành động khác ở đây
    })
    .catch(error => console.error('Error adding data:', error));
}
/*----------------------------Product_List-----------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
    fetch('/product/json-api/data.json')
        .then(response => response.json())
        .then(data => {
            const tableContent = document.getElementById('table-nu');
            let idCounter = 1; // Initialize the id counter

            // Function to create table rows from an array of products
            const createRows = (products) => {
                data.girl.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${idCounter}</td>
                        <td>${product.name}</td>
                        <td><img src="${product.preview}" alt="${product.name}" width="100"></td>
                        <td>${product.description}</td>
                        <td>${product.brand}</td>
                        <td>${product.price}</td>
                        <td>${product.amount}</td>
                        <td><button onclick="editProduct(${JSON.stringify(product)})"><i class="fa-regular fa-pen-to-square"></i></button></td>
                        <td><button onclick="deleteProduct('${product.id}', 'girl')"><i class="fa-solid fa-trash-arrow-up"></i></button></td>
                        `;
                    tableContent.appendChild(row);
                    idCounter++; // Increment the id counter
                });
            };

            // Call the createRows function with the data retrieved from the JSON file
            createRows(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});
document.addEventListener("DOMContentLoaded", function () {
    fetch('/product/json-api/data.json')
        .then(response => response.json())
        .then(data => {
            const tableContent = document.getElementById('table-Nam');
            let idCounter = 1; // Initialize the id counter

            // Function to create table rows from an array of products
            const createRows = (products) => {
                data.boy.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${idCounter}</td>
                        <td>${product.name}</td>
                        <td><img src="${product.preview}" alt="${product.name}" width="100"></td>
                        <td>${product.description}</td>
                        <td>${product.brand}</td>
                        <td>${product.price}</td>
                        <td>${product.amount}</td>
                        <td><button onclick="editProduct(${JSON.stringify(product.id)})"><i class="fa-regular fa-pen-to-square"></i></button></td>
                        <td><button onclick="deleteProduct('${product.id}', 'boy')"><i class="fa-solid fa-trash-arrow-up"></i></button></td>

                    `;
                    tableContent.appendChild(row);
                    idCounter++; // Increment the id counter
                });
            };

            // Call the createRows function with the data retrieved from the JSON file
            createRows(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

/*-----------delete_products--------------------------*/ 
function deleteProduct(id, gender) {
    // Xác nhận với người dùng trước khi xóa sản phẩm
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
        // Gửi yêu cầu DELETE đến API endpoint
        fetch(`http://localhost:3000/${gender}/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Product deleted successfully:', data);
            // Thực hiện các hành động khác nếu cần
        })
        .catch(error => console.error('Error deleting product:', error));
    }
}
/*----------------------update_product------------------------------------*/
function updateProduct(id, updatedProduct) {

    fetch(`http://localhost:3000/${id}`, {
        method: 'PUT', // hoặc 'PATCH' nếu bạn muốn sử dụng PATCH
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Product updated successfully:', data);
        // Thực hiện các hành động khác nếu cần
    })
    .catch(error => console.error('Error updating product:', error));
}



