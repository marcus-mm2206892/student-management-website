document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    const courses = JSON.parse(localStorage.getItem("courses"));
    const classes = JSON.parse(localStorage.getItem("classes"));
    
    renderInstructorHome(user,courses,classes);
    
    renderCurrentCourses(user,courses,classes);

    renderSubmittedGrades(user,courses); //might just remove this cuz we need another property in instructor to implement this(?)
});

function renderInstructorHome(user,courses,classes){    
    const classCount = user.teachingClasses.length;
    let coursesTaught = [];
    user.teachingClasses.forEach(userClass =>{
        classes.find(allClass=>{
            if (allClass.classId === userClass){
                coursesTaught.push(allClass);
                
            }
        })
    })
    coursesTaught = coursesTaught.filter((course,index,self)=>{
        return index === self.findIndex((c)=>{
            return c.courseId === course.courseId;
        })
    })
    const coursesTaughtText = coursesTaught.length === 1 ? "course" : "courses";
 
    document.querySelector(".instructor-profile").innerHTML = `
    
     <section class="greetings">
            <h2>Hello there, ${user.firstName} ${user.lastName}</h2>
            <span>Track the courses you are teaching at your university.</span>
        </section>

        <section class="instructor-profile-left">

            <section class="credit-hours-card">
                <div class="credit-hours-text">
                    <h2>You are teaching <strong>${classCount} classes</strong> and <strong>${coursesTaught.length} ${coursesTaughtText}</strong> this semester.</h2>
                </div>
                <div class="credit-hours-image">
                    <img src="../assets/imgs/unitrack-images/login-page-graphic.png" alt="Credit Hours Graphic">
                </div>
            </section>
            

            <section class="courses teaching-courses">
                <div class="courses-header">
                    <div class="courses-header-left">
                        <h2>Current Teaching Classes</h2>
                        <p>Ongoing classes that you are currently teaching</p>
                    </div>
                    <div class="courses-header-right">
                        <a href="../html/user-query.html" class="browse-courses">
                            View all courses <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
                <div class="course-grid">
                    
                </div>
            </section>

            <section class="courses submitted-grade-courses">
                <div class="courses-header">
                    <div class="courses-header-left">
                        <h2>Submitted Class Grades</h2>
                        <p>Review and verify the grades you have submitted for your students</p>
                    </div>
                    <div class="courses-header-right">
                        <a href="../html/instructor-grades-submission.html" class="browse-courses">
                            Go to grades submission <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
                <div class="course-grid2">
                    
                    </div>
            </section>

        </section>

        <section class="instructor-profile-right">
            <section class="about-me-div">
                <h3>About Me</h3>
                <div class="about-me-content">
                    <img src="${"../"+user["profile-image"]}" alt="User Avatar" class="about-me-avatar"> 
                    <div class="about-me-content-right">
                        <h2>${user.firstName} ${user.lastName}</h2>
                        <span>${user.email}</span>
                        <span class="department-tag"></i>CSE Department</span>
                        <span class="college-tag"></i>College of Engineering</span>
                    </div>
                </div>
            </section>
        </section> 
        
    `;
}

function renderCurrentCourses(user,courses,classes){
    const courseGrid = document.querySelector(".course-grid");
    console.log(courseGrid);
    let classesTaught = [];
    user.teachingClasses.forEach(userClass =>{
        classes.find(allClass=>{
            if (allClass.classId === userClass){
                classesTaught.push(allClass);
                
            }
        })
    })
   
    console.log(classesTaught);
    let out = "";
    classesTaught.forEach(userClass => {
        courses.map(course=>{
            //todo: addeventlistener, fix images css
            if (course.courseId === userClass.courseId){
                out += `
                <div class="course-card">
                        <div class="course-image">
                        <img src="" alt="Course Image" >
                            <div class="hover-icon">
                                <i class="fa-solid fa-eye"></i>
                                <span class="hover-text">View Course</span>
                            </div>
                            <i class="fa-solid fa-turn-up top-right-icon"></i>
                        </div>
                        <div class="course-info">
                            <div class="course-header">
                                <div class="card-tags-div">
                                    <span class="course-tag">${userClass.courseId}</span>
                                    <span class="section-tag">${userClass.section}</span>
                                </div>
                                <span class="semester">Spring 2025</span>
                            </div>
                            <h3>${course.courseName}</h3>
                            <p class="course-subtitle">${course.description}</p>
                            <div class="course-tags">
                                <span class="tag"><i class="fa-solid fa-laptop-code"></i> Programming</span>
                                <span class="tag"><i class="fa-solid fa-database"></i> Algorithms</span>
                            </div>
                        </div>
                    </div>
                `    
            }
        })
    });
    courseGrid.innerHTML = out;
}

function renderSubmittedGrades(user,courses){
    const courseGrid = document.querySelector(".course-grid2");
    console.log(courseGrid);
}