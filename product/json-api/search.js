document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchKeyword = urlParams.get("keyword");

  if (searchKeyword) {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        const searchResults = data.girl.filter((item) => {
          return item.name.toLowerCase().includes(searchKeyword);

        });

        const searchResultsContainer = document.getElementById("searchResults");
        searchResultsContainer.innerHTML = "";

        if (searchResults.length === 0) {
          const noResults = document.createElement("p");
          noResults.textContent = "Không tìm thấy kết quả.";
          searchResultsContainer.appendChild(noResults);
        } else {
          searchResults.forEach((item) => {
            const resultItem = document.createElement("div");

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

            // Hiển thị thêm thông tin sản phẩm tại đây

            searchResultsContainer.appendChild(resultItem);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

if (searchKeyword) {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      const searchResults = data.boy.filter((item) => {
        return item.name.toLowerCase().includes(searchKeyword);
      });

      const searchResultsContainer = document.getElementById("searchResults");
      searchResultsContainer.innerHTML = "";

      if (searchResults.length === 0) {
        const noResults = document.createElement("p");
        noResults.textContent = "Không tìm thấy kết quả.";
        searchResultsContainer.appendChild(noResults);
      } else {
        searchResults.forEach((item) => {
          const resultItem = document.createElement("div");

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

          // Hiển thị thêm thông tin sản phẩm tại đây

          searchResultsContainer.appendChild(resultItem);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
});
