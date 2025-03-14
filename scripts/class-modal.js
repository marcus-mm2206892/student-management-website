document.addEventListener("DOMContentLoaded", function () {

    function createModal() {
        return `
            <div id="classDetailsModal" class="modal">
                <div class="modal-popup">
                    <button class="close-btn close-modal">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <div class="modal-header">
                        <div class="course-title-div">
                            <h2 class="course-title">Web Development Fundamentals</h2>
                            <div class="course-tags-div">
                                <span class="course-tag">CMPS 350</span>
                                <span class="section-tag">Section L01</span>
                                <span class="crn-tag">CRN 21937</span>
                            </div>
                        </div>
                        <div class="dropdown-div">
                            <span class="dropdown-text">
                                <i class="fas fa-info-circle"></i>
                            </span>                    
                            <div class="dropdown">
                                <div class="dropdown-toggle" onclick="toggleDropdown()">
                                    <span id="selectedOption">Class Details</span>
                                    <i class="fas fa-chevron-down"></i>
                                </div>
                                <div class="dropdown-menu">
                                    <div onclick="selectOption('Class Details')"><i class="fas fa-info-circle"></i> Class Details</div>
                                    <div onclick="selectOption('Course Description')"><i class="fas fa-book"></i> Course Description</div>
                                    <div onclick="selectOption('Instructors')"><i class="fas fa-chalkboard-teacher"></i> Instructors</div>
                                    <div onclick="selectOption('Class Schedule')"><i class="fas fa-calendar-alt"></i> Class Schedule</div>
                                    <div onclick="selectOption('Enrollment')"><i class="fas fa-user-check"></i> Enrollment</div>
                                    <div onclick="selectOption('Eligibility')"><i class="fas fa-list"></i> Eligibility</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal-content">
                        <div id="Class Details" class="content-section class-details active">
                            
                            <div class="content-info-div">
                                <h3 class="content-info-attribute">Associated Term</h3>
                                <p class="content-info-text term"><i class="fa-solid fa-calendar-days"></i> Spring 2025</p>
                            </div>
                            
                            <div class="content-info-div">
                                <h3 class="content-info-attribute">CRN</h3>
                                <p class="content-info-text crn"><i class="fa-solid fa-hashtag"></i> 25792</p>
                            </div>
                            
                            <div class="content-info-div">
                                <h3 class="content-info-attribute">Campus</h3>
                                <p class="content-info-text campus"><i class="fa-solid fa-school"></i> Male Designated Area</p>
                            </div>
                            
                            <div class="content-info-div">
                                <h3 class="content-info-attribute">Instructional Method</h3>
                                <p class="content-info-text instructionalMethod"><i class="fa-solid fa-language"></i> English</p>
                            </div>
                            
                            <div class="content-info-div">
                                <h3 class="content-info-attribute">Course Subject</h3>
                                <p class="content-info-text subject"><i class="fa-solid fa-book"></i> Computer Science</p>
                            </div>
                            
                            <div class="content-info-div">
                                <h3 class="content-info-attribute">Credit Hours</h3>
                                <p class="content-info-text creditHours"><i class="fa-solid fa-clock"></i> 3 credit hours</p>
                            </div>
                        </div>

                        <div id="Course Description" class="content-section">
                            <div class="course-image">
                                <div class="hover-icon">
                                    <i class="fa-solid fa-eye"></i>
                                    <span class="hover-text">Learn More</span>
                                </div>
                                <i class="fa-solid fa-turn-up top-right-icon"></i>
                            </div>
                            
                            <div class="content-info-div">
                                <h3 class="content-info-attribute">What you'll learn</h3>
                                <p class="content-info-paragraph description">Concepts, protocols and enabling technologies related to the development of modern web applications. Fundamentals of designing and developing dynamic and interactive web applications using HTML and related standards, scripting languages, client-side and server-side programming. Hands-on Lab to design and develop Web applications.</p>
                            </div>

                            <div class="content-info-div">
                                <h3 class="content-info-attribute">Course Syllabus</h3>
                                <p class="content-info-paragraph attachment">
                                    <i class="fa-solid fa-file-pdf"></i> CMPS-350-Syllabus.pdf
                                </p>
                            </div>
                            
                        </div>

                        <div id="Instructors" class="content-section">
                            <div class="content-info-div instructors-container">
                                <h3 class="content-info-attribute">Course Instructors</h3>
                                <div class="instructors-list">
                                    <div class="instructor">
                                        <i class="fa-solid fa-user"></i>
                                        <div class="instructor-info">
                                            <span class="instructor-name">Prof. Hassen Abdullahi Mohamed</span>
                                            <span class="instructor-description">Associate Professor at College of Engineering, Computer Science Department</span>
                                        </div>
                                    </div>
                                    <div class="instructor">
                                        <i class="fa-solid fa-user"></i>
                                        <div class="instructor-info">
                                            <span class="instructor-name">Dr. Mahmoud Barhamgi</span>
                                            <span class="instructor-description">Associate Professor at College of Engineering, Computer Science Department</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div id="Class Schedule" class="content-section">
            
                            <div class="content-info-div class-schedule-container">
                                <div class="class-schedule">
                                    <h3 class="content-info-attribute">Class Schedule</h3>
                                    <div class="schedule">
                                        <i class="fa-solid fa-calendar-days"></i>
                                        <div class="schedule-info">
                                            <div class="weekdays">
                                                <span class="day active">S</span>
                                                <span class="day">M</span>
                                                <span class="day active">T</span>
                                                <span class="day">W</span>
                                                <span class="day">T</span>
                                                <span class="day">F</span>
                                                <span class="day">S</span>
                                            </div>
                                            <p class="date-range">01/19/2025 - 05/08/2025</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="content-info-div class-schedule-container">
                                <div class="class-location">
                                    <h3 class="content-info-attribute">Class Location</h3>
                                    <div class="location">
                                        <i class="fa-solid fa-location-dot"></i>
                                        <div class="location-info">
                                            <p class="time">08:00 AM - 08:50 AM</p>
                                            <p class="location-text">H07 - College of Engineering | Room C105</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                        </div>
                        
                        
                        <div id="Enrollment" class="content-section">
                            <div class="content-info-div enrollment-container">
                                <h3 class="content-info-attribute">Enrollment Information</h3>
                        
                                <div class="enrollment-info">
                                    <div class="enrollment-item">
                                        <i class="fa-solid fa-users"></i>
                                        <span class="label">Enrollment Actual:</span>
                                        <span class="value">40</span>
                                    </div>
                                    <div class="enrollment-item">
                                        <i class="fa-solid fa-user-group"></i>
                                        <span class="label">Enrollment Maximum:</span>
                                        <span class="value">40</span>
                                    </div>
                                    <div class="enrollment-item seats-available">
                                        <i class="fa-solid fa-chair"></i>
                                        <span class="label">Enrollment Seats Available:</span>
                                        <span class="value">0</span>
                                    </div>
                                </div>
                        
                                <p class="enrollment-note">Open for all students. Enrollment ends on <strong>March 1st</strong>.</p>
                            </div>
                        </div>
                        
                        <div id="Eligibility" class="content-section">
                            <div class="content-info-div eligibility-container">
                                <h3 class="content-info-attribute">Prerequisite Courses</h3>
                        
                                <div class="prerequisite-list">
                                    <div class="prerequisite-card">
                                        <div class="prerequisite-header">
                                            <span class="course-tag">CMPS 151</span>
                                        </div>
                                        <div class="prerequisite-details">
                                            <div class="letter-grade-container">
                                                <span class="letter-grade">C</span>
                                            </div>
                                            <div class="course-info">
                                                <p class="minimum-grade">Minimum Grade Required</p>
                                                <h3>Introduction to Programming</h3>
                                            </div>
                                        </div>
                                    </div>
                        
                                    <div class="prerequisite-card">
                                        <div class="prerequisite-header">
                                            <span class="course-tag">CMPS 251</span>
                                        </div>
                                        <div class="prerequisite-details">
                                            <div class="letter-grade-container">
                                                <span class="letter-grade">D</span>
                                            </div>
                                            <div class="course-info">
                                                <p class="minimum-grade">Minimum Grade Required</p>
                                                <h3>Object Oriented Programming</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        
                                <p class="eligibility-note">
                                    Students must complete the above courses before enrolling.
                                </p>
                            </div>
                        </div>
                        
                    </div>

                    <button class="register-btn">Register Class</button>
                </div>
            </div>
        `;
    }

    function openModal() {
        const modalContainer = document.getElementById("modalContainer");

        if (!document.getElementById("classDetailsModal")) {
            modalContainer.innerHTML = createModal();
            setupModalEvents();
        }

        document.querySelector("#classDetailsModal").style.display = "flex";
    }

    function closeModal() {
        const modal = document.querySelector("#classDetailsModal");
        if (modal) {
            modal.style.display = "none";
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    function setupModalEvents() {
        document.querySelectorAll(".close-modal").forEach(button => {
            button.addEventListener("click", closeModal);
        });

        document.querySelector("#classDetailsModal").addEventListener("click", function (event) {
            if (event.target === this) {
                closeModal();
            }
        });
    }

    function toggleDropdown() {
        const dropdown = document.querySelector(".dropdown");
        const dropdownMenu = document.querySelector(".dropdown-menu");
        const isOpen = dropdown.classList.contains("active");

        if (isOpen) {
            closeDropdown();
        } else {
            openDropdown();
        }
    }

    function openDropdown() {
        const dropdown = document.querySelector(".dropdown");
        const dropdownMenu = document.querySelector(".dropdown-menu");

        dropdown.classList.add("active");
        dropdownMenu.style.display = "block";

        document.addEventListener("click", closeDropdownOutside, true);
    }

    function closeDropdown() {
        const dropdown = document.querySelector(".dropdown");
        const dropdownMenu = document.querySelector(".dropdown-menu");

        dropdown.classList.remove("active");
        dropdownMenu.style.display = "none";

        document.removeEventListener("click", closeDropdownOutside, true);
    }

    function closeDropdownOutside(event) {
        const dropdown = document.querySelector(".dropdown");

        if (!dropdown.contains(event.target)) {
            closeDropdown();
        }
    }

    function selectOption(option) {
        document.querySelector("#selectedOption").textContent = option;

        closeDropdown();

        document.querySelectorAll(".content-section").forEach(section => {
            section.classList.remove("active");
        });

        document.getElementById(option).classList.add("active");
    }

    function setupDropdownEvents() {
        document.addEventListener("click", function (event) {
            if (!event.target.closest(".dropdown")) {
                closeDropdown();
            }
        });
    }

    window.openModal = openModal;
    window.toggleDropdown = toggleDropdown;
    window.openDropdown = openDropdown;
    window.closeDropdown = closeDropdown;
    window.selectOption = selectOption;

    setupDropdownEvents();
});
