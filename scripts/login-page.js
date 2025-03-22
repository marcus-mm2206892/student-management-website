document.addEventListener("DOMContentLoaded", function () {
    // auto-login if "Remember Me" is enabled
    const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));
    if (rememberedUser) {
        routeUser(rememberedUser);
    }

    document.querySelector(".input-submit").addEventListener("click", userVerification);

    // Remove error and red border while typing
    document.querySelectorAll(".input-field").forEach(input => {
        input.addEventListener("input", () => {
            input.style.border = "";
            const error = input.closest(".text-input").querySelector(".error-message");
            if (error) error.remove();
        });
    });
});


function userVerification() {
    const email = document.querySelector("#username").value.trim();
    const password = document.querySelector("#password").value.trim();
    const rememberMe = document.querySelector(".remember-me").checked;

    clearErrors();

    if (!email || !password) {
        if (!email) showError("username", "Email is required.");
        if (!password) showError("password", "Password is required.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        showError("username", "Please enter a valid email address.");
        return;
    }


    fetch("../assets/data/users.json")
        .then(response => response.json())
        .then(users => {
            const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());


            if (!user) {
                showError("username", "Email not found.");
                return;
            }

            if (user.password !== password) {
                showError("password", "Incorrect password.");
                return;
            }

            localStorage.setItem("loggedInUser", JSON.stringify(user));
            if (rememberMe) {
                localStorage.setItem("rememberedUser", JSON.stringify(user));
            } else {
                localStorage.removeItem("rememberedUser");
            }

            routeUser(user);
        })
        .catch(error => {
            console.error('Error loading users.json:', error);
        });
}

function routeUser(user) {
    // for testing purposes
    const allStorage = { ...localStorage };
    console.log("All Local Storage:", allStorage);


    switch (user.role) {
        case "student":
            window.location.href = "../html/student-home-page.html";
            break;
        case "instructor":
            window.location.href = "../html/instructor-home-page.html";
            break;
        case "admin":
            window.location.href = "../html/admin-home-page.html";
            break;
        default:
            console.error("Unknown role");
    }
}

function showError(inputId, message) {
    const input = document.querySelector(`#${inputId}`);
    const container = input.closest(".text-input");
    input.style.border = '1px solid red';

    let errorEl = document.createElement("small");
    errorEl.className = "error-message";
    errorEl.innerText = message;

    if (!container.querySelector(".error-message")) {
        container.appendChild(errorEl);
    }
}


function clearErrors() {
    document.querySelectorAll(".input-field").forEach(field => {
        field.style.border = "";
        const error = field.parentNode.querySelector(".error-message");
        if (error) error.remove();
    });
}
