// document.addEventListener("DOMContentLoaded", function () {
    
//     //temporary solution from login to other screens
//     document.querySelector(".input-submit").addEventListener("click", function() {
//         window.location.href = "student-home-page.html";
//     });

// });

function userVerification() {
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
    console.log(username);
    console.log(password);

    fetch("../assets/data/users.json")
    .then(response => response.json())
    .then( users => {
        //Check if the username and password matches
        const user = users.findIndex( student => student.username == username && student.password == password);
        if (user != -1) {
            window.location.href = "student-home-page.html";
        } else {
            console.log("Invalid input");
            const nodeList = document.querySelectorAll(".input-field");
            for (let i = 0; i < nodeList.length; i++) {
                nodeList[i].style.border = '1px solid red';
              }
            alert("Invalid Username or Password! Try again");
        }
    }).catch(error => {
        console.error('Error loading users.json:', error);
    });
}

document.querySelector(".input-submit").addEventListener("click", userVerification);




