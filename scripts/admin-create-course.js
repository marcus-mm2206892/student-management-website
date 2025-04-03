document.addEventListener("DOMContentLoaded", function() {
    let courseForm=document.querySelector('#create-course-form');

    // Fetch both JSON files
    Promise.all([
        fetch("../assets/data/majors.json").then(res => res.json()),
        fetch("../assets/data/courses.json").then(res => res.json())
    ])
    .then(([majors, courses]) => {
        console.log("Majors Loaded:", majors);
        console.log("Courses Loaded:", courses);
        
        document.querySelector("#subjectDropdown").innerHTML = majors.map(major =>
            `<div onclick="selectOption('${major.majorName}')"><i class="fas fa-book"></i>${major.majorName}</div>`
        ).join(' ');

        document.querySelector("#prereqDropdown").innerHTML = courses.map(course =>
            `<div onclick="addTag(this, 'prereq')">${course.courseId}</div>`
        ).join(' ');

        document.querySelector("#majorsDropdown").innerHTML = majors.map(major =>
            `<div onclick="addTag(this, 'major')">${major.majorName}</div>`
        ).join(' ');
    })

    function selectOption(option) {
        document.querySelector("#selectedSubject").textContent = option;

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

    document.addEventListener("submit", function (event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const courseFormObject = Object.fromEntries(data);

        const course = {
            courseId: `${Date.now()}`,
            courseName: courseFormObject["courseName"],
            creditHours: courseFormObject["creditHours"],
            // subject:,
            courseNumber: courseFormObject["courseNumber"],
            // prerequisites:,
            // majorsOffered:,
            description: courseFormObject["description"]
        }

        allCourses.push(course);

        localStorage.courses = JSON.stringify(allCourses);
        courseForm.reset();
    })

    window.selectOption = selectOption;
 })