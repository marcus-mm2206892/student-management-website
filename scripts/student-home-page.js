// 1. Get all of the courses

//2. Display them inside the container (use case 2.2)

//3. Implement search capabilities (use case 2.1)

document.addEventListener("DOMContentLoaded", function () {
    console.log("Page loaded");
    const allCourses = JSON.parse(localStorage.getItem("courses"));
    const searchBar = document.querySelector(".search-bar");
    //const recomendedContainer = document.querySelector(".courses.recommended-courses .course-grid");
    const recommendedCoursesGrid = document.querySelector(".recommended-courses .course-grid");

    

    const allUsers = JSON.parse(localStorage.getItem("users"));
    const user = JSON.parse(localStorage.loggedInUser);

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
        //1. Find courses according to user major
        const major = user.department == "Computer Science" ? "CMPS" : "CMPE";
        console.log(major)

        const majorCourses = allCourses.filter( c => c.majorsOffered.includes(major))
        console.log(majorCourses)

        //2. Filter completed courses

        const completedCoursesId = user.completedCourses.map( c => c.courseId)

        console.log(completedCoursesId)

        const recommendedCourses = majorCourses.filter( c =>  !completedCoursesId.includes(c.courseId))

        //2. Insert them in recommended

        try {
            out = ``
            recommendedCourses.forEach(c => {
                out += courseTemplate(c);
            })
            //Inject the courses inside the div
            recommendedCoursesGrid.innerHTML = out;
        } catch {
            //Display error/empty message in the 'Pending' column
        }

    }

    function renderSupplementary() {
        const supplementaryGrid = document.querySelector(".supplementary-courses .course-grid");
    
        const completedIds = user.completedCourses.map(c => c.courseId);
        const userMajor = user.department === "Computer Science" ? "CMPS" : "CMPE";
    
        const supplementaryCourses = allCourses.filter(course => 
            !completedIds.includes(course.courseId) && !course.majorsOffered.includes(userMajor)
        );
    
        let out = "";
        supplementaryCourses.forEach(course => {
            out += courseTemplate(course);
        });
        supplementaryGrid.innerHTML = out;
    }
    

    const csElectives = ["CMPS497", "CMPS482", "CMPS485", "CMPS493"];
    const ceElectives = ["CMPE457", "CMPE476", "CMPE483", "CMPE498"];

    function renderElectives() {
        const electiveGrid = document.querySelector(".elective-courses .course-grid");
        const completedIds = user.completedCourses.map(c => c.courseId);
    
        const electives = user.department === "Computer Science" ? csElectives : ceElectives;
    
        const electiveCourses = allCourses.filter(course => 
            electives.includes(course.courseId) && !completedIds.includes(course.courseId)
        );
    
        let out = "";
        electiveCourses.forEach(course => {
            out += courseTemplate(course);
        });
        electiveGrid.innerHTML = out;
    }
    

    renderRecomended();
    renderSupplementary();
    renderElectives();

    function courseTemplate(course){
        const creditHoursText = course.creditHours === 1 ? "Credit Hour" : "Credit Hours";
        return `
            <div class="course-card">
                <div class="course-image">
                    <img src="${course.courseImage}" alt="Course Image">
                    <div class="hover-icon">
                        <i class="fa-solid fa-plus"></i>
                        <span class="hover-text">Register Course</span>
                    </div>
                    <i class="fa-solid fa-turn-up top-right-icon"></i>
                </div>
                <div class="course-info">
                    <div class="course-header">
                        <span class="course-tag">${course.courseId}</span>
                        <span class="semester">Spring 2025</span>
                    </div>
                    <h3>${course.courseName}</h3>
                    <p class="course-subtitle">${course.description}</p>
                     <div class="course-tags">
                        <span class="tag"><i class="fa-solid fa-hourglass-half"></i> ${course.creditHours} ${creditHoursText} </span>
                         ${course.majorsOffered.map(major => `
                        <span class="tag"><i class="fa-solid ${major === 'CMPE' ? 'fa-microchip' : 'fa-laptop-code'}"></i> ${major}</span>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
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
