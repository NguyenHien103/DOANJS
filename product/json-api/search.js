document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchKeyword = urlParams.get("keyword");

  if (searchKeyword) {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        const boysearchResults = data.boy.filter((item) => {
          return item.name.toLowerCase().includes(searchKeyword.toLowerCase());
        });

        const girlsearchResults = data.girl.filter((item) => {
          return item.name.toLowerCase().includes(searchKeyword.toLowerCase());
        });

        const searchResultsContainer = document.getElementById("searchResults");
        searchResultsContainer.innerHTML = "";

        if (boysearchResults.length === 0 && girlsearchResults.length === 0) {
          const noResults = document.createElement("p");
          noResults.textContent = "Không tìm thấy kết quả.";
          searchResultsContainer.appendChild(noResults);
        } else {
          boysearchResults.forEach((item) => {
            const resultItem = createResultItem(item);
            searchResultsContainer.appendChild(resultItem);
          });

          girlsearchResults.forEach((item) => {
            const resultItem = createResultItem(item);
            searchResultsContainer.appendChild(resultItem);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

function createResultItem(item) {
  const resultItem = document.createElement("div");
  resultItem.classList.add("result-item");

  const imgTag = document.createElement("img");
  imgTag.src = item.preview;
  resultItem.appendChild(imgTag);

  const name = document.createElement("p");
  name.textContent = item.name;
  resultItem.appendChild(name);

  const brand = document.createElement("p");
  brand.textContent = item.brand;
  resultItem.appendChild(brand);

  const price = document.createElement("p");
  price.textContent = item.price;
  resultItem.appendChild(price);

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Thêm vào giỏ hàng";
  addToCartButton.classList.add("add-to-cart");
  addToCartButton.addEventListener("click", () => {
    addToCart(item);
  });

  resultItem.appendChild(addToCartButton);

  return resultItem;
}

// Function to render the cart badge
function renderCartBadge() {
  const cartBadge = document.getElementById("badge");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartBadge.textContent = cart.reduce((total, item) => total + item.quantity, 0).toString();
}

// Function to add a product to the cart
function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = cart.find((p) => p.id === product.id);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  renderCartBadge();
}

// Initial render of the cart badge on page load
renderCartBadge();
