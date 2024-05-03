const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;
//npm install cors
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
// Đọc dữ liệu từ tệp JSON
app.get("/api/products/girl", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data.girl);
});

app.get("/api/products/boy", (req, res) => {
  const data = JSON.parse(fs.readFileSync("data.json"));
  res.json(data.boy);
});
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
