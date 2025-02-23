document.addEventListener("DOMContentLoaded", function () {
    const userMenuButton = document.querySelector(".navbar-user .nav-item");
    const userDropdown = document.getElementById("userDropdown");
    const closeDropdown = document.getElementById("closeDropdown");

    // make dropdown hidden at first
    userDropdown.style.opacity = "0";
    userDropdown.style.transform = "translateY(-20px)";
    userDropdown.style.display = "none";

    // show dropdown
    userMenuButton.addEventListener("click", function () {
        if (userDropdown.style.display === "none" || userDropdown.style.opacity === "0") {
            userDropdown.style.display = "block";
            setTimeout(() => {
                userDropdown.style.opacity = "1";
                userDropdown.style.transform = "translateY(0)";
            }, 10); // add delay for dropping down
        } else {
            userDropdown.style.opacity = "0";
            userDropdown.style.transform = "translateY(-20px)";
            setTimeout(() => {
                userDropdown.style.display = "none";
            }, 300); // same transition time as css for going up
        }
    });

    // hide again when clicked outside
    document.addEventListener("click", function (event) {
        if (!userDropdown.contains(event.target) && !userMenuButton.contains(event.target)) {
            userDropdown.style.opacity = "0";
            userDropdown.style.transform = "translateY(-20px)";
            setTimeout(() => {
                userDropdown.style.display = "none";
            }, 300);
        }
    });

    // hide when x button is clicked
    closeDropdown.addEventListener("click", function () {
        userDropdown.style.opacity = "0";
        userDropdown.style.transform = "translateY(-20px)";
        setTimeout(() => {
            userDropdown.style.display = "none";
        }, 300);
    });

    // adding theme button functionality
    const themeButtons = document.querySelectorAll(".theme-btn");

    themeButtons.forEach(button => {
        button.addEventListener("click", function () {
            themeButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
        });
    });

    document.querySelector(".nav-bar-logo").addEventListener("click", function() {
        window.location.href = "student-home-page.html";
    });

    document.querySelector(".learningpath-btn").addEventListener("click", function() {
        window.location.href = "learningpath.html";
    });

    document.querySelector(".signout-btn").addEventListener("click", function() {
        window.location.href = "index.html";
    });

});
