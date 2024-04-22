document.addEventListener("DOMContentLoaded", function () {
    const manageCategoriesLink = document.getElementById("manage-categories");

    manageCategoriesLink.addEventListener("click", function (event) {
        event.preventDefault(); 

        const categoryOptionsContainer = document.querySelector(".category-options");
        if (categoryOptionsContainer) {

            categoryOptionsContainer.remove();
        } else {
            showCategoryOptions();
        }
    });
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
        // Gọi hàm để lấy dữ liệu sản phẩm của boy và hiển thị
        fetchDataAndDisplayProducts("boy");
    });

    const girlOption = document.createElement("button");
    girlOption.textContent = "Girl";
    girlOption.addEventListener("click", function () {
        // Gọi hàm để lấy dữ liệu sản phẩm của girl và hiển thị
        fetchDataAndDisplayProducts("girl");
    });

    categoryOptionsContainer.appendChild(girlOption);
    categoryOptionsContainer.appendChild(boyOption);

    const asideElement = document.querySelector("aside");
    asideElement.appendChild(categoryOptionsContainer);
}

function fetchDataAndDisplayProducts(category) {
    fetch("./data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            // Tạo bảng sản phẩm dựa trên category được chọn
            const productTable = document.getElementById("product-table");
            productTable.innerHTML = ""; // Xóa bất kỳ nội dung cũ nào trong bảng sản phẩm

            const table = document.createElement("table");
            table.classList.add("product-table");

            // Tạo tiêu đề bảng
            const headerRow = table.insertRow();
            const headers = ["ID", "Tên sản phẩm", "Hình ảnh", "Hãng", "Giá", "Action"];
            headers.forEach(headerText => {
                const headerCell = document.createElement("th");
                headerCell.textContent = headerText.toUpperCase();
                headerRow.appendChild(headerCell);
            });

            // Tạo hàng dữ liệu cho mỗi sản phẩm của category được chọn
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
                actionCell.appendChild(editButton);
            });

            productTable.appendChild(table);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

function editProduct(productID) {
    const modal = document.getElementById("myModal");
    const productNameInput = document.getElementById("productName");
    const productPreviewInput = document.getElementById("productPreview");
    const productBrandInput = document.getElementById("productBrand");
    const productPriceInput = document.getElementById("productPrice");

    fetch("./data.json")
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data => {
            const product = findProductByID(data, productID);
            if (product) {
                productNameInput.value = product.name;
                productPreviewInput.value = product.preview;
                productBrandInput.value = product.brand;
                productPriceInput.value = product.price;

                modal.style.display = "block";

                const saveButton = document.getElementById("saveChanges");
                saveButton.addEventListener("click", function () {
                    // Lưu các thay đổi vào sản phẩm
                    const updatedProduct = {
                        name: productNameInput.value,
                        preview: productPreviewInput.value,
                        brand: productBrandInput.value,
                        price: productPriceInput.value
                    };

                    // Ghi lại dữ liệu mới vào file data.json
                    saveDataToJson(data, updatedProduct, productID);
                    modal.style.display = "none";
                });
            } else {
                console.error("Không tìm thấy sản phẩm với ID: ", productID);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}


function findProductByID(data, productID) {
    const girlProduct = data.girl.find(product => product.id === productID);
    const boyProduct = data.boy.find(product => product.id === productID);
    return girlProduct || boyProduct;
}

function saveDataToJson(data, updatedProduct, productID) {
    const category = data.girl.find(product => product.id === productID) ? 'girl' : 'boy';

    const index = data[category].findIndex(product => product.id === productID);
    if (index !== -1) {

        data[category][index] = { ...data[category][index], ...updatedProduct };

        fetch(`/api/products/${category}/${productID}`, {
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
            fetchDataAndDisplayProducts(category); 
        })
        .catch(error => {
            console.error("Error updating data:", error);
        });
    } else {
        console.error("Product not found");
    }
}

