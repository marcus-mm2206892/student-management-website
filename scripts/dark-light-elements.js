document.addEventListener("DOMContentLoaded", () => {
    const logotext = document.querySelector(".unitrack-logo-text");
    const logo = document.querySelector(".unitrack-logo");

    // logotext
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        logotext.src = "../assets/imgs/unitrack-images/unitrack-logo-text-white.png";
    } else {
        logotext.src = "../assets/imgs/unitrack-images/unitrack-logo-text-black.png";
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        logotext.src = e.matches
            ? "../assets/imgs/unitrack-images/unitrack-logo-text-white.png"
            : "../assets/imgs/unitrack-images/unitrack-logo-text-black.png";
    });

    // logo
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        logo.src = "../assets/imgs/unitrack-images/unitrack-logo-white.png";
    } else {
        logo.src = "../assets/imgs/unitrack-images/unitrack-logo-blue.png";
    }

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
        logo.src = e.matches
            ? "../assets/imgs/unitrack-images/unitrack-logo-white.png"
            : "../assets/imgs/unitrack-images/unitrack-logo-blue.png";
    });
});
