document.addEventListener("DOMContentLoaded", function () {
    const userMenuButton = document.querySelector(".navbar-user .nav-item");
    const userDropdown = document.querySelector("#userDropdown");
    const closeDropdown = document.querySelector("#closeDropdown");
    const browseBtn = document.querySelector(".browse-btn");
    const sidebar = document.querySelector("#sidebar");
    const sidebarOverlay = document.querySelector("#sidebarOverlay");
    const closeSidebar = document.querySelector("#closeSidebar");
    const navbar = document.querySelector(".navbar");

    // links for navbar in desktop
    const browseNavItem = document.querySelector(".navbar-menu .nav-item:nth-child(1) a");
    const registerNavItem = document.querySelector(".navbar-menu .nav-item:nth-child(2) a");
    const viewProfileNavItem = document.querySelector(".navbar-menu .nav-item:nth-child(3) a");

    // links for sidebar in mobile
    const sidebarBrowse = document.querySelector(".menu li:nth-child(1) a");
    const sidebarRegister = document.querySelector(".menu li:nth-child(2) a");
    const sidebarProfile = document.querySelector(".menu li:nth-child(3) a");
    const sidebarLearningPath = document.querySelector(".menu li:nth-child(4) a");

    // hide dropdown initially
    userDropdown.style.opacity = "0";
    userDropdown.style.transform = "translateY(-20px)";
    userDropdown.style.display = "none";

    // show/hide dropdown
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

    // close dropdown when clicked outside
    document.addEventListener("click", function (event) {
        if (!userDropdown.contains(event.target) && !userMenuButton.contains(event.target)) {
            userDropdown.style.opacity = "0";
            userDropdown.style.transform = "translateY(-20px)";
            setTimeout(() => {
                userDropdown.style.display = "none";
            }, 300);
        }
    });

    // close dropdown on button click
    closeDropdown.addEventListener("click", function () {
        userDropdown.style.opacity = "0";
        userDropdown.style.transform = "translateY(-20px)";
        setTimeout(() => {
            userDropdown.style.display = "none";
        }, 300);
    });

    // navigation for desktop
    browseNavItem.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "student-query.html";
    });

    registerNavItem.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "register-course.html";
    });

    viewProfileNavItem.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "student-profile.html";
    });

    document.querySelector(".learningpath-btn").addEventListener("click", function() {
        window.location.href = "learningpath.html";
    });

    // toggle sidebar navigation
    sidebarBrowse.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "student-query.html";
    });

    sidebarRegister.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "register-course.html";
    });

    sidebarProfile.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "student-profile.html";
    });

    sidebarLearningPath.addEventListener("click", function(event) {
        event.preventDefault();
        window.location.href = "learningpath.html";
    });

    // toggle sidebar for mobile
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

    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            sidebar.classList.remove("active");
            sidebarOverlay.classList.remove("active");
        }
    });

    document.querySelector(".nav-bar-logo").addEventListener("click", function() {
        window.location.href = "student-home-page.html";
    });

    // toggle theme
    const themeButtons = document.querySelectorAll(".theme-btn");

    themeButtons.forEach(button => {
        button.addEventListener("click", function () {
            themeButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // sign out
    document.querySelector(".signout-btn").addEventListener("click", function() {
        window.location.href = "index.html";
    });

});
