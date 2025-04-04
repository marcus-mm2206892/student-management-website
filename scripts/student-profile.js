document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    renderStudentProfile(user);

});

function renderStudentProfile(user){
    const creditHours = user.semesterEnrollment.classes.length * 3;// I'm gonna lie by saying each class is 3 cred hours 
    document.querySelector(".student-profile").innerHTML = `
     <section class="greetings">
            <h2>Hello there, ${user.firstName} ${user.lastName}</h2>
            <span>Track your course progress and learning in university.</span>
        </section>

        <section class="student-profile-left">

            <section class="course-image-div">
                <div class="course-image">
                    <div class="hover-icon">
                        <i class="fa-solid fa-eye"></i>
                        <span class="hover-text">View Course</span>
                    </div>
                </div>
            </section>

            <section class="credit-hours-card">
                <div class="credit-hours-text">
                    <h2>You are taking <strong>${creditHours} credit hours</strong> this semester.</h2>
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
                        <a href="#" class="browse-courses">
                            Browse more courses <i class="fa-solid fa-chevron-right"></i>
                        </a>
                    </div>
                </div>
                <div class="course-grid">
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
                                <span class="course-tag"></i>CMPS 351</span>
                                <span class="semester">Fall 2025</span>
                            </div>
                            <h3>Fundamentals of Database</h3>
                            <p class="course-subtitle">Understand database design, SQL queries, and data management principles.</p>
                            <div class="course-tags">
                                <span class="tag"><i class="fa-solid fa-table"></i> SQL</span>
                                <span class="tag"><i class="fa-solid fa-server"></i> Data Management</span>
                            </div>
                        </div>
                    </div>
    
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
                                <span class="course-tag"></i>CMPS 360</span>
                                <span class="semester">Fall 2025</span>
                            </div>
                            <h3>Design and Analysis of Algorithms</h3>
                            <p class="course-subtitle">Develop efficient algorithms and analyze their computational complexity.</p>
                            <div class="course-tags">
                                <span class="tag"><i class="fa-solid fa-gears"></i> Complexity</span>
                                <span class="tag"><i class="fa-solid fa-code"></i> Optimization</span>
                            </div>
                        </div>
                    </div>
    
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
                                <span class="course-tag"></i>CMPS 405</span>
                                <span class="semester">Fall 2025</span>
                            </div>
                            <h3>Operating Systems</h3>
                            <p class="course-subtitle">Understand process management, memory allocation, and system security.</p>
                            <div class="course-tags">
                                <span class="tag"><i class="fa-solid fa-memory"></i> Memory</span>
                                <span class="tag"><i class="fa-solid fa-server"></i> Processes</span>
                            </div>
                        </div>
                    </div>
    
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
                                <span class="course-tag"></i>CMPE 350</span>
                                <span class="semester">Fall 2025</span>
                            </div>
                            <h3>Data Communication & Networks I</h3>
                            <p class="course-subtitle">Explore networking protocols, data transmission, and security mechanisms.</p>
                            <div class="course-tags">
                                <span class="tag"><i class="fa-solid fa-wifi"></i> Protocols</span>
                                <span class="tag"><i class="fa-solid fa-shield-alt"></i> Security</span>
                            </div>
                        </div>
                    </div>
    
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
                                <span class="course-tag"></i>CMPS 310</span>
                                <span class="semester">Fall 2025</span>
                            </div>
                            <h3>Software Engineering</h3>
                            <p class="course-subtitle">Learn software development processes, design patterns, and best practices.</p>
                            <div class="course-tags">
                                <span class="tag"><i class="fa-solid fa-code"></i> Development</span>
                                <span class="tag"><i class="fa-solid fa-puzzle-piece"></i> Design Patterns</span>
                            </div>
                        </div>
                    </div>
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
                        <p class="content-info-attribute total-tag">Completed ${user.completedCourses.length} of 32 Total Courses</p>
                        <p>You are also taking <span>${creditHours/3} courses</span> this semester</p>
                    </div>
                    
                    <div class="progress-chart">
                        <div class="pie-wrapper progress-66">
                            <span class="label">66<span class="smaller">%</span></span>
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