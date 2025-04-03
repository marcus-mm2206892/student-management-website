document.addEventListener("DOMContentLoaded", function() {
    let classForm=document.querySelector('#create-class-form');

    // Fetch both JSON files
    Promise.all([
        fetch("../assets/data/instructors.json").then(res => res.json()),
        fetch("../assets/data/courses.json").then(res => res.json()),
        fetch("../assets/data/users.json").then(res => res.json())
    ])
    .then(([instructors, courses, users]) => {
        console.log("Instructors Loaded:", instructors);
        console.log("Courses Loaded:", courses);

        localStorage.setItem("instructors", JSON.stringify(instructors));
        localStorage.setItem("courses", JSON.stringify(courses));
        localStorage.setItem("users", JSON.stringify(users))
    })

    let instructorsList = localStorage.getItem("instructors") ? JSON.parse(localStorage.getItem("instructors")) : [];
    let coursesList = localStorage.getItem("courses") ? JSON.parse(localStorage.getItem("courses")) : [];
    let usersList = localStorage.getItem("users") ? JSON.parse(localStorage.getItem('users')) : [];

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

        let filteredInstructors = instructorsList.filter(i => i.department == subject);
        console.log(filteredInstructors);

        let mappedUsers = usersList
        .filter(u => filteredInstructors.some(i => i.email === u.email));

        let instructorNames = mappedUsers.map(user => `${user.firstName} ${user.lastName}`);
        console.log(instructorNames);

        document.querySelector("#selectedInstructor").textContent = "Select Instructor(s)";
        
        document.querySelector("#instructorDropdownMenu").innerHTML = instructorNames.map(instructor =>
            `<div onclick="selectOptionInstructor('${instructor}')">${instructor}</div>`
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

    const timeSlots = [
        "08:00", "08:15", "08:30", "08:45",
        "09:00", "09:15", "09:30", "09:45",
        "10:00", "10:15", "10:30", "10:45",
        "11:00", "11:15", "11:30", "11:45",
        "12:00", "12:15", "12:30", "12:45",
        "13:00", "13:15", "13:30", "13:45",
        "14:00", "14:15", "14:30", "14:45",
        "15:00", "15:15", "15:30", "15:45",
        "16:00", "16:15", "16:30", "16:45",
        "17:00", "17:15", "17:30", "17:45",
        "18:00", "18:15", "18:30", "18:45",
        "19:00", "19:15", "19:30", "19:45"
    ];

    function selectOptionSchedType(option) {
        document.querySelector("#selectedSchedType").textContent = option;

        document.querySelectorAll(".content-section").forEach(section => {
            section.classList.remove("active");
        });

        document.querySelector("#startTimeDropdownMenu").innerHTML = timeSlots.map(timeSlot =>
            `<div onclick="selectStartTime('${timeSlot}')">${timeSlot}</div>`
        ).join(' ');

        document.querySelector("#endTimeDropdownMenu").innerHTML = timeSlots.map(timeSlot =>
            `<div onclick="selectEndTime('${timeSlot}')">${timeSlot}</div>`
        ).join(' ');

        document.getElementById(option).classList.add("active");
    }

    function selectStartTime(option) {
        document.querySelector("#selectedStartTime").textContent = option;

        document.querySelectorAll(".content-section").forEach(section => {
            section.classList.remove("active");
        });

        document.getElementById(option).classList.add("active");
    }

    function selectEndTime(option) {
        document.querySelector("#selectedEndTime").textContent = option;

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
    window.selectOptionSchedType = selectOptionSchedType;
    window.selectStartTime = selectStartTime;
    window.selectEndTime = selectEndTime;
    window.selectOptionCampus = selectOptionCampus;
 })