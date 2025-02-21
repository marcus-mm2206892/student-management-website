document.addEventListener("DOMContentLoaded", () => {
    const logotext = document.querySelector(".unitrack-logo-text");
    const logo = document.querySelector(".unitrack-logo");

    const updateLogoImages = () => {
        const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
        
        if (logotext) {
            logotext.src = isDarkMode
                ? "../assets/imgs/unitrack-images/unitrack-logo-text-white.png"
                : "../assets/imgs/unitrack-images/unitrack-logo-text-black.png";
        }

        if (logo) {
            logo.src = isDarkMode
                ? "../assets/imgs/unitrack-images/unitrack-logo-white.png"
                : "../assets/imgs/unitrack-images/unitrack-logo-blue.png";
        }
    };

    updateLogoImages();

    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", updateLogoImages);
});
