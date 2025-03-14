document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
      toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        let dropdownMenu = this.nextElementSibling;
        let allDropdowns = document.querySelectorAll(".dropdown-menu");
        allDropdowns.forEach(menu => {
          if (menu !== dropdownMenu) menu.style.display = "none";
        });
        dropdownMenu.style.display = (dropdownMenu.style.display === "block") ? "none" : "block";
      });
    });

    document.addEventListener("click", function () {
      document.querySelectorAll(".dropdown-menu").forEach(menu => {
        menu.style.display = "none";
      });
});

    document.querySelectorAll(".dropdown-menu div").forEach(option => {
      option.addEventListener("click", function () {
        let selectedText = this.textContent;
        let dropdownToggle = this.closest(".dropdown").querySelector("#selectedOption");
        dropdownToggle.textContent = selectedText;
        this.closest(".dropdown-menu").style.display = "none";
      });
    });
  });

  // Dummy toggles for teaching dropdown (if needed)
  function toggleTeachingDropdown() {
    const menu = document.querySelector(".teaching-menu");
    menu.style.display = (menu.style.display === "block") ? "none" : "block";
  }
  function selectTeachingClass(cls) {
    alert("Selected: " + cls);
  }