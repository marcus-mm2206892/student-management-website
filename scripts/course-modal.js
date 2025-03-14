document.addEventListener("DOMContentLoaded", function () {

    function createCourseModal() {
        return `
            <div id="courseModal" class="modal">
                <div class="modal-popup">
                    <button class="close-btn close-modal">
                        <i class="fa-solid fa-xmark"></i>
                    </button>

                    <div class="course-image">
                        <div class="hover-icon">
                            <i class="fa-solid fa-eye"></i>
                            <span class="hover-text">View Course</span>
                        </div>
                    </div>

                    <div class="modal-content">
                        <div class="course-title-div">
                            <h2 class="course-title">Web Development Fundamentals</h2>
                            <div class="course-tags-div">
                                <span class="course-tag">CMPS 350</span>
                            </div>
                        </div>

                        <div class="course-info">
                            <p class="content-info-text subject"><i class="fa-solid fa-book"></i> Computer Science</p>
                            <p class="content-info-text credit-hours"><i class="fa-solid fa-clock"></i> 3 Credit Hours</p>
                        </div>

                        <div class="course-description">
                            <h3 class="content-info-attribute">What You'll Learn</h3>
                            <p class="content-info-paragraph description">
                                Concepts, protocols and enabling technologies related to the development of modern web applications. Fundamentals of designing and developing dynamic and interactive web applications using HTML and related standards, scripting languages, client-side and server-side programming. Hands-on Lab to design and develop Web applications.
                            </p>
                        </div>

                        <div class="prerequisite-courses">
                            <h3 class="content-info-attribute">Prerequisites</h3>
                            <div class="prerequisite-tags">
                                <span class="course-tag">CMPS 151</span>
                                <span class="course-tag">CMPS 251</span>
                            </div>
                        </div>
                    </div>

                    <button class="register-btn" onclick="goToRegistration()">Go to Registration</button>
                </div>
            </div>
        `;
    }

    function openModal() {
        if (!document.getElementById("courseModal")) {
            document.body.insertAdjacentHTML("beforeend", createCourseModal());
            setupModalEvents();
        }
        document.querySelector("#courseModal").style.display = "flex";
    }

    function closeModal() {
        const modal = document.querySelector("#courseModal");
        if (modal) {
            modal.style.opacity = "0";
            setTimeout(() => modal.remove(), 300);
        }
    }

    function setupModalEvents() {
        document.querySelectorAll(".close-modal").forEach(button => {
            button.addEventListener("click", closeModal);
        });

        document.querySelector("#courseModal").addEventListener("click", function (event) {
            if (event.target === this) {
                closeModal();
            }
        });
    }

    function goToRegistration() {
        window.location.href = "register-course.html";
    }

    // Expose functions globally
    window.openModal = openModal;
    window.goToRegistration = goToRegistration;
});
