// Get the product ID from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

// Make a request to get the product details
fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const girlProduct = data.girl.find((item) => item.id === productId);
    const boyProduct = data.boy.find((item) => item.id === productId);
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (girlProduct) {
      // Update the DOM with the girl product details
      document.getElementById("product-img").src = girlProduct.preview;
      document.getElementById("product-name").textContent = girlProduct.name;
      document.getElementById("product-brand").textContent = girlProduct.brand;
      document.getElementById("product-price").textContent = girlProduct.price;

      const info = document.querySelector(".product-info");
      let h3 = document.createElement("h3");
      let h3Text = document.createTextNode("Mô tả");
      h3.appendChild(h3Text);
      info.appendChild(h3);
      let para = document.createElement("p");
      let paraText = document.createTextNode(girlProduct.description);
      para.appendChild(paraText);
      info.appendChild(para);

      // Add the "Add to Cart" button
      let addToCartButton = document.createElement("button");
      addToCartButton.textContent = "Thêm vào giỏ hàng";
      addToCartButton.classList.add("add-to-cart");
      addToCartButton.addEventListener("click", () => {
        if (isLoggedIn) {
          // Add the product to the cart logic here
          console.log("Product added to cart:", girlProduct);
        } else {
          alert("vui long dang nhap");
          return;
        }
        // Add the product to the cart logic here
        
      });
      info.appendChild(addToCartButton);
    } else if (boyProduct) {
      // Update the DOM with the boy product details
      document.getElementById("product-img").src = boyProduct.preview;
      document.getElementById("product-name").textContent = boyProduct.name;
      document.getElementById("product-brand").textContent = boyProduct.brand;
      document.getElementById("product-price").textContent = boyProduct.price;

      const info = document.querySelector(".product-info");
      let h3 = document.createElement("h3");
      let h3Text = document.createTextNode("Mô tả");
      h3.appendChild(h3Text);
      info.appendChild(h3);
      let para = document.createElement("p");
      let paraText = document.createTextNode(boyProduct.description);
      para.appendChild(paraText);
      info.appendChild(para);

      // Add the "Add to Cart" button
      let addToCartButton = document.createElement("button");
      addToCartButton.textContent = "Thêm vào giỏ hàng";
      addToCartButton.classList.add("add-to-cart");
      info.appendChild(addToCartButton);
      

      addToCartButton.addEventListener("click", () => {
        if (isLoggedIn) {
          // Add the product to the cart logic here
          console.log("Product added to cart:", boyProduct);
        } else {
          alert("vui long dang nhap");
          return;
        }
      });
    } else {
      console.log("Product not found!");
    }
  })
  .catch((error) => {
    console.log(error);
  });

const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const greetingMsg = document.getElementById("greeting-msg");

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
  }
});
