const checkExistingtel = async (sdt) => {
  const userData = await fetch("./data.json");
  const data = await userData.json();

  for (const item of data.user) {
    if (item.sdt === sdt) {
      return true; // User đã tồn tại
    }
  }
  return false; // User không tồn tại
};
const validateSignupInput = (password) => {
    if (!password ) {
      return "Vui lòng nhập đầy đủ thông tin.";
    }
  
    if (!/^[a-zA-Z]/.test(password)) {
      return "Mật khẩu phải có ít nhất một chữ cái ở đầu.";
    }
    // Trả về null nếu tất cả các điều kiện được đáp ứng
    return null;
  };
const handlesdt = async (e) => {
  e.preventDefault();
  const sdt = document.getElementById("sdt").value;
  const errorMessage = document.getElementById("error-message");
 
  if (sdt === "" || sdt === "1") {
    // Kiểm tra nếu ô sdt không có giá trị
    errorMessage.innerHTML = "Vui lòng nhập đầy đủ thông tin"; // Hiển thị thông báo lỗi
    return;
  } // Dừng việc thực thi tiếp tục của hàm
  try {
    // Kiểm tra nếu user đã tồn tại trong data.json
    const isExistingtel = await checkExistingtel(sdt);

    if (isExistingtel) {
      document.getElementById("tbl1").style.display = "none";
      document.getElementById("change").innerHTML = `
      <form >
      <h3>Quên mật khẩu</h3>
      <div id="error1-message" style="color: red"></div>
      <div id="message1" style="color: green"></div>
      <div class="form-group">
            <input
              type="tel"
              id="sdt1"
              name="sdt1"
              maxlength="10"
              value ="${sdt}"
              readonly
            />
     
        </div>
      <div class="form-group">
          <input
            type="password"
            name="password"
            id="password"
            maxlength="10"
            required
          />
          <label for="">Mật khẩu mới</label>
        </div>
      <div class="form-group">
          <input
            type="password"
            name="passwordcf"
            id="passwordcf"
            maxlength="10"
            required
          />
          <label for="">Nhập lại mật khẩu</label>
        </div>
      <input type="submit" value="đổi mật khẩu" id="change" />
    </form>`;
    } else {
      errorMessage.innerHTML = "Số điện thoại chưa được đăng ký"; // Hiển thị thông báo lỗi
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
  }
};
const handlechange = async (e) => {
  e.preventDefault();
  const sdt1 = document.getElementById("sdt1").value;
  const newpasswword = document.getElementById("password").value;
  const passwordconfirm = document.getElementById("passwordcf").value;
  const errorMessager = validateSignupInput(newpasswword);
  if (errorMessager) {
    document.getElementById("error1-message").innerHTML = errorMessager;
    return;
  }
  if (newpasswword !== passwordconfirm) {
    document.getElementById("error1-message").innerHTML =
      "mật khẩu không trùng nhau";
      return;
  } else {
    const sign = {
      sdt: sdt1,
      password: newpasswword,
    };
    try {
      const response = await fetch("http://localhost:3000/api/products/user", {
        method: "PUT", // Sử dụng phương thức PUT để cập nhật mật khẩu
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sign),
      });

      if (!response.ok) {
        throw new Error("Failed to update password");
      }
      document.getElementById("message1").innerText =
        "Mật khẩu đã được cập nhật thành công!";
      window.location.href = "./login.html";
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu:", error.message);
      document.getElementById("error1-message").innerText =
        "Đã xảy ra lỗi khi cập nhật mật khẩu.";
    }
  }
};
document.addEventListener("click", function (event) {
  // Kiểm tra xem phần tử được kích hoạt sự kiện là nút đăng ký hay đăng nhập
  const target = event.target;
  if (target.matches("#changepass")) {
    handlesdt(event);
  } else if (target.matches("#change")) {
    handlechange(event);
  }
});
