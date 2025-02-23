document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
    let currentIndex = 0;

    const prevButton = document.getElementById("prevCategory");
    const nextButton = document.getElementById("nextCategory");

    function updateVisibility() {
        categories.forEach((category, index) => {
            category.style.display = index === currentIndex ? "flex" : "none";
        });
    }

    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateVisibility();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentIndex < categories.length - 1) {
            currentIndex++;
            updateVisibility();
        }
    });

    // Initialize
    if (window.innerWidth <= 768) {
        updateVisibility();
    }

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            categories.forEach((category) => (category.style.display = "flex"));
        } else {
            updateVisibility();
        }
    });
});
