document.addEventListener("DOMContentLoaded", function () {
    const manageCategoriesLink = document.getElementById("manage-categories");
    const manageOrdersLink = document.getElementById("manage-orders");
    const orderTable = document.getElementById("order-table");
    const productTable = document.getElementById("product-table");

    if (manageCategoriesLink) {
        manageCategoriesLink.addEventListener("click", function (event) {
            event.preventDefault();
            orderTable.classList.add("hidden"); // Ẩn bảng đơn hàng
            productTable.classList.remove("hidden"); // Hiện bảng sản phẩm
            const categoryOptionsContainer = document.querySelector(".category-options");
            if (categoryOptionsContainer) {

                categoryOptionsContainer.remove();
            } else {
                showCategoryOptions();
            }
        });
    }

    if (manageOrdersLink) {
        manageOrdersLink.addEventListener("click", function (event) {
            event.preventDefault();
            orderTable.classList.remove("hidden"); // Hiện bảng đơn hàng
            productTable.classList.add("hidden"); // Ẩn bảng sản phẩm
        });
    } else {
        console.error("Không tìm thấy liên kết quản lý đơn hàng.");
    }

    const closeButton = document.querySelector(".close");
    if (closeButton) {
        // Gán sự kiện click để ẩn modal khi click vào dấu X
        closeButton.addEventListener("click", function () {
            const modal = document.getElementById("myModal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    }

    const closeButtton = document.querySelector("#addProductModal .close");
    if (closeButtton) {
        // Gán sự kiện click để ẩn modal khi click vào dấu X
        closeButtton.addEventListener("click", function () {
            const modal = document.getElementById("addProductModal");
            if (modal) {
                modal.style.display = "none";
            }
        });
    }
});

function showCategoryOptions() {
    const existingOptions = document.querySelector(".category-options");
    if (existingOptions) {
        return;
    }

    const categoryOptionsContainer = document.createElement("div");
    categoryOptionsContainer.classList.add("category-options");

    const boyOption = document.createElement("button");
    boyOption.textContent = "Boy";
    boyOption.addEventListener("click", function () {
        fetchDataAndDisplayProducts("boy");
        boyOption.classList.add("active");
    });

    const girlOption = document.createElement("button");
    girlOption.textContent = "Girl";
    girlOption.addEventListener("click", function () {
        fetchDataAndDisplayProducts("girl");
        boyOption.classList.add("active");
    });

    categoryOptionsContainer.appendChild(girlOption);
    categoryOptionsContainer.appendChild(boyOption);

    const asideElement = document.querySelector("aside");
    asideElement.appendChild(categoryOptionsContainer);
}

function fetchDataAndDisplayProducts(category) {
    fetch("/product/json-api/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const productTable = document.getElementById("product-table");
            productTable.innerHTML = "";

            const table = document.createElement("table");
            table.classList.add("product-table");

            const headerRow = table.insertRow();
            const headers = ["ID", "Tên sản phẩm", "Hình ảnh", "Mô tả", "Hãng", "Giá", "Cập nhật", "Xoá", "Thêm"];
            headers.forEach(headerText => {
                const headerCell = document.createElement("th");
                headerCell.textContent = headerText.toUpperCase();
                headerRow.appendChild(headerCell);
            });

            data[category].forEach(product => {
                const row = table.insertRow();

                const idCell = row.insertCell();
                idCell.textContent = product.id;

                const nameCell = row.insertCell();
                nameCell.textContent = product.name;
                nameCell.classList.add("product-name");

                const previewCell = row.insertCell();
                const previewImage = document.createElement("img");
                previewImage.src = product.preview;
                previewImage.alt = product.name;
                previewImage.classList.add("product-preview");
                previewCell.appendChild(previewImage);

                const descriptionCell = row.insertCell();
                descriptionCell.textContent = product.description;

                const brandCell = row.insertCell();
                brandCell.textContent = product.brand;

                const priceCell = row.insertCell();
                priceCell.textContent = product.price;

                const actionCell = row.insertCell();
                const editButton = document.createElement("button");
                editButton.textContent = "Sửa";
                editButton.addEventListener("click", () => {
                    editProduct(product.id);
                });

                const action1Cell = row.insertCell();
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Xoá";
                deleteButton.addEventListener("click", () => {
                    deleteProduct(product.id, row);
                });

                const addCell = row.insertCell();
                const addButton = document.createElement("button");
                addButton.textContent = "Thêm";
                addButton.addEventListener("click", function () {
                    addProduct(product.id, category);
                });

                addCell.appendChild(addButton);
                action1Cell.appendChild(deleteButton);
                actionCell.appendChild(editButton);
            });

            productTable.appendChild(table);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function editProduct(productId) {
    const modal = document.getElementById("myModal");
    const productNameInput = document.getElementById("productName");
    const productPreviewInput = document.getElementById("productPreview");
    const productDescriptionInput = document.getElementById("productDescription");
    const productBrandInput = document.getElementById("productBrand");
    const productPriceInput = document.getElementById("productPrice");

    fetch("/product/json-api/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const product = findProductById(data, productId);
            if (product) {
                productNameInput.value = product.name;
                productPreviewInput.value = product.preview;
                productDescriptionInput.value = product.description;
                productBrandInput.value = product.brand;
                productPriceInput.value = product.price;

                modal.style.display = "block";

                const saveButton = document.getElementById("saveChanges");
                saveButton.addEventListener("click", function (event) {
                    event.preventDefault();

                    if (!productNameInput.value || !productPreviewInput.value || !productDescriptionInput.value || !productBrandInput.value || !productPriceInput.value) {
                        alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
                        return;
                    }

                    const updatedProduct = {
                        name: productNameInput.value,
                        preview: productPreviewInput.value,
                        description: productDescriptionInput.value,
                        brand: productBrandInput.value,
                        price: productPriceInput.value
                    };

                    saveDataToJson(data, updatedProduct, product); // Sử dụng hàm saveDataToJson thay thế
                    modal.style.display = "none";
                });

            } else {
                console.error("Không tìm thấy sản phẩm với ID: ", productId);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function findProductById(data, productId) {
    const girlProduct = data.girl.find(product => product.id === productId);
    const boyProduct = data.boy.find(product => product.id === productId);
    return girlProduct || boyProduct;
}

function saveDataToJson(data, updatedProduct, product) {
    const category = data.girl.includes(product) ? 'girl' : 'boy';
    console.log("Category:", category);
    const productId = product.id;

    const index = data[category].findIndex(p => p.id === productId);
    if (index !== -1) {
        data[category][index] = { ...data[category][index], ...updatedProduct };

        fetch(`http://localhost:3000/${category}/${productId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(data => {
                console.log('Product updated successfully:', data);
            })
            .catch(error => {
                console.error("Error updating data:", error);
            });
    } else {
        console.error("Product not found");
    }
}

function deleteProduct(productId, row) {
    fetch("/product/json-api/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const category = data.girl.some(product => product.id === productId) ? 'girl' : 'boy';
            const index = data[category].findIndex(product => product.id === productId);
            if (index !== -1) {
                const deletedProduct = data[category][index];
                data[category].splice(index, 1);
                fetch(`http://localhost:3000/${category}/${productId}`, {
                    method: "DELETE"
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        alert("Xoá thành công");
                        row.remove();
                        console.log('Product deleted successfully:', deletedProduct);
                    })
                    .catch(error => {
                        console.error("Error deleting product:", error);
                    });
            } else {
                console.error("Product not found");
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function addProduct(productId, category) {
    const modal = document.getElementById("addProductModal");
    const productNameInput = document.getElementById("newProductName");
    const productPreviewInput = document.getElementById("newProductPreview");
    const productDescriptionInput = document.getElementById("newProductDescription");
    const productBrandInput = document.getElementById("newProductBrand");
    const productPriceInput = document.getElementById("newProductPrice");

    productNameInput.value = "";
    productPreviewInput.value = "";
    productDescriptionInput.value = "";
    productBrandInput.value = "";
    productPriceInput.value = "";

    fetch("/product/json-api/data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const product = findProductById(data, productId);
            if (product) {
                modal.style.display = "block";

                const saveButton = document.getElementById("saveNewProduct");
                saveButton.addEventListener("click", function (event) {
                    event.preventDefault();

                    if (!productNameInput.value || !productPreviewInput.value || !productDescriptionInput.value || !productBrandInput.value || !productPriceInput.value) {
                        alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
                        return;
                    }

                    const newProductId = generateProductId(data, category); // Sử dụng hàm generateProductId để tạo id 

                    const newProduct = {
                        // Thêm id mới cho sản phẩm
                        name: productNameInput.value,
                        preview: productPreviewInput.value,
                        description: productDescriptionInput.value,
                        brand: productBrandInput.value,
                        price: productPriceInput.value,
                        id: newProductId
                    };


                    // Gửi yêu cầu POST để thêm sản phẩm mới
                    saveNewProduct(data, newProduct, category); // Chú ý truyền giá trị của category vào hàm
                    modal.style.display = "none";
                    fetchDataAndDisplayProducts(category);
                });

            } else {
                console.error("Không tìm thấy sản phẩm với ID: ", productId);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function generateProductId(data, category) {
    // Lấy danh sách sản phẩm từ dữ liệu tương ứng với category
    const products = data[category];
    // Nếu không có sản phẩm nào, trả về "1" làm id đầu tiên
    if (products.length === 0) {
        return "1";
    }
    // Lấy id của sản phẩm cuối cùng trong danh mục đang chọn
    const lastProductId = products[products.length - 1].id;
    // Tạo ID mới bằng cách tăng giá trị của ID cuối cùng lên 1
    // và chuyển đổi thành chuỗi
    const newProductId = String(Number(lastProductId) + 1);
    return newProductId;
}

function saveNewProduct(data, newProduct, category) {
    fetch(`http://localhost:3000/${category}`, { // Gửi yêu cầu POST đến URL tương ứng với category
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newProduct)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(responsedata => {
            console.log('Product added successfully:', responsedata);
        })
        .catch(error => {
            console.error("Error adding new product:", error);
        });
}
// quản lý đơn hàng
document.addEventListener("DOMContentLoaded", function () {
    const manageOrdersLink = document.getElementById("manage-orders");

    if (manageOrdersLink) {
        manageOrdersLink.addEventListener("click", function (event) {
            event.preventDefault();
            displayOrders();
        });
    } else {
        console.error("Không tìm thấy liên kết quản lý đơn hàng.");
    }
});

function displayOrders() {
    // Lấy dữ liệu từ data.json
    fetch('/product/json-api/data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Lấy danh sách người dùng và giỏ hàng
            const users = data.user;
            const cart = data.cart;
            // Hiển thị thông tin đơn hàng trên bảng
            const orderTable = document.getElementById("order-table");
            orderTable.innerHTML = ""; // Xóa nội dung cũ của bảng trước khi thêm mới

            // Tạo tiêu đề bảng
            const headerRow = orderTable.insertRow();
            const headers = ["Tên Người Dùng", "Tổng Số Lượng", "Tổng Tiền", "Duyệt", "Xoá"];
            headers.forEach(headerText => {
                const headerCell = document.createElement("th");
                headerCell.textContent = headerText;
                headerRow.appendChild(headerCell);
            });

            function formatNumber(number) {
                return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            }

            // Duyệt qua danh sách người dùng
            users.forEach(user => {
                // Kiểm tra xem người dùng có sản phẩm trong giỏ hàng không
                const userCart = cart.filter(item => item.username === user.username);
                if (userCart.length > 0) {
                    // Tính tổng số lượng và tổng tiền của các sản phẩm trong giỏ hàng của người dùng
                    let totalQuantity = 0;
                    let totalPrice = 0;
                    userCart.forEach(item => {
                        totalQuantity += item.quantity;
                        totalPrice += parseFloat(item.price.replace(',', '')) * item.quantity;
                    });

                    // Thêm thông tin đơn hàng vào bảng
                    const row = orderTable.insertRow();
                    const usernameCell = row.insertCell();
                    usernameCell.textContent = user.username;

                    const totalQuantityCell = row.insertCell();
                    totalQuantityCell.textContent = totalQuantity;

                    const totalPriceCell = row.insertCell();
                    totalPriceCell.textContent = formatNumber(totalPrice) + "đ";

                    const actionCell = row.insertCell();
                    const approveButton = document.createElement("button");
                    approveButton.textContent = "Duyệt";
                    approveButton.addEventListener("click", function () {
                        const username = user.username;
                        alert("Đã duyệt đơn hàng của " + user.username);
                        deleteOrder(username, row); // Xoá dòng đơn hàng sau khi đã duyệt
                    });

                    const action1Cell = row.insertCell();
                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Xoá";
                    deleteButton.addEventListener("click", function () {
                        const username = user.username;
                        alert("Đã xoá đơn hàng của " + user.username);
                        deleteOrder(username, row);// Xoá dòng đơn hàng sau khi đã xoá
                    });

                    actionCell.appendChild(approveButton);
                    action1Cell.appendChild(deleteButton);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function deleteOrder(username, row) {
    fetch(`http://localhost:3000/cart?username=${username}`, {
        method: "GET"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(cartItems => {
        const deletePromises = cartItems.map(item => {
            return fetch(`http://localhost:3000/cart/${item.id}`, {
                method: "DELETE"
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
            });
        });
        Promise.all(deletePromises)
            .then(() => {
                
                row.remove(); // Xoá dòng đơn hàng sau khi đã xoá
            })
            .catch(error => {
                console.error("Error deleting cart items:", error);
            });
    })
    .catch(error => {
        console.error("Error fetching cart items:", error);
    });
}