fetch("./data.json").then((response) => {
    return response.json();
  }).then((data) => {
    const session = document.querySelector(".session-one");
    const divcontainer = document.createElement("div");
    divcontainer.classList="container";
    

    session.appendChild(divcontainer);
    data.girl.forEach((item) => {
      const wrap = document.createElement("div");
      wrap.classList = "inner-wrap";
      divcontainer.appendChild(wrap);
  
      const box = document.createElement("div");
      box.classList = "inner-box";
      wrap.appendChild(box);
  
      const image = document.createElement("div");
      image.classList = "inner-image";
      box.appendChild(image);
  
      const imgTag = document.createElement("img");
      imgTag.src = item.preview;
      image.appendChild(imgTag);
  
      const content = document.createElement("div");
      content.classList = "inner-content";
      box.appendChild(content);
  
      const p = document.createElement("p");
      const ptext = document.createTextNode(item.name);
      p.appendChild(ptext);
  
      const brand = document.createElement("p");
      const brandText = document.createTextNode("Brand: " + item.brand);
      brand.appendChild(brandText);
  
      const price = document.createElement("p");
      const priceText = document.createTextNode(item.price);
      price.appendChild(priceText);
  
      content.appendChild(p);
      content.appendChild(brand);
      content.appendChild(price);
      
      box.addEventListener("click", () => {
        // Lưu thông tin sản phẩm vào sessionStorage hoặc localStorage
        sessionStorage.setItem("selectedProduct", JSON.stringify(item));
      
        // Chuyển hướng sang trang chi tiết sản phẩm
        window.location.href = "./productdetail.html?id=" + item.id;
      });
    });
  }).catch((error) => {
    console.log(error);
 // Thêm CSS để đảm bảo 4 sản phẩm trên cùng một hàng
 
});

fetch("./data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const session2 = document.querySelector(".session-two");
    const divcontainer2 = document.createElement("div");
    divcontainer2.classList="container";
    
    session2.appendChild(divcontainer2);

    data.boy.forEach((item) => {
      const wrap2 = document.createElement("div");
      wrap2.classList = "inner-wrap";
      divcontainer2.appendChild(wrap2);
  
      const box2 = document.createElement("div");
      box2.classList = "inner-box";
      wrap2.appendChild(box2);
  
      const image2 = document.createElement("div");
      image2.classList = "inner-image";
      box2.appendChild(image2);
  
      const imgTag2 = document.createElement("img");
      imgTag2.src = item.preview;
      image2.appendChild(imgTag2);
  
      const content2 = document.createElement("div");
      content2.classList = "inner-content";
      box2.appendChild(content2);
  
      const p = document.createElement("p");
      const ptext = document.createTextNode(item.name);
      p.appendChild(ptext);
  
      const brand2 = document.createElement("p");
      const brandText2 = document.createTextNode( item.brand);
      brand2.appendChild(brandText2);
  
      const price2 = document.createElement("p");
      const priceText2 = document.createTextNode(item.price);
      price2.appendChild(priceText2);
  
      content2.appendChild(p);
      content2.appendChild(brand2);
      content2.appendChild(price2);p

      box2.addEventListener("click", () => {
        // Chuyển hướng sang trang chi tiết sản phẩm
        window.location.href = "./productdetail.html?id=" + item.id;
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
 
httpRequest.open("GET", "data.json", true);
httpRequest.send();
