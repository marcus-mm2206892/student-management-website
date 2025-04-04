document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const resultsGrid = document.getElementById("resultsGrid");
    const noResults = document.getElementById("noResults");
    const searchQueryText = document.getElementById("searchQueryText");
    const resultsCount = document.getElementById("resultsCount");
    const coursesContainer = document.querySelector(".user-query .course-grid");

    let allCourses = JSON.parse(localStorage.getItem("courses"));

    document.querySelectorAll(".fa-plus").forEach(button =>{
        //redirects to register when plus button pressed
        button.addEventListener("click",function(event){
            event.stopPropagation();
            window.location.href = "../html/register-course.html";
        })
    })


    function renderCourses(){
        console.log(allCourses)

        try {
            out = ``
            allCourses.forEach(c => {
                out += courseTemplate(c);
            })

            //Inject the courses inside the div
            coursesContainer.innerHTML = out;

        } catch {
            //Display error/empty message in the container
        }
    }


    renderCourses()

    // <img src="${course.courseImage}" alt="Course Image">

    function courseTemplate(course) {
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
                        <span class="course-tag"></i>${course.courseId}</span>
                        <span class="semester">Fall 2025</span>
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



    // // Simulated search term (replace with actual query parameter later)
    // const query = "Mobile";
    // searchQueryText.innerHTML = query;

    // fetch("../assets/data/courses.json")
    // .then(res => res.json())
    // .then(courses => {
    //     let results = courses.filter(course => 
    //         course.courseName.toLowerCase().includes(query.toLowerCase()) ||
    //         course.courseId.toLowerCase().includes(query.toLowerCase())
    //     );

    //     if (results.length === 0) {
    //         noResults.style.display = "block";
    //         resultsGrid.style.display = "none";
    //         resultsCount.innerHTML = "0 results";
    //     } else {
    //         noResults.style.display = "none";
    //         resultsGrid.style.display = "grid";
    //         resultsCount.innerHTML = `${results.length} results`;

    //         let output = results.map(course => `
    //             <div class="course-card">
    //                 <h3>${course.courseName}</h3>
    //                 <p>${course.courseId} - ${course.instructor || "TBA"}</p>
    //             </div>
    //         `).join("");

    //         resultsGrid.innerHTML = output;
    //     }
    // });

    // searchBar.addEventListener("input", function () {
    //     window.location.href = `student-query.html?q=${searchBar.value}`;
    // });
});
