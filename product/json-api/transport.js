const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const greetingMsg = document.getElementById("greeting-msg");
const badge = document.getElementById("badge");
loginBtn.addEventListener("click", function () {
  window.location.href = "./login.html";
});

logoutBtn.addEventListener("click", function () {
  localStorage.setItem("isLoggedIn", "false");
  location.reload();
});

// Cập nhật trạng thái của nút đăng nhập/xuất khi tải trang
window.addEventListener("load", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const username = sessionStorage.getItem("user");

  if (isLoggedIn && username) {
    greetingMsg.innerText =
      isLoggedIn && username ? `Xin chào, ${username}!` : "";
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
  } else {
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";
    sessionStorage.removeItem("user");
    cart = [];
    localStorage.removeItem("cart");
    window.location.href = "./product.html";
  }
});

// Get the cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Get the table body element to populate the cart items
    const cartItemsBody = document.getElementById("cart-items");

    function calculateSubtotal(product) {
return product.price * product.quantity;
}


  // Function to calculate the total price of items in the cart
function calculateTotalPrice() {
  let totalPrice = 0;
  cart.forEach(product => {
    // Kiểm tra tính hợp lệ của giá và số lượng
    if (!isNaN(product.price) && !isNaN(product.quantity) && product.price >= 0 && product.quantity >= 0) {
      // Tính toán thành tiền cho sản phẩm và cộng vào tổng tiền
      totalPrice += product.price * product.quantity;
    }
  });
  return totalPrice;
}

    function formatNumber(number) {
      return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    // Function to render the cart items
    function renderCartItems() {
      cartItemsBody.innerHTML = "";

      let totalPrice = 0; // Biến để tính tổng tiền của toàn bộ giỏ hàng

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
        const quantityText = document.createElement("span");
        quantityText.textContent = product.quantity;
        quantityCell.appendChild(quantityText);
        row.appendChild(quantityCell);

            // Tính và hiển thị thành tiền cho từng sản phẩm

      const subtotalCell = document.createElement("td");
      const subtotal = parseFloat(product.price.replace(',', '')) * product.quantity;


      // Kiểm tra nếu giá hoặc số lượng không hợp lệ thì hiển thị 0
      if (isNaN(subtotal)) {
        subtotalCell.textContent = "0.00";
      } else {
        subtotalCell.textContent = formatNumber(subtotal) + "đ"; // Hiển thị thành tiền với 2 chữ số sau dấu phẩy
      }

      row.appendChild(subtotalCell);

      cartItemsBody.appendChild(row);

      totalPrice += isNaN(subtotal) ? 0 : subtotal; // Cộng vào tổng tiền, nếu subtotal là NaN thì cộng 0
      //totalPrice += subtotal;
    });

    // Hiển thị tổng tiền của toàn bộ giỏ hàng
    const totalPriceElement = document.getElementById("total-price");
    totalPriceElement.textContent = totalPrice.toFixed(2); // Hiển thị tổng tiền với 2 chữ số sau dấu phẩy
  }
    // Initial rendering of cart items
    renderCartItems();
    // Lấy tham chiếu đến nút button
var paymentButton = document.getElementById("paymentButton");

// Thêm sự kiện click
paymentButton.addEventListener("click", function () {
  // Chuyển hướng đến trang thanh toán
  window.location.href = "pay.html";
});

// Function to handle form submission
function sendTransportInfo(event) {
  event.preventDefault();
  // Get the input values
  const form = event.target;
  const name = form.elements.name.value;
  const phone = form.elements.phone.value;
  const address = form.elements.address.value;
  const note = form.elements.note.value;

  // Create an object with the input values
  const transportData = {
    name: name,
    phone: phone,
    address: address,
    note: note,
  };
  debugger;

  // Call the API with the transport array
  CreateTransportApi(transportData);
}

// Function to call the API with the transport array
function CreateTransportApi(transport) {
  // Make an HTTP request to the API endpoint
  // Replace "API_ENDPOINT" with your actual API endpoint
  fetch("http://localhost:3000/api/transport", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transport),
  })
    .then((data) => {
      // Handle the API response
      console.log(data);
      alert("Thông tin vận chuyển được thêm thành công");
    })
    .catch((error) => {
      // Handle any errors
      console.error(error);
      alert("Thêm thông tin vận chuyển không thành công");
    });
}
