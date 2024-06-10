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

// // Tạo một đối tượng mới để thêm vào danh sách "girl"
// const newGirlItem = {
//   "name": "Áo len bé gái Rabity 737.005",
//   "preview": "https://product.hstatic.net/1000290074/product/rabity8704_copy_e32aea0f3c3f4ca381c53d92a837595e.jpg",
//   "description": "Áo len ấm áp và thời trang cho bé gái",
//   "brand": "Rabity",
//   "price": "300,000₫",
//   "id": "14"
// };

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
  "preview": "https://product.hstatic.net/1000290074/product/rabity8704_copy_e32aea0f3c3f4ca381c53d92a837595e.jpg",
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




//npm install cors

// Đọc dữ liệu từ tệp JSON

app.get("/api/products/user", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data.user);
});
app.post("/api/products/user", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const users = req.body;
  users.id = (data.user.length + 1).toString();
  data.user.push(users);
  // Thêm người dùng vào mảng `users`
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2)); // Ghi dữ liệu vào tệp JSON
  res.json(users);
});
app.get("/api/products/cart", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data.cart);
});

app.post("/api/products/cart", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const carts = req.body;
  carts.id = (data.cart.length + 1).toString();
  data.cart.push(carts);
  // Thêm người dùng vào mảng `users`
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2)); // Ghi dữ liệu vào tệp JSON
  res.json(carts);
});
app.put("/api/products/user", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const sdt = req.body.sdt;
  const newpassword = req.body.password;
  // Tìm và cập nhật mật khẩu cho người dùng có số điện thoại phù hợp
  const userIndex = data.user.findIndex((user) => user.sdt === sdt);
  if (userIndex !== -1) {
    data.user[userIndex].password = newpassword;
  } else {
    // Nếu không tìm thấy người dùng với số điện thoại cung cấp, trả về thông báo lỗi
    return res
      .status(404)
      .json({ message: "Không tìm thấy người dùng với số điện thoại đã cho." });
  }
  // Ghi lại dữ liệu đã cập nhật vào tệp data.json
  fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
  // Trả về phản hồi thành công
  res.status(200).json({ message: "Mật khẩu đã được cập nhật thành công!" });
});


// Endpoint để sửa đổi thông tin của một sản phẩm trong giỏ hàng
app.put("/api/cart/:id", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  const cartItemId = req.params.id;
  const updatedCartItem = req.body;
  const index = data.cart.findIndex((item) => item.id === cartItemId);
  if (index !== -1) {
    data.cart[index] = { ...data.cart[index], ...updatedCartItem };
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.json(data.cart[index]);
  } else {
    res.status(404).json({ error: "Cart item not found" });
  }
});

app.delete("/api/cart/:username", (req, res) => {
  const username = req.params.username;
  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }
  const data = JSON.parse(fs.readFileSync("data.json"));
  const initialLength = data.cart.length;
  data.cart = data.cart.filter(item => item.username !== username);
  if (data.cart.length !== initialLength) {
    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    res.json({ message: `Cart of user ${username} has been deleted successfully` });
  } else {
    res.status(404).json({ error: `Cart for user ${username} not found` });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});