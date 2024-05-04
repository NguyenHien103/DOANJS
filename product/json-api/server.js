const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Đọc dữ liệu từ tệp JSON
app.get("/api/products/girl", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data.girl);
});

app.get("/api/products/boy", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data.boy);
});

// Thêm dữ liệu vào tệp JSON
app.post("/api/products/girl", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const product = req.body;
  product.id = (data.girl.length + 1).toString();
  data.girl.push(product);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json(product);
});

app.post("/api/products/boy", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const product = req.body;
  product.id = (data.boy.length + 1).toString();
  data.boy.push(product);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json(product);
});

app.post("/api/transport", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  console.log("tv", req.body);
  const transport = req.body;
  transport.id = (data.transport.length + 1).toString();
  data.transport.push(transport);
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  res.json(transport);
});

app.get("/api/transport", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const transport = data.transport;
  if (transport.length > 0) {
    console.log(transport[transport.length - 1]);
    res.json(transport[transport.length - 1]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Cập nhật dữ liệu trong tệp JSON
app.put("/api/products/girl/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const productId = req.params.id;
  const updatedProduct = req.body;
  const index = data.girl.findIndex((product) => product.id === productId);
  if (index !== -1) {
    data.girl[index] = { ...data.girl[index], ...updatedProduct };
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.json(data.girl[index]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.put("/api/products/boy/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const productId = req.params.id;
  const updatedProduct = req.body;
  const index = data.boy.findIndex((product) => product.id === productId);
  if (index !== -1) {
    data.boy[index] = { ...data.boy[index], ...updatedProduct };
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.json(data.boy[index]);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Xoá dữ liệu từ tệp JSON
app.delete("/api/products/girl/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const productId = req.params.id;
  const index = data.girl.findIndex((product) => product.id === productId);
  if (index !== -1) {
    const deletedProduct = data.girl[index];
    data.girl.splice(index, 1);
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

app.delete("/api/products/boy/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const productId = req.params.id;
  const index = data.boy.findIndex((product) => product.id === productId);
  if (index !== -1) {
    const deletedProduct = data.boy[index];
    data.boy.splice(index, 1);
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});
// Đọc dữ liệu từ tệp JSON
const data = JSON.parse(fs.readFileSync('./data.json'));

// Tạo một đối tượng mới để thêm vào danh sách "girl"
const newGirlItem = {
  "name": "Áo len bé gái Rabity 737.005",
  "preview": "https://example.com/preview-image.jpg",
  "description": "Áo len ấm áp và thời trang cho bé gái",
  "brand": "Rabity",
  "price": "300,000₫",
  "id": "14"
};

// Thêm đối tượng mới vào danh sách "girl"
data.girl.push(newGirlItem);

// Ghi dữ liệu mới vào tệp JSON
fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));

// Tìm và xóa một đối tượng trong danh sách "girl" dựa trên ID
const itemIdToDelete = "12";
data.girl = data.girl.filter(item => item.id !== itemIdToDelete);

// Ghi dữ liệu mới vào tệp JSON
fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));

// Đọc dữ liệu từ tệp JSON
const updatedData = JSON.parse(fs.readFileSync('./data.json'));

// Tìm và sửa đối tượng trong danh sách "girl" dựa trên ID
const itemIdToUpdate = "3";
const updatedItem = {
  "name": "Đầm thun Gấu dâu Lotso ngắn tay bé gái Rabity 550.011 (Updated)",
  "preview": "https://example.com/updated-preview-image.jpg",
  "description": "Đầm váy thun Gấu đáng yêu chất liệu thoải mái (Updated)",
  "brand": "lotsoy",
  "price": "250,000đ",
  "id": "3"
};

updatedData.girl = updatedData.girl.map(item => {
  if (item.id === itemIdToUpdate) {
    return updatedItem;
  }
  return item;
});

// Ghi dữ liệu mới vào tệp JSON
fs.writeFileSync('./data.json', JSON.stringify(updatedData, null, 2));

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
