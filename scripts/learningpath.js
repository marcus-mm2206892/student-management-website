document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
    const prevButton = document.getElementById("prevCategory");
    const nextButton = document.getElementById("nextCategory");
    let currentIndex = 0;

    function updateVisibility() {
        categories.forEach((category, index) => {
            category.style.display = index === currentIndex ? "flex" : "none";
        });
    }

    if (prevButton && nextButton) {
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
    }
});
