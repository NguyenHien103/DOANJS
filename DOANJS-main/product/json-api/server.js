const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Đọc dữ liệu từ tệp JSON
app.get('/api/products/girl', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data.girl);
});

app.get('/api/products/boy', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  res.json(data.boy);
});

// Thêm dữ liệu vào tệp JSON
app.post('/api/products/girl', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const product = req.body;
  product.id = (data.girl.length + 1).toString();
  data.girl.push(product);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json(product);
});

app.post('/api/products/boy', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const product = req.body;
  product.id = (data.boy.length + 1).toString();
  data.boy.push(product);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.json(product);
});

// Cập nhật dữ liệu trong tệp JSON
app.put('/api/products/girl/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const productId = req.params.id;
  const updatedProduct = req.body;
  const index = data.girl.findIndex((product) => product.id === productId);
  if (index !== -1) {
    data.girl[index] = { ...data.girl[index], ...updatedProduct };
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json(data.girl[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.put('/api/products/boy/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const productId = req.params.id;
  const updatedProduct = req.body;
  const index = data.boy.findIndex((product) => product.id === productId);
  if (index !== -1) {
    data.boy[index] = { ...data.boy[index], ...updatedProduct };
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json(data.boy[index]);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Xoá dữ liệu từ tệp JSON
app.delete('/api/products/girl/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const productId = req.params.id;
  const index = data.girl.findIndex((product) => product.id === productId);
  if (index !== -1) {
    const deletedProduct = data.girl[index];
    data.girl.splice(index, 1);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.delete('/api/products/boy/:id', (req, res) => {
  const data = JSON.parse(fs.readFileSync('data.json'));
  const productId = req.params.id;
  const index = data.boy.findIndex((product) => product.id === productId);
  if (index !== -1) {
    const deletedProduct = data.boy[index];
    data.boy.splice(index, 1);
    fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});