document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const courses = JSON.parse(localStorage.getItem("courses"));
    const majors = JSON.parse(localStorage.getItem("majors"));
    
    renderStudentProfile(user,courses,majors);
    
    renderCurrentCourses(user,courses);
});

function renderStudentProfile(user,courses,majors){
    let creditHours = 0;
    let pendingHours = 0;
    //need to add new attribute to semesterEnrollment to show if class is pending or open
    user.semesterEnrollment.classes.forEach(userClass => {
        courses.find(course=>{
            if (course.courseId === userClass.courseId){ //currently comparing null
                if (userClass.classStatus === "open"){
                    creditHours += course.creditHours;
                } else{
                    pendingHours += course.creditHours;
                    
                }
            }
        })
    });
    const completedCourses = user.completedCourses.length;
    let totalCourses = 0;
    let percentCompleted = 0;
    majors.map(major=>{if(major.majorName === user.department){
        totalCourses = major.requiredCourses.length;
        percentCompleted = Math.round(completedCourses / totalCourses *100);
    }});
    
    document.querySelector(".student-profile").innerHTML = `
     <section class="greetings">
            <h2>Hello there, ${user.firstName} ${user.lastName}</h2>
            <span>Track your course progress and learning in university.</span>
        </section>

        <section class="student-profile-left">

            <section class="course-image-div">
                <div class="course-image">
                 <embed src = "../assets/major-files/2024-${user.department==="Computer Science"?"cs":"ce"}-flowchart.pdf#toolbar=0" type="application/pdf" / width="100%" height="100%" />
                    <div class="hover-icon">
                        <i class="fa-solid fa-eye"></i>
                        <span class="hover-text">View Syllabus</span>
                    </div>
                </div>
            </section>

            <section class="credit-hours-card">
                <div class="credit-hours-text">
                    <h2>You are taking <strong>${creditHours} credit hours</strong> this semester with <strong>${pendingHours} credits hours</strong> waiting to be approved.</h2>
                </div>
                <div class="credit-hours-image">
                    <img src="../assets/imgs/unitrack-images/login-page-graphic.png" alt="Credit Hours Graphic">
                </div>
            </section>
            

            <section class="courses recommended-courses">
                <div class="courses-header">
                    <div class="courses-header-left">
                        <h2>Current Courses</h2>
                        <p>These are the courses that you are taking this semester.</p>
                    </div>
                    <div class="courses-header-right">
                        <a href="../html/user-query.html" class="browse-courses">
                            Browse more courses <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
                <div class="course-grid">
                    
                </div>
            </section>

        </section>

        <section class="student-profile-right">
            <section class="about-me-div">
                <h3>About Me</h3>
                <div class="about-me-content">
                    <img src="${"../"+user["profile-image"]}" alt="User Avatar" class="about-me-avatar"> 
                    <div class="about-me-content-right">
                        <h2>${user.firstName} ${user.lastName}</h2>
                        <span>${user.email}</span>
                        <span class="major-tag"></i>BSc. ${user.department}</span>
                    </div>
                </div>
            </section>

            <div class="content-info-div">
                <h3 class="content-info-attribute">Download Your Course Flowchart</h3>
                <p class="content-info-paragraph attachment">
                    <i class="fa-solid fa-file-pdf"></i> CMPS-2024-Flowchart.pdf
                </p>
            </div>

            <div class="progress-card">
                <h3 class="content-info-attribute">Your Progress to Graduation</h3>
                
                <div class="progress-content">
                    <div class="progress-text">
                        <p class="content-info-attribute total-tag">Completed ${completedCourses} of ${totalCourses} Total Courses</p>
                        <p>You are also taking <span>${user.semesterEnrollment.classes.length} courses</span> this semester</p>
                    </div>
                    
                    <div class="progress-chart">
                        <div class="pie-wrapper progress-66">
                            <span class="label">${percentCompleted}<span class="smaller">%</span></span>
                            <div class="pie">
                                <div class="left-side half-circle"></div>
                                <div class="right-side half-circle"></div>
                            </div>
                            <div class="shadow"></div>
                        </div>
                    </div>
                </div>
            </div>
            

        </section>
        
    `;
}

function renderCurrentCourses(user,courses){
    const courseGrid = document.querySelector(".course-grid");
    let creditHours = 0;
    user.semesterEnrollment.classes.forEach(userClass => {
        courses.find(course=>{
            if (course.courseId === userClass.courseId){
                creditHours += course.creditHours;     
            }
        })
    }); //copied from studprof cuz defined variables wrong lolol
    
    let out = "";
    user.semesterEnrollment.classes.forEach(userClass => {
        courses.map(course=>{
            //todo: addeventlistener
            if (course.courseId === userClass.courseId){
                const creditHoursText = course.creditHours === 1 ? "Credit Hour" : "Credit Hours";
                out += `
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
                `    
            }
        })
    });
    courseGrid.innerHTML = out;
}