function newFunction() {
    const menuItems = document.querySelectorAll('.admin-sidebar-content ul > li > a');

    for (let index = 0; index < menuItems.length; index++) {
        menuItems[index].addEventListener('click', (e) => {
            const submenu = menuItems[index].nextElementSibling; // Get the next sibling of the anchor element
            if (submenu && submenu.classList.contains('sub-menu')) {
                submenu.classList.toggle('active');
                e.preventDefault(); // Prevent the default behavior of anchor elements only if there is a submenu
            }
        });
    }
}

// Call the newFunction once the DOM content is loaded
document.addEventListener("DOMContentLoaded", function() {
    newFunction();
});
 // Lưu trữ URL của trang gốc khi mở modal
 var originalPageURL = window.location.href;

 // Thêm sự kiện click vào nút close
 document.getElementById("closeButton").addEventListener("click", function() {
     // Ẩn cửa sổ modal
     document.querySelector(".modal").style.display = "none";
     // Chuyển hướng đến trang gốc
     window.location.href = originalPageURL;
 });