document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
    const prevButton = document.getElementById("prevCategory");
    const nextButton = document.getElementById("nextCategory");
    let currentIndex = 0;

    const learningContainer = document.querySelector(".category.completed .cards-container");

    let allCourses = JSON.parse(localStorage.getItem("courses"));
    let allClasses = JSON.parse(localStorage.getItem("classes"));
    let allStudents = JSON.parse(localStorage.getItem("students"));

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

    function renderCompletedCourses() {
        //1. Target the the completed container

        //2. Fetch the completed coursess courses from Local storage

        const user = JSON.parse(localStorage.loggedInUser);
        const student = allStudents.find( s => s.email == user.email)
        console.log(student);
        const allEnrollments = JSON.parse(localStorage.getItem("courseEnrollments"));

        const courseIds = student.completedCourses; 
        console.log(courseIds);


        const completedCourses = [];

        courseIds.forEach(c => {  //Initializing course objects
            let crs = allCourses.find( cr => cr.courseId == c);
            completedCourses.push(crs)
        });

        console.log(completedCourses)


        try {
            out = ``
            courseIds.forEach(c => {
                out += courseCard(c);
            })

            //Inject the courses inside the div
            learningContainer.innerHTML = out;

        } catch {

        }

        

        //3. Create a template

        //4. Inject the template inside the div

    }

    function courseCard(course) {
        return `
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

        `;
    }

    renderCompletedCourses();
});
