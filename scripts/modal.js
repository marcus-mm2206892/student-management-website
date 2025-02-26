function openModal() {
    document.getElementById("classDetailsModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("classDetailsModal").style.display = "none";
}

function toggleDropdown() {
    const dropdownMenu = document.querySelector(".dropdown-menu");
    dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
}

function selectOption(option) {
    document.getElementById("selectedOption").textContent = option;
    document.querySelector(".dropdown-menu").style.display = "none";

    document.querySelectorAll(".content-section").forEach(section => {
        section.classList.remove("active");
    });

    document.getElementById(option).classList.add("active");
}

document.addEventListener("DOMContentLoaded", function () {
    // Add event listener to close button
    document.querySelectorAll(".close-modal").forEach(button => {
        button.addEventListener("click", closeModal);
    });

    // Close modal when clicking outside of modal content
    document.getElementById("classDetailsModal").addEventListener("click", function (event) {
        if (event.target === this) {
            closeModal();
        }
    });
});

// Close dropdown when clicking outside
document.addEventListener("click", function(event) {
    if (!event.target.closest(".dropdown")) {
        document.querySelector(".dropdown-menu").style.display = "none";
    }
});
