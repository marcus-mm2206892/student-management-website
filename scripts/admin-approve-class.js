document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.getElementById("searchBar");
  const tableHead = document.querySelector("#tableHead");
  const tableHeadRow = tableHead.querySelectorAll("tr")[1];
  const tableBody = document.getElementById("data-output");
  const noResults = document.getElementById("noResults");
  const searchInfo = document.getElementById("searchInfo");

  let allCourses = JSON.parse(localStorage.getItem("courses"));
  let allClasses = JSON.parse(localStorage.getItem("classes"));
  let allUsers = JSON.parse(localStorage.getItem("users"));

  allClasses.sort((a, b) => b.enrollmentActual - a.enrollmentActual);
  renderClasses(allClasses.filter(cls => cls.classStatus?.toLowerCase() !== "completed"));

  function renderClasses(allClasses) {
    try {
      let out = "";
      allClasses.forEach((classItem) => {
        let course = allCourses.find(
          (crs) => crs.courseId == classItem.courseId
        );
        if (!course) return;

        let classStatus = (classItem.classStatus || "pending").toLowerCase();
        let statusClass =
          {
            open: "status-approved",
            closed: "status-rejected",
            pending: "status-pending",
          }[classStatus] || "status-default";

        let instructorNames =
          (classItem.instructors || [])
            .map((email) => {
              const user = allUsers.find((u) => u.email === email);
              return user ? `${user.firstName} ${user.lastName}` : email;
            })
            .join("<br>") || "TBA";

        out += `
          <tr class="course-row open-modal" data-class-id="${
            classItem.classId
          }">
            <td class="data course-no"><span>${course.courseId}</span></td>
            <td class="data course-name"><span>${course.courseName}</span></td>
            <td class="data course-instructor"><span>${instructorNames}</span></td>
            <td class="data course-section"><span>${
              classItem.section
            }</span></td>
            <td class="data course-enrollment"><span>${
              classItem.enrollmentActual
            }/${classItem.enrollmentMaximum}</span></td>
            <td class="data course-status">
              <span class="status-badge ${statusClass}">
                <span class="status-circle"></span>
                ${classStatus.charAt(0).toUpperCase() + classStatus.slice(1)}
              </span>
            </td>
            <td>
              <select class="status-dropdown" data-classId="${
                classItem.classId
              }" data-numberOfStudents="${classItem.enrollmentActual}">
                <option value="open" ${
                  classStatus === "open" ? "selected" : ""
                }>Approve</option>
                <option value="pending" ${
                  classStatus === "pending" ? "selected" : ""
                }>Pending</option>
                <option value="closed" ${
                  classStatus === "closed" ? "selected" : ""
                }>Rejected</option>
              </select>
            </td>
          </tr>`;
      });

      tableBody.innerHTML = out;
      attachDropdownListeners();
      attachModalListeners();

      if (typeof adjustTableColumns === "function") {
        adjustTableColumns();
      }
    } catch (error) {
      console.error("Error fetching course/class data:", error);
      tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: red;">Failed to load courses.</td></tr>`;
    }
  }

  function attachDropdownListeners() {
    document.querySelectorAll(".status-dropdown").forEach((dropdown) => {
      dropdown.addEventListener("change", function () {
        const selectedStatus = this.value;
        const classId = this.getAttribute("data-classId");
        const numberOfStudents = parseInt(
          this.getAttribute("data-numberOfStudents")
        );

        // Prevent approving classes with fewer than 5 students
        if (selectedStatus === "open" && numberOfStudents < 5) {
          openAlertModal(
            "Approval Error",
            "Minimum of 5 students required to approve a class."
          );
          this.value = "pending"; // revert back to pending
          return;
        }

        openAlertModal(
          "Status Changed",
          `You changed the class status to "${selectedStatus.toUpperCase()}".`
        );

        // Update status
        const updatedStatus = selectedStatus;
        allClasses = allClasses.map((cls) => {
          if (cls.classId == classId) {
            return { ...cls, classStatus: updatedStatus };
          }
          return cls;
        });

        localStorage.setItem("classes", JSON.stringify(allClasses));
        renderClasses(allClasses);
      });
    });
  }

  function attachModalListeners() {
    document.querySelectorAll(".open-modal").forEach((el) => {
      el.addEventListener("click", function () {
        const classId = this.dataset.classId;
        if (
          classId &&
          typeof openClassModal === "function" &&
          this.querySelector(".status-dropdown") !== document.activeElement
        ) {
          openClassModal(classId);
        }
      });
    });
  }

  searchBar.addEventListener("input", function () {
    let searchQuery = searchBar.value.toLowerCase().trim();
    let rows = document.querySelectorAll(".course-row");
    let matchCount = 0;

    rows.forEach((row) => {
      let courseNo = row.querySelector(".course-no").textContent.toLowerCase();
      let courseName = row
        .querySelector(".course-name")
        .textContent.toLowerCase();
      let instructor = row
        .querySelector(".course-instructor")
        .textContent.toLowerCase();
      let section = row
        .querySelector(".course-section")
        .textContent.toLowerCase();

      if (
        courseNo.includes(searchQuery) ||
        courseName.includes(searchQuery) ||
        instructor.includes(searchQuery) ||
        section.includes(searchQuery)
      ) {
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

    tableHeadRow
      .querySelectorAll("th")
      .forEach((th) => (th.style.display = ""));
    tableBody.querySelectorAll("tr").forEach((row) => {
      row.querySelectorAll("td").forEach((td) => (td.style.display = ""));
    });

    if (windowWidth < 840) hideColumn("course-instructor");
    if (windowWidth < 740) hideColumn("course-enrollment");
    if (windowWidth < 640) hideColumn("course-section");
    if (windowWidth < 550) hideColumn("course-name");
    if (windowWidth < 430) hideColumn("course-status");
  }

  function hideColumn(className) {
    let th = tableHeadRow.querySelector(`.${className}`);
    if (th) th.style.display = "none";

    tableBody.querySelectorAll("tr").forEach((row) => {
      let td = row.querySelector(`.${className}`);
      if (td) td.style.display = "none";
    });
  }

  window.addEventListener("resize", adjustTableColumns);
  adjustTableColumns();

  const statusOrders = [
    ["open", "pending", "closed"],
    ["pending", "closed", "open"],
    ["closed", "open", "pending"],
  ];

  document.querySelector(".course-status").addEventListener("click", () => {
    const timesClicked = JSON.parse(localStorage.getItem("timesClicked")) ?? 0;
    localStorage.setItem("timesClicked", timesClicked + 1);

    const currentOrder = statusOrders[timesClicked % statusOrders.length];
    const currentPriority = Object.fromEntries(
      currentOrder.map((status, index) => [status, index + 1])
    );

    allClasses.sort((a, b) => {
      const aPriority = currentPriority[a.classStatus] ?? 99;
      const bPriority = currentPriority[b.classStatus] ?? 99;
      return aPriority - bPriority;
    });

    renderClasses(allClasses);
  });
});
