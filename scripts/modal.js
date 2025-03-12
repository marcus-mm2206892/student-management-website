document.addEventListener("DOMContentLoaded", function () {

    function openModal() {
        document.querySelector("#classDetailsModal").style.display = "flex";
    }

    function closeModal() {
        document.querySelector("#classDetailsModal").style.display = "none";
    }

    function setupModalEvents() {
        document.querySelectorAll(".close-modal").forEach(button => {
            button.addEventListener("click", closeModal);
        });

        document.querySelector("#classDetailsModal").addEventListener("click", function (event) {
            if (event.target === this) {
                closeModal();
            }
        });
    }

    function toggleDropdown() {
        const dropdown = document.querySelector(".dropdown");
        const dropdownMenu = document.querySelector(".dropdown-menu");
    
        const isOpen = dropdown.classList.contains("active");
    
        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }
    
    function openDropdown() {
        const dropdown = document.querySelector(".dropdown");
        const dropdownMenu = document.querySelector(".dropdown-menu");
    
        dropdown.classList.add("active");
        dropdownMenu.style.display = "block";
    
        document.addEventListener("click", closeDropdownOutside, true);
    }
    
    function closeDropdown() {
        const dropdown = document.querySelector(".dropdown");
        const dropdownMenu = document.querySelector(".dropdown-menu");
    
        dropdown.classList.remove("active");
        dropdownMenu.style.display = "none";
    
        document.removeEventListener("click", closeDropdownOutside, true);
    }
    
    function closeDropdownOutside(event) {
        const dropdown = document.querySelector(".dropdown");
    
        if (!dropdown.contains(event.target)) {
            closeDropdown();
        }
    }

    function selectOption(option) {
        document.querySelector("#selectedOption").textContent = option;
        
        closeDropdown();
        
        document.querySelector(".dropdown-menu").style.display = "none";
    
        document.querySelectorAll(".content-section").forEach(section => {
            section.classList.remove("active");
        });
    
        document.getElementById(option).classList.add("active");
    }

    function setupDropdownEvents() {
        document.addEventListener("click", function (event) {
            if (!event.target.closest(".dropdown")) {
                document.querySelector(".dropdown-menu").style.display = "none";
            }
        });
    }

    window.openModal = openModal;

    window.toggleDropdown = toggleDropdown;
    window.selectOption = selectOption;

    setupModalEvents();
    setupDropdownEvents();
});
