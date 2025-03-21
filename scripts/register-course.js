document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const tableHead = document.querySelector("#tableHead");
    const tableHeadRow = tableHead.querySelectorAll("tr")[1]; // second row (actual column headers)
    const tableBody = document.getElementById("data-output");
    const noResults = document.getElementById("noResults");
    const searchInfo = document.getElementById("searchInfo");

    // Fetch both JSON files
    Promise.all([
        fetch("../assets/data/courses.json").then(res => res.json()),
        fetch("../assets/data/classes.json").then(res => res.json())
    ])
    .then(([courses, classes]) => {
        console.log("Courses Loaded:", courses);
        console.log("Classes Loaded:", classes);

        let out = "";
        courses.forEach(course => {
            let classDetails = classes.find(cls => course.currentClasses.includes(cls.classId));
            let classStatus = classDetails ? classDetails.classStatus.toLowerCase() : "unknown";

            let statusClass = "";
            let buttonText = "";
            let buttonDisabled = "";

            switch (classStatus) {
                case "open":
                    statusClass = "status-approved";
                    buttonText = "Register";
                    buttonDisabled = "";
                    break;
                case "closed":
                    statusClass = "status-rejected";
                    buttonText = "N/A";
                    buttonDisabled = "disabled";
                    break;
                case "pending":
                    statusClass = "status-pending";
                    buttonText = "Waitlist";
                    buttonDisabled = "disabled";
                    break;
                default:
                    statusClass = "status-default";
                    buttonText = "N/A";
                    buttonDisabled = "disabled";
                    break;
            }

            out += `
            <tr class="course-row">
                <td class="data course-no"><span>${course.courseId}</span></td>
                <td class="data course-name"><span>${course.courseName}</span></td>
                <td class="data course-instructor"><span>${course.instructor || "TBA"}</span></td>
                <td class="data course-section"><span>L01</span></td>
                <td class="data course-enrollment"><span>${classDetails ? classDetails.enrollmentActual + "/" + classDetails.enrollmentMaximum : "0/0"}</span></td>
                <td class="data course-status">
                    <span class="status-badge ${statusClass}">
                        <span class="status-circle"></span>
                        ${classStatus.charAt(0).toUpperCase() + classStatus.slice(1)}
                    </span>
                </td>
                <td class="data course-schedule"><span>MON-WED</span></td>
                <td>
                    <button class="course-button" data-course-id=${course.courseId} ${buttonDisabled}>
                        <strong><span>${buttonText}</span></strong>
                    </button>
                </td>
            </tr>`;
        });

        tableBody.innerHTML = out;
        console.log("Courses successfully loaded into table.");

        if (typeof adjustTableColumns === "function") {
            adjustTableColumns();
        }
    })
    .catch(error => {
        console.error("Error fetching course/class data:", error);
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: red;">Failed to load courses.</td></tr>`;
    });

    //Getting class info by clicking on register button

    //1st way

    document.querySelectorAll(".course-button").forEach(button => {
        button.addEventListener("onclick", function () {
            console.log("Button clicked!!!")
            let courseId = this.getAttribute("data-course-id");
            alert("You registered for course: " + courseId);
        });
    });
    
    //2nd alternative way

    // document.getElementById("data-output").addEventListener("click", function (event) {
    //     if (event.target.closest(".course-button")) {
    //         let button = event.target.closest(".course-button");
    //         let courseId = button.getAttribute("data-course-id");
    //         alert("You registered for course: " + courseId);
    //     }

    //     //Get the user info, the class info and create the course enrollemnt object
    //     const couseEnrollment = {
    //         studentId : JSON.parse(localStorage.loggedInUser).studentID,
    //         courseId : courseId,
    //         status: '',
    //         courseGrade: 0,
    //         letterGrade: ""
    //     }

    //     console.log(couseEnrollment);
    // });

    // search functionality
    searchBar.addEventListener("input", function () {
        let searchQuery = searchBar.value.toLowerCase().trim();
        let rows = document.querySelectorAll(".course-row");
        let matchCount = 0;

        rows.forEach(row => {
            let courseNo = row.querySelector(".course-no").textContent.toLowerCase();
            let courseName = row.querySelector(".course-name").textContent.toLowerCase();
            let instructor = row.querySelector(".course-instructor").textContent.toLowerCase();
            let section = row.querySelector(".course-section").textContent.toLowerCase();

            if (courseNo.includes(searchQuery) || 
                courseName.includes(searchQuery) || 
                instructor.includes(searchQuery) || 
                section.includes(searchQuery)) {
                row.style.display = "";
                matchCount++;
            } else {
                row.style.display = "none";
            }
        });

        if (matchCount > 0) {
            noResults.style.display = "none";
            tableBody.style.display = "table-row-group";
            tableHeadRow.style.display = "table-row";
            searchInfo.innerHTML = `<p>Showing <strong>${matchCount}</strong> result(s) for "<em>${searchQuery}</em>"</p>`;
            searchInfo.style.display = "block";
        } else {
            tableBody.style.display = "none";
            noResults.style.display = "flex";
            tableHeadRow.style.display = "none";
            searchInfo.style.display = "none";
        }

        if (searchQuery === "") {
            searchInfo.style.display = "none";
            tableBody.style.display = "table-row-group";
            tableHeadRow.style.display = "table-row";
            noResults.style.display = "none";
        }
    });

    // adjust table columns based on screen width
    function adjustTableColumns() {
        let windowWidth = window.innerWidth;

        // reset all columns before hiding
        tableHeadRow.querySelectorAll("th").forEach(th => th.style.display = "");
        tableBody.querySelectorAll("tr").forEach(row => {
            row.querySelectorAll("td").forEach(td => td.style.display = "");
        });

        // hide the columns progressively based on screen width
        if (windowWidth < 1000) {
            hideColumn("course-schedule");
        }
        if (windowWidth < 800) {
            hideColumn("course-instructor");
        }
        if (windowWidth < 650) {
            hideColumn("course-enrollment");
        }
        if (windowWidth < 550) {
            hideColumn("course-section");
        }
        if (windowWidth < 450) {
            hideColumn("course-name");
        }
    }

    // function to hide table headers and corresponding data columns
    function hideColumn(className) {
        let th = tableHeadRow.querySelector(`.${className}`);
        if (th) th.style.display = "none"; // hide the table header

        tableBody.querySelectorAll("tr").forEach(row => {
            let td = row.querySelector(`.${className}`);
            if (td) td.style.display = "none"; // hide the corresponding data cell
        });
    }

    // run adjustments on window resize
    window.addEventListener("resize", adjustTableColumns);

    // initial call on page load
    adjustTableColumns();
});
