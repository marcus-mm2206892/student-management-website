document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const tableHead = document.querySelector("#tableHead");
    const tableHeadRow = tableHead.querySelectorAll("tr")[1];
    const tableBody = document.getElementById("data-output");
    const noResults = document.getElementById("noResults");
    const searchInfo = document.getElementById("searchInfo");

    let allCourses = JSON.parse(localStorage.getItem("courses"));
    let allClasses = JSON.parse(localStorage.getItem("classes"));

    console.log(allClasses)

    try {
        let out = "";
        allCourses.forEach(course => {
            let classDetails = allClasses   .find(cls => course.currentClasses.includes(cls.classId));
            let classStatus = classDetails ? classDetails.classStatus.toLowerCase() : "unknown";

            let statusClass = "";
            switch (classStatus) {
                case "open":
                    statusClass = "status-approved";
                    break;
                case "closed":
                    statusClass = "status-rejected";
                    break;
                case "pending":
                    statusClass = "status-pending";
                    break;
                default:
                    statusClass = "status-default";
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
                <td>
                    <select class="status-dropdown" data-course-id="${course.courseId}">
                        <option value="approved" ${classStatus === "open" ? "selected" : ""}>Approve</option>
                        <option value="pending" ${classStatus === "pending" ? "selected" : ""}>Pending</option>
                        <option value="rejected" ${classStatus === "closed" ? "selected" : ""}>Rejected</option>
                    </select>
                </td>
            </tr>`;
        });

        tableBody.innerHTML = out;
        console.log("Courses successfully loaded into table.");

        attachDropdownListeners();

        if (typeof adjustTableColumns === "function") {
            adjustTableColumns();
        }

      } catch (error) {
        console.error("Error fetching course/class data:", error);
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: red;">Failed to load courses.</td></tr>`;
    }

    function attachDropdownListeners() {
        document.querySelectorAll(".status-dropdown").forEach(dropdown => {
            dropdown.addEventListener("change", function () {
                const selectedStatus = this.value;
                const courseId = this.getAttribute("data-course-id");
                console.log(`Course ID: ${courseId} | New Status: ${selectedStatus}`);

                const row = this.closest("tr");
                const statusBadge = row.querySelector(".status-badge");

                const statusText = selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1);
                statusBadge.innerHTML = `<span class="status-circle"></span>${statusText}`;

                statusBadge.classList.remove("status-approved", "status-pending", "status-rejected");
                if (selectedStatus === "approved") statusBadge.classList.add("status-approved");
                if (selectedStatus === "pending") statusBadge.classList.add("status-pending");
                if (selectedStatus === "rejected") statusBadge.classList.add("status-rejected");
            });
        });
    }

    // Searchbar query funcitonality
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

    function adjustTableColumns() {
        let windowWidth = window.innerWidth;

        tableHeadRow.querySelectorAll("th").forEach(th => th.style.display = "");
        tableBody.querySelectorAll("tr").forEach(row => {
            row.querySelectorAll("td").forEach(td => td.style.display = "");
        });

        if (windowWidth < 820) {
            hideColumn("course-instructor");
        }
        if (windowWidth < 720) {
            hideColumn("course-enrollment");
        }
        if (windowWidth < 620) {
            hideColumn("course-section");
        }
        if (windowWidth < 530) {
            hideColumn("course-name");
        }
        if (windowWidth < 410) {
            hideColumn("course-status");
        }
    }

    function hideColumn(className) {
        let th = tableHeadRow.querySelector(`.${className}`);
        if (th) th.style.display = "none";

        tableBody.querySelectorAll("tr").forEach(row => {
            let td = row.querySelector(`.${className}`);
            if (td) td.style.display = "none";
        });
    }

    window.addEventListener("resize", adjustTableColumns);
    adjustTableColumns();
});
