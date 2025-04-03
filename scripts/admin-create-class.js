document.addEventListener("DOMContentLoaded", function() {
    let classForm=document.querySelector('#create-class-form');

    // Fetch both JSON files
    Promise.all([
        fetch("../assets/data/instructors.json").then(res => res.json()),
        fetch("../assets/data/courses.json").then(res => res.json())
    ])
    .then(([instructors, courses]) => {
        console.log("Instructors Loaded:", instructors);
        console.log("Courses Loaded:", courses);

        localStorage.setItem("instructors", JSON.stringify(instructors));
        localStorage.setItem("courses", JSON.stringify(courses));

    })

    let instructorsList = localStorage.getItem("instructors") ? JSON.parse(localStorage.getItem("instructors")) : [];
        let coursesList = localStorage.getItem("courses") ? JSON.parse(localStorage.getItem("courses")) : [];
  
        document.querySelector("#coursesDropdown").innerHTML = coursesList.map(course =>
            `<div onclick="selectOptionCourse('${course.courseId}')"><i class="fas fa-calendar-alt"></i>${course.courseId}</div>`
        ).join(' ');


    function selectOptionCourse(option) {
        document.querySelector("#selectedCourse").textContent = option;

        let wantedCourse = coursesList.find(c => c.courseId == option);
        let subject = wantedCourse.subject;

        document.querySelectorAll(".content-section").forEach(section => {
            section.classList.remove("active");
        });

        document.querySelector("#instructorDropdownMenu").innerHTML = instructorsList.filter(i => i.department == subject).map(instructor =>
            `<div onclick="selectOptionInstructor('${instructor.instructorId}')">${instructor.instructorId}</div>`
        ).join(' ');
        document.getElementById(option).classList.add("active");
    }

    function selectOptionInstructor(option) {
        document.querySelector("#selectedInstructor").textContent = option;

        document.querySelectorAll(".content-section").forEach(section => {
            section.classList.remove("active");
        });

        document.getElementById(option).classList.add("active");
    }

    function selectOptionCampus(option) {
        document.querySelector("#selectedCampus").textContent = option;

        document.querySelectorAll(".content-section").forEach(section => {
            section.classList.remove("active");
        });

        document.getElementById(option).classList.add("active");
    }

    document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
        toggle.addEventListener("click", function (event) {
            event.stopPropagation();
            let dropdownMenu = this.nextElementSibling;
            let rect = this.getBoundingClientRect();
  
            document.querySelectorAll(".dropdown-menu").forEach(menu => {
                if (menu !== dropdownMenu) menu.style.display = "none";
            });
  
            let isOpen = dropdownMenu.style.display === "block";
            dropdownMenu.style.display = isOpen ? "none" : "block";
  
            if (!isOpen) {
                dropdownMenu.style.setProperty("--dropdown-top", `${rect.bottom}px`);
                dropdownMenu.style.setProperty("--dropdown-left", `${rect.left}px`);
            }
        });
    });

    document.addEventListener("click", function () {
        document.querySelectorAll(".dropdown-menu").forEach(menu => {
            menu.style.display = "none";
        });
    });

    window.selectOptionCourse = selectOptionCourse;
    window.selectOptionInstructor = selectOptionInstructor;
    window.selectOptionCampus = selectOptionCampus;
 })