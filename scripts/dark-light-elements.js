document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".unitrack-logo-text");

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        logo.src = "../assets/imgs/unitrack-images/unitrack-logo-text-white.png";
    } else {
        logo.src = "../assets/imgs/unitrack-images/unitrack-logo-text-black.png";
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        logo.src = e.matches
            ? "../assets/imgs/unitrack-images/unitrack-logo-text-white.png"
            : "../assets/imgs/unitrack-images/unitrack-logo-text-black.png";
    });
});
