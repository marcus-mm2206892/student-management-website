document.addEventListener("DOMContentLoaded", function () {
    const userMenuButton = document.querySelector(".navbar-user .nav-item");
    const userDropdown = document.querySelector("#userDropdown");
    const closeDropdown = document.querySelector("#closeDropdown");
    const browseBtn = document.querySelector(".browse-btn");
    const sidebar = document.querySelector("#sidebar");
    const sidebarOverlay = document.querySelector("#sidebarOverlay");
    const closeSidebar = document.querySelector("#closeSidebar");
    const navbar = document.querySelector(".navbar");
    const registerNavItem = document.querySelector(".navbar-menu .nav-item:nth-child(2) a");

    // Dropdown functions
    userDropdown.style.opacity = "0";
    userDropdown.style.transform = "translateY(-20px)";
    userDropdown.style.display = "none";

    // Show dropdown
    userMenuButton.addEventListener("click", function () {
        if (userDropdown.style.display === "none" || userDropdown.style.opacity === "0") {
            userDropdown.style.display = "block";
            setTimeout(() => {
                userDropdown.style.opacity = "1";
                userDropdown.style.transform = "translateY(0)";
            }, 10);
        } else {
            userDropdown.style.opacity = "0";
            userDropdown.style.transform = "translateY(-20px)";
            setTimeout(() => {
                userDropdown.style.display = "none";
            }, 300);
        }
    });

    // Hide dropdown when clicking outside
    document.addEventListener("click", function (event) {
        if (!userDropdown.contains(event.target) && !userMenuButton.contains(event.target)) {
            userDropdown.style.opacity = "0";
            userDropdown.style.transform = "translateY(-20px)";
            setTimeout(() => {
                userDropdown.style.display = "none";
            }, 300);
        }
    });

    // Hide dropdown when close button is clicked
    closeDropdown.addEventListener("click", function () {
        userDropdown.style.opacity = "0";
        userDropdown.style.transform = "translateY(-20px)";
        setTimeout(() => {
            userDropdown.style.display = "none";
        }, 300);
    });

    // Theme button functionality
    const themeButtons = document.querySelectorAll(".theme-btn");

    themeButtons.forEach(button => {
        button.addEventListener("click", function () {
            themeButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Sidebar functions

    browseBtn.addEventListener("click", function (event) {
        event.stopPropagation();
        sidebar.classList.add("active");
        sidebarOverlay.classList.add("active");
    });

    closeSidebar.addEventListener("click", function () {
        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("active");
    });
    

    sidebarOverlay.addEventListener("click", function () {
        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("active");
    });

    sidebarOverlay.addEventListener("click", function () {
        sidebar.classList.remove("active");
        sidebarOverlay.classList.remove("active");
    });

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("active");
            sidebarOverlay.classList.remove("active");
        }
    });

    document.querySelector(".nav-bar-logo").addEventListener("click", function() {
        window.location.href = "student-home-page.html";
    });

    registerNavItem.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "register-course.html";
    });

    document.querySelector(".learningpath-btn").addEventListener("click", function() {
        window.location.href = "learningpath.html";
    });

    document.querySelector(".signout-btn").addEventListener("click", function() {
        window.location.href = "index.html";
    });

});
