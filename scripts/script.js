document.addEventListener("DOMContentLoaded", function () {
    //use script.js for general stuff that can be used in multiple pages
    
    checkLoginStatus(); //check if user logged in

    console.log("Scripts loaded");
});

function checkLoginStatus(){
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(user);
    if (!user) {
        // Redirect to login page if not logged in
        alert("Not logged in. Redirecting to login page.");
        window.location.href = "index.html";
    }

}

// export function fetchCourses(){

// }