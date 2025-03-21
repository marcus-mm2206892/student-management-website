document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
      toggle.addEventListener("click", function (event) {
          event.stopPropagation();
          let dropdownMenu = this.nextElementSibling;
          let rect = this.getBoundingClientRect();

          document.querySelectorAll(".dropdown-menu").forEach(menu => {
              if (menu !== dropdownMenu) menu.style.display = "none";
          });

          let isOpen = dropdownMenu.style.display === "block";
          dropdownMenu.style.display = isOpen ? "none" : "block";

          if (!isOpen) {
              dropdownMenu.style.setProperty("--dropdown-top", `${rect.bottom}px`);
              dropdownMenu.style.setProperty("--dropdown-left", `${rect.left}px`);
          }
      });
  });

  document.querySelectorAll(".dropdown-menu div").forEach(option => {
      option.addEventListener("click", function () {
          let selectedText = this.textContent;
          let dropdownToggle = this.closest(".dropdown").querySelector("#selectedOption");

          dropdownToggle.textContent = selectedText;

          let email = this.closest(".student-grade").querySelector(".student-info.email").textContent;
          localStorage.setItem(email, selectedText);

          this.closest(".dropdown-menu").style.display = "none";
      });
  });

  document.querySelectorAll(".dropdown-toggle #selectedOption").forEach(span => {
      let email = span.closest(".student-grade").querySelector(".student-info.email").textContent;
      let savedGrade = localStorage.getItem(email);
      if (savedGrade) {
          span.textContent = savedGrade;
      }
  });

  document.addEventListener("click", function () {
      document.querySelectorAll(".dropdown-menu").forEach(menu => {
          menu.style.display = "none";
      });
  });

  function adjustLayout() {
      let teachingDiv = document.querySelector(".classes.teaching");
      let selectedDiv = document.querySelector(".classes.selected");
      if (window.innerWidth <= 768) {
          teachingDiv.style.height = "auto";
          selectedDiv.style.height = `calc(100vh - ${teachingDiv.offsetHeight}px - 2rem)`;
      } else {
          teachingDiv.style.height = "100%";
          selectedDiv.style.height = "100%";
      }
  }

  adjustLayout();
  window.addEventListener("resize", adjustLayout);

  document.querySelector(".dropdown-toggle").addEventListener("click", function () {
      let dropdownMenu = document.querySelector(".teaching-menu");
      dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
  });

  document.querySelectorAll(".teaching-menu div").forEach(option => {
      option.addEventListener("click", function () {
          document.querySelector(".dropdown-toggle").textContent = this.textContent;
          document.querySelector(".teaching-menu").style.display = "none";
      });
  });
});
