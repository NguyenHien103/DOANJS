
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