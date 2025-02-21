function updateLogoImages() {
    const logotext = document.querySelector(".unitrack-logo-text");
    const logo = document.querySelector(".unitrack-logo");

    if (!logotext || !logo) return;

    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    logotext.src = isDarkMode
        ? "../assets/imgs/unitrack-images/unitrack-logo-text-white.png"
        : "../assets/imgs/unitrack-images/unitrack-logo-text-black.png";
    logo.src = isDarkMode
        ? "../assets/imgs/unitrack-images/unitrack-logo-white.png"
        : "../assets/imgs/unitrack-images/unitrack-logo-blue.png";
}

// load navbar
fetch('nav-bar-student.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar-container').innerHTML = data;
        document.querySelector(".navbar").offsetHeight;
        if (typeof attachNavbarEvents === "function") {
            attachNavbarEvents();
        }
        updateLogoImages();
    });

// load footer
fetch('footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
        updateLogoImages();
    });

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateLogoImages);

function attachNavbarEvents() {
    const userMenuButton = document.querySelector(".navbar-user .nav-item");
    const userDropdown = document.getElementById("userDropdown");
    const closeDropdown = document.getElementById("closeDropdown");

    if (!userMenuButton || !userDropdown || !closeDropdown) return;

    userDropdown.style.opacity = "0";
    userDropdown.style.transform = "translateY(-20px)";
    userDropdown.style.display = "none";

    userMenuButton.addEventListener("click", function () {
        const isHidden = userDropdown.style.display === "none" || userDropdown.style.opacity === "0";
        userDropdown.style.display = isHidden ? "block" : "none";
        setTimeout(() => {
            userDropdown.style.opacity = isHidden ? "1" : "0";
            userDropdown.style.transform = isHidden ? "translateY(0)" : "translateY(-20px)";
        }, 10);
    });

    document.addEventListener("click", function (event) {
        if (!userDropdown.contains(event.target) && !userMenuButton.contains(event.target)) {
            userDropdown.style.opacity = "0";
            userDropdown.style.transform = "translateY(-20px)";
            setTimeout(() => userDropdown.style.display = "none", 300);
        }
    });

    closeDropdown.addEventListener("click", function () {
        userDropdown.style.opacity = "0";
        userDropdown.style.transform = "translateY(-20px)";
        setTimeout(() => userDropdown.style.display = "none", 300);
    });
}