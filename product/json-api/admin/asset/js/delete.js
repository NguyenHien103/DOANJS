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
            document.getElementById('editName')= product.name;
        })
        .catch(error => console.error('Error deleting product:', error));
    }
}