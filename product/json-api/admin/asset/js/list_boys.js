document.addEventListener("DOMContentLoaded", function () {
    fetch('/product/json-api/data.json')
        .then(response => response.json())
        .then(data => {
            const tableContent = document.getElementById('table-Nam');
            let idCounter = 1; // Initialize the id counter

            // Function to create table rows from an array of products
            const createRows = (products) => {
                data.boy.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${idCounter}</td>
                        <td>${product.name}</td>
                        <td><img src="${product.preview}" alt="${product.name}" width="100"></td>
                        <td>${product.description}</td>
                        <td>${product.brand}</td>
                        <td>${product.price}</td>
                        <td>${product.amount}</td>
                        <td><button onclick="editProduct('${product.id}', 'boy')"><i class="fa-regular fa-pen-to-square"></i></button></td>
                        <td><button onclick="deleteProduct('${product.id}', 'boy')"><i class="fa-solid fa-trash-arrow-up"></i></button></td>

                    `;
                    tableContent.appendChild(row);
                    idCounter++; // Increment the id counter
                });
            };

            // Call the createRows function with the data retrieved from the JSON file
            createRows(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});