// 1. Get all of the courses

//2. Display them inside the container (use case 2.2)

//3. Implement search capabilities (use case 2.1)

document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded");
    let allCourses = JSON.parse(localStorage.getItem("courses"));
    const searchBar = document.querySelector(".search-bar");
    const recomendedContainer = document.querySelector(".user-query .course-grid");

    document.querySelectorAll(".fa-plus").forEach(button => { 
        //redirects to registerhtml when button pressed
     
        button.addEventListener("click", function (event) {
            event.stopPropagation();
            window.location.href = "../html/register-course.html";
        });
    });

    document.querySelectorAll(".more-btn").forEach(button =>{
        //redirects to browse when more button pressed
        button.addEventListener("click",function(event){
            event.stopPropagation();
            window.location.href = "../html/user-query.html";
        })
    })

    function renderRecomended(){

    }
    
});


// adding HTML here for reference:
/*
 <div class="course-card">
                    <div class="course-image">
                        <div class="hover-icon">
                            <i class="fa-solid fa-plus"></i>
                            <span class="hover-text">Register Course</span>
                        </div>
                        <i class="fa-solid fa-turn-up top-right-icon"></i>
                    </div>
                    <div class="course-info">
                        <div class="course-header">
                            <span class="course-tag">CMPS 303</span>
                            <span class="semester">Fall 2025</span>
                        </div>
                        <h3>Data Structures</h3>
                        <p class="course-subtitle">Learn how to organize, store, and manipulate data efficiently.</p>
                        <div class="course-tags">
                            <span class="tag"><i class="fa-solid fa-laptop-code"></i> Programming</span>
                            <span class="tag"><i class="fa-solid fa-database"></i> Algorithms</span>
                        </div>
                    </div>
                </div>
*/
