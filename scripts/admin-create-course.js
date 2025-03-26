 document.addEventListener("DOMContentLoaded", function() {
    let courseForm=document.querySelector('#create-course-form');

    let allMajors = [];
    let allCourses = [];

    // Fetching Majors...
    fetch("../assets/data/majors.json")
        .then(res => res.json())
        .then(data => {
            allMajors = data;
        });

    // Fetching Courses...
    fetch("../assets/data/courses.json")
        .then(res => res.json())
        .then(data => {
            allCourses = data;
        });

    // Fetch both JSON files
    Promise.all([
        fetch("../assets/data/major.json").then(res => res.json()),
        fetch("../assets/courses.json").then(res => res.json())
    ])
    .then(([majors, courses]) => {
        console.log("Majors Loaded:", majors);
        console.log("Courses Loaded:", courses);
        

    })

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
 })