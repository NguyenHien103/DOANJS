// Hàm để mở giao diện sửa sản phẩm
function editProduct(id, gender) {
    fetch(`http://localhost:3000/${gender}/${id}`)
        .then(response => response.json())
        .then(product => {
            // Hiển thị giao diện sửa sản phẩm và truyền thông tin sản phẩm cần sửa vào giao diện đó
            showEditForm(product);
        })
        .catch(error => console.error('Error fetching product data:', error));
}

// Hàm hiển thị giao diện sửa sản phẩm
function showEditForm(product) {
    // Lấy thông tin sản phẩm cần sửa và hiển thị trong giao diện sửa sản phẩm
    document.getElementById("productId").value = product.id;
    document.getElementById("nameEdit").value = product.name;
    document.getElementById("brandEdit").value = product.brand;
    document.getElementById("priceEdit").value = product.price;
    document.getElementById("amountEdit").value = product.amount;
    document.getElementById("productPreview").value = product.preview;
    document.getElementById("descriptionEdit").value = product.description;
    document.getElementById("editModal").style.display = "block";
}

// Hàm để lưu thông tin sản phẩm sau khi sửa
function saveEditedProduct(productId, gender) {
    const editedProduct = {
        name: document.getElementById("nameEdit").value,
        brand: document.getElementById("brandEdit").value,
        price: document.getElementById("priceEdit").value,
        amount: document.getElementById("amountEdit").value,
        preview: document.getElementById("productPreview").value,
        description: document.getElementById("descriptionEdit").value
    };

    fetch('http://localhost:3000/' + gender + '/' + productId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(editedProduct)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log('Data updated successfully!');
        alert('Thông tin sản phẩm đã được cập nhật thành công!');
        // Thực hiện các hành động cần thiết sau khi cập nhật sản phẩm thành công
    })
    .catch(error => console.error('Error updating data:', error));
}