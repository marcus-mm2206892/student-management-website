document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
    const prevButton = document.getElementById("prevCategory");
    const nextButton = document.getElementById("nextCategory");
    let currentIndex = 0;

    function updateVisibility() {
        if (window.innerWidth > 768) {
            categories.forEach(category => {
                category.style.display = "flex";
            });
        } else {
            categories.forEach((category, index) => {
                category.style.display = index === currentIndex ? "flex" : "none";
            });
        }
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
    window.addEventListener("resize", updateVisibility);

    updateVisibility();
});
