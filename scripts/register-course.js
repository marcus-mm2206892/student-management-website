document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const tableHead = document.querySelector("#tableHead");
    const tableHeadRow = tableHead.querySelectorAll("tr")[1]; // second row (actual column headers)
    const tableBody = document.getElementById("data-output");
    const noResults = document.getElementById("noResults");
    const searchInfo = document.getElementById("searchInfo");

    // define the columns in order of importance (least to most)
    const columnClasses = [
        "course-schedule",   // Least important, remove first
        "course-instructor",
        "course-enrollment",
        "course-section"
    ];

    // fetch and populate table
    fetch("../assets/data/courses.json")
        .then(response => response.json())
        .then(allCourses => {
            let out = "";
            allCourses.forEach(course => {
                out += `
                <tr class="course-row">
                    <td class="course-no">${course.courseId}</td>
                    <td class="course-name">${course.courseName}</td>
                    <td class="course-instructor">${course.instructor || "TBA"}</td>
                    <td class="course-section">L01</td>
                    <td class="course-enrollment">33/40</td>
                    <td><p class="status">Not Approved</p></td>
                    <td class="course-schedule">MON-WED</td>
                    <td>
                        <button><strong>Register</strong></button>
                    </td>
                </tr>`;
            });
            tableBody.innerHTML = out;
            adjustTableColumns(); // ensure responsiveness after data is loaded
        });

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
