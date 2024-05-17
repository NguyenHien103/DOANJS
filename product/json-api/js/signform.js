const checkExistingUser = async (username, sdt) => {
  const userData = await fetch("./data.json");
  const data = await userData.json();

  for (const item of data.user) {
    if (item.username === username || item.sdt === sdt) {
      return true; // User đã tồn tại
    }
  }
  return false; // User không tồn tại
};
const validateSignupInput = (username, password, sdt) => {
  if (!username || !password || !sdt || sdt.length !== 10) {
    return "Vui lòng nhập đầy đủ thông tin.";
  }

  if (!/^[a-zA-Z]/.test(password)) {
    return "Mật khẩu phải có ít nhất một chữ cái ở đầu.";
  }
  // Trả về null nếu tất cả các điều kiện được đáp ứng
  return null;
};
const handleSignup = async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const sdt = document.getElementById("sdt").value;
  const errorMessage = validateSignupInput(username, password, sdt);
  if (errorMessage) {
    document.getElementById("error-message").innerHTML = errorMessage;
    return;
  }
  try {
    // Kiểm tra nếu user đã tồn tại trong data.json
    const isExistingUser = await checkExistingUser(username, sdt);

    if (isExistingUser) {
      document.getElementById("error-message").innerHTML =
        "Tên người dùng hoặc số điện thoại đã tồn tại";
      return;
    }
    // Nếu không tìm thấy user khớp, tiến hành đăng ký
    const sign = {
      username: username,
      password: password,
      sdt: sdt,
      role :"1",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sign),
    };
    const response = await fetch(
      "http://localhost:3000/api/products/user",
      options
    );
    const responseData = await response.json();
    document.getElementById("message").innerHTML = "Đăng ký thành công";
    window.location.href = "./login.html";
  } catch (error) {
    console.error("Lỗi khi tạo đăng ký:", error);
  }
};
const handleLogin = async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  if (!username || !password) {
    document.getElementById("error-message").innerHTML =
      "Vui lòng nhập đầy đủ thông tin.";
    return;
  }

  try {
    const userData = await fetch("./data.json");
    if (!userData.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await userData.json();
    let found = false;

    for (const item of data.user) {
      if (item.username === username && item.password === password && item.role === "1") {
          window.location.href = "./product.html";
          localStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("user", item.username);
          found = true;
        }else if(item.username === username && item.password === password && item.role === "0") {
          window.location.href = "./admin/admin.html";
          found = true;
        }
      }
    if (!found) {
      document.getElementById("error-message").innerHTML =
        "Tài khoản hoặc mật khẩu không đúng";
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
  }
};

// Xử lý sự kiện đăng ký và đăng nhập bằng event delegation
document.addEventListener("click", function (event) {
  // Kiểm tra xem phần tử được kích hoạt sự kiện là nút đăng ký hay đăng nhập
  const target = event.target;
  if (target.matches("#ssignup")) {
    handleSignup(event);
  } else if (target.matches("#signin")) {
    handleLogin(event);
  }
});
