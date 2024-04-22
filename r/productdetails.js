// Get the product ID from the URL parameter
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

// Make a request to get the product details
fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const girlProduct = data.girl.find((item) => item.id === productId);
    const boyProduct = data.boy.find((item) => item.id === productId);

    if (girlProduct) {
      // Update the DOM with the girl product details
      document.getElementById("product-img").src = girlProduct.preview;
      document.getElementById("product-name").textContent = girlProduct.name;
      document.getElementById("product-brand").textContent = girlProduct.brand;
      document.getElementById("product-price").textContent = girlProduct.price;

      const info = document.querySelector(".product-info");
      let h3 = document.createElement('h3');
      let h3Text = document.createTextNode('Mô tả');
      h3.appendChild(h3Text);
      info.appendChild(h3);
      let para = document.createElement('p');
      let paraText = document.createTextNode(girlProduct.description);
      para.appendChild(paraText);
      info.appendChild(para);

      // Add the "Add to Cart" button
      let addToCartButton = document.createElement('button');
      addToCartButton.textContent = "Thêm vào giỏ hàng";
      addToCartButton.classList.add('add-to-cart');
      addToCartButton.addEventListener('click', () => {
        // Add the product to the cart logic here
        console.log('Product added to cart:', girlProduct);
      });
      info.appendChild(addToCartButton);
    } else if (boyProduct) {
      // Update the DOM with the boy product details
      document.getElementById("product-img").src = boyProduct.preview;
      document.getElementById("product-name").textContent = boyProduct.name;
      document.getElementById("product-brand").textContent = boyProduct.brand;
      document.getElementById("product-price").textContent = boyProduct.price;

      const info = document.querySelector(".product-info");
      let h3 = document.createElement('h3');
      let h3Text = document.createTextNode('Mô tả');
      h3.appendChild(h3Text);
      info.appendChild(h3);
      let para = document.createElement('p');
      let paraText = document.createTextNode(boyProduct.description);
      para.appendChild(paraText);
      info.appendChild(para);

      // Add the "Add to Cart" button
      let addToCartButton = document.createElement('button');
      addToCartButton.textContent = "Thêm vào giỏ hàng";
      addToCartButton.classList.add('add-to-cart');
      addToCartButton.addEventListener('click', () => {
        // Add the product to the cart logic here
        console.log('Product added to cart:', boyProduct);
      });
      info.appendChild(addToCartButton);
    } else {
      console.log("Product not found!");
    }
  })
  .catch((error) => {
    console.log(error);
  });