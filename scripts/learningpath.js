document.addEventListener("DOMContentLoaded", () => {
    const categories = document.querySelectorAll(".category");
    const prevButton = document.getElementById("prevCategory");
    const nextButton = document.getElementById("nextCategory");
    let currentIndex = 0;

    const learningContainer = document.querySelector(".category.completed .cards-container");
    const inProgressContainer = document.querySelector(".category.in-progress .cards-container");
    const pendingContainer = document.querySelector(".category.pending .cards-container");

    let allCourses = JSON.parse(localStorage.getItem("courses"));
    let allClasses = JSON.parse(localStorage.getItem("classes"));
    let allStudents = JSON.parse(localStorage.getItem("students"));
    const allEnrollments = JSON.parse(localStorage.getItem("courseEnrollments"));
    const allMajors = JSON.parse(localStorage.getItem("majors"));

    const user = JSON.parse(localStorage.loggedInUser);
    const student = allStudents.find( s => s.email == user.email )
    console.log(student);

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

        const completed = student.completedCourses; 
        console.log(completed);


        const completedCourses = [];

        completed.forEach(c => {  //Initializing course objects
            let crs = allCourses.find( cr => cr.courseId == c.courseId);
            completedCourses.push(crs)
        });

        console.log(completedCourses)


        try {
            out = ``
            completedCourses.forEach(c => {
                const grade = completed.find( crs => crs.courseId == c.courseId).letterGrade;
                out += courseCardWithGrades(c, grade);
            })

            //Inject the courses inside the div
            learningContainer.innerHTML = out;

        } catch {
            //Display error/empty message in the 'Completed' column
        }

        //Display the Grades of completed courses

    }

    //3. Create a course card template
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
                        <span class="course-tag">${course.courseId}</span>
                        <span class="semester">Fall 2025</span>
                    </div>
                    <h3>${course.courseName}</h3>
                    <p class="course-subtitle">${course.description}</p>
                    <div class="course-tags">
                        <span class="tag"><i class="fa-solid fa-laptop-code"></i> Programming</span>
                        <span class="tag"><i class="fa-solid fa-database"></i> Algorithms</span>
                    </div>
                </div>
            </div>

        `;
    }

    function courseCardWithGrades(course, grade) {
        return `

            <div class="course-card">
            <div class="course-image">
                <div class="hover-icon">
                    <i class="fa-solid fa-plus"></i>
                    <span class="hover-text">Register Course</span>
                </div>
            </div>
            <div class="course-header">
                <span class="course-tag">${course.courseId}</span>
                <span class="semester">Spring 2025</span>
            </div>
            <div class="course-completed-main">
                <div class="course-grade">
                    <div class="letter-grade-container">
                        <span class="letter-grade">${grade}</span>
                    </div>
                    <div>
                        <span class="final-grade">Final Grade</span>
                        <h3>${course.courseName}</h3>
                    </div>
                </div>
                <div class="course-tags">
                    ${course.majorsOffered
                    .map(
                    (major) => `
                    <span class="tag"><i class="fa-solid ${
                    major === "CMPE" ? "fa-microchip" : "fa-laptop-code"
                    }"></i> ${major}</span>
                `
                    )
                    .join("")}
                </div>
            </div>
        </div>
        
        `;
    }

    function renderInProgessCourses(){
        
        inprogress = student.semesterEnrollment.classes
        console.log(inprogress)

        inProgressCourses = []

        inprogress.forEach(c => {  //Initializing course objects
            let crs = allCourses.find( cr => cr.courseId == c.courseId);
            inProgressCourses.push(crs)
        });

        console.log(inProgressCourses)

        try {
            out = ``
            inProgressCourses.forEach(c => {
                out += courseCard(c);
            })

            //Inject the courses inside the div
            inProgressContainer.innerHTML = out;

        } catch {
            //Display error/empty message in the 'Completed' column
        }

    }

    function renderPendingCourses(){
        const required = allMajors.find( m => m.majorName == student.department).requiredCourses  //The department attribute of the students is infered as major
        console.log(required)  // Required courses

        const completed = student.completedCourses.map( cc => cc.courseId); // Completed Courses
        console.log(completed); 


        inprogress = student.semesterEnrollment.classes.map( ip => ip.courseId); // Curren courses
        console.log(inprogress)

        const difference1 = required.filter(item => !completed.includes(item));
        const difference2 = difference1.filter(item => !inprogress.includes(item));

        console.log(difference2)

        pendingCourses = []
        difference2.forEach( crs => {
            pendingCourses.push(allCourses.find( c => c.courseId == crs))
        })

    

        try {
            out = ``
            pendingCourses.forEach(c => {
                out += courseCard(c);
            })

            //Inject the courses inside the div
            pendingContainer.innerHTML = out;

        } catch {
            //Display error/empty message in the 'Pending' column
        }
        
    }

    renderCompletedCourses();

    renderInProgessCourses()

    renderPendingCourses()
});
