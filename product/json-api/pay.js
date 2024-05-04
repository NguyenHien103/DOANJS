// Gửi yêu cầu đến API và xử lý dữ liệu trả về
fetch("http://localhost:3000/api/transport")
  .then((response) => {
    return response.json(); // Parse the response as JSON
  })
  .then((data) => {
    console.log(data);
    console.log(data.name); // Dữ liệu JSON từ phản hồi
    const nameLi = document.querySelector(".thongtinthanhtoan li:nth-child(1)");
    const phoneLi = document.querySelector(
      ".thongtinthanhtoan li:nth-child(2)",
    );
    const addressLi = document.querySelector(
      ".thongtinthanhtoan li:nth-child(3)",
    );
    const noteLi = document.querySelector(".thongtinthanhtoan li:nth-child(4)");

    nameLi.textContent = "Họ Tên: " + data.name;
    phoneLi.textContent = "Phone: " + data.phone;
    addressLi.textContent = "Địa chỉ: " + data.address;
    noteLi.textContent = "Ghi chú: " + data.note;
  })

  // Lấy các thuộc tính của phần tử cuối cùng
  // const name = lastElement.name;
  // const phone = lastElement.phone;
  // const address = lastElement.address;
  // const note = lastElement.note;

  // Hiển thị các thuộc tính trên trang web
  //   const names = document.getElementById("name");
  //   document.getElementById("phone").textContent = `Điện thoại: ${phone}`;
  //   document.getElementById("address").textContent = `Địa chỉ: ${address}`;
  //   document.getElementById("note").textContent = `Ghi chú: ${note}`;

  .catch((error) => {
    console.error("Lỗi:", error);
  });

// Get the cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Get the table body element to populate the cart items
const cartItemsBody = document.getElementById("cart-items");

//Function to render the cart items
function renderCartItems() {
  cartItemsBody.innerHTML = "";

  cart.forEach((product, index) => {
    const row = document.createElement("tr");
    const productImgCell = document.createElement("td");
    const productImg = document.createElement("img");
    productImg.src = product.preview;
    productImg.alt = product.name;
    productImgCell.appendChild(productImg);
    row.appendChild(productImgCell);

    const productNameCell = document.createElement("td");
    productNameCell.textContent = product.name;
    row.appendChild(productNameCell);

    const productBrandCell = document.createElement("td");
    productBrandCell.textContent = product.brand;
    row.appendChild(productBrandCell);

    const productPriceCell = document.createElement("td");
    productPriceCell.textContent = product.price;
    row.appendChild(productPriceCell);

    const quantityCell = document.createElement("td");

    const quantityWrapper = document.createElement("div");
    quantityWrapper.classList.add("quantity-wrapper");

    const quantityText = document.createElement("span");
    quantityText.textContent = product.quantity;
    quantityWrapper.appendChild(quantityText);
    quantityCell.appendChild(quantityWrapper);
    row.appendChild(quantityCell);

    const sumPrice = document.createElement("td");
    sumPrice.textContent =
      parseInt(quantityText.textContent) *
      parseFloat(productPriceCell.textContent) *
      1000;

    row.appendChild(sumPrice);

    console.log(sumPrice);

    cartItemsBody.appendChild(row);
  });

  // Update the cart badge with the total number of products
  const cartBadge = document.getElementById("badge");
  // cartBadge.textContent = cart.length.toString();
}

// Function to handle the checkout button click
function handleCheckout() {
  // Perform the checkout logic here
  // You can redirect to a payment page orperform any other action

  // Clear the cart after checkout
  cart = [];
  localStorage.removeItem("cart");
  renderCartItems();
}

// Add event listener to the checkout button
const checkoutButton = document.getElementById("checkout-button");

// Initial rendering of cart items
renderCartItems();

// Gửi yêu cầu đến API và xử lý dữ liệu trả về
