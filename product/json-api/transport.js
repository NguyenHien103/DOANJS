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

    cartItemsBody.appendChild(row);
  });

  //Update the cart badge with the total number of products
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
