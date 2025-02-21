document.addEventListener("DOMContentLoaded", function () {
    const userMenuButton = document.getElementById("userMenuButton");
    const profileDropdown = document.getElementById("profileDropdown");

    userMenuButton.addEventListener("click", function (event) {
        profileDropdown.style.display =
            profileDropdown.style.display === "flex" ? "none" : "flex";
        event.stopPropagation();
    });

    document.addEventListener("click", function (event) {
        if (!profileDropdown.contains(event.target) && !userMenuButton.contains(event.target)) {
            profileDropdown.style.display = "none";
        }
    });
});
