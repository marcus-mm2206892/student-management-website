document.addEventListener("DOMContentLoaded", function () {
  const searchBar = document.querySelector("#searchBar");
  const tableHead = document.querySelector("#tableHead");
  const tableHeadRow = tableHead.querySelectorAll("tr")[1]; // second row (actual column headers)
  const tableBody = document.querySelector("#data-output");
  const searchInfo = document.querySelector("#searchInfo");
  const registerTable = document.querySelector(".register-table");

  let allCourses = JSON.parse(localStorage.getItem("courses"));
  let allClasses = JSON.parse(localStorage.getItem("classes"));
  let allStudents = JSON.parse(localStorage.getItem("students"));
  let allUsers = JSON.parse(localStorage.getItem("users"));

  console.log("Courses Loaded:", allCourses);

  console.log("Classes Loaded:", allClasses);

  console.log("Users Loaded:", allUsers);

  try {
    let out = "";

    allClasses.sort((a, b) => b.enrollmentActual - a.enrollmentActual);
    allClasses.forEach((classItem) => {
      let course = allCourses.find((c) => c.courseId === classItem.courseId);
      if (!course) return;

      const instructorNames =
        (classItem.instructors || [])
          .map((email) => {
            const user = allUsers.find((u) => u.email === email);
            return user ? `${user.firstName} ${user.lastName}` : email;
          })
          .join("<br>") || "TBA";
      const status = classItem.classStatus?.toLowerCase() || "unknown";

      let statusClass = "";
      let buttonText = "";
      let buttonDisabled = "";

      switch (status) {
        case "open":
          statusClass = "status-approved";
          if (classItem.enrollmentActual >= classItem.enrollmentMaximum) {
            buttonDisabled = "disabled";
            buttonText = "Full";
          } else {
            buttonText = "Register";
          }
          break;
        case "closed":
          statusClass = "status-rejected";
          buttonText = "N/A";
          buttonDisabled = "disabled";
          break;
        case "pending":
          statusClass = "status-pending";
          buttonText = "Closed";
          buttonDisabled = "disabled";
          break;
        default:
          statusClass = "status-default";
          buttonText = "N/A";
          buttonDisabled = "disabled";
      }

      out += `
    <tr class="course-row">
      <td class="data course-no"><span>${course.courseId}</span></td>
      <td class="data course-name"><span>${course.courseName}</span></td>
      <td class="data course-instructor"><span>${instructorNames}</span></td>
      <td class="data course-section"><span>${classItem.section}</span></td>
      <td class="data course-enrollment"><span>${classItem.enrollmentActual}/${
        classItem.enrollmentMaximum
      }</span></td>
      <td class="data course-status">
        <span class="status-badge ${statusClass}">
          <span class="status-circle"></span>
          ${status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>
      <td>
        <button class="course-button"
          data-classid="${classItem.classId}"
          data-courseid="${course.courseId}"
          ${buttonDisabled}>
          <strong><span>${buttonText}</span></strong>
        </button>
      </td>
    </tr>
  `;
    });

    tableBody.innerHTML = out;

    console.log("Courses successfully loaded into table.");

    if (typeof adjustTableColumns === "function") {
      adjustTableColumns();
    }
  } catch (error) {
    console.error("Error fetching course/class data:", error);
    failedToLoad.style.display = "flex";
    registerTable.style.display = "none";
  }

  // search functionality
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

  // adjust table columns based on screen width
  function adjustTableColumns() {
    let windowWidth = window.innerWidth;

    // reset all columns before hiding
    tableHeadRow
      .querySelectorAll("th")
      .forEach((th) => (th.style.display = ""));
    tableBody.querySelectorAll("tr").forEach((row) => {
      row.querySelectorAll("td").forEach((td) => (td.style.display = ""));
    });

    // hide the columns progressively based on screen width
    if (windowWidth < 800) {
      hideColumn("course-instructor");
    }
    if (windowWidth < 700) {
      hideColumn("course-enrollment");
    }
    if (windowWidth < 600) {
      hideColumn("course-section");
    }
    if (windowWidth < 520) {
      hideColumn("course-name");
    }
    if (windowWidth < 400) {
      hideColumn("course-status");
    }
  }

  // function to hide table headers and corresponding data columns
  function hideColumn(className) {
    let th = tableHeadRow.querySelector(`.${className}`);
    if (th) th.style.display = "none"; // hide the table header

    tableBody.querySelectorAll("tr").forEach((row) => {
      let td = row.querySelector(`.${className}`);
      if (td) td.style.display = "none"; // hide the corresponding data cell
    });
  }

  // run adjustments on window resize
  window.addEventListener("resize", adjustTableColumns);

  // initial call on page load
  adjustTableColumns();

  document.addEventListener("click", function (event) {
    if (event.target.closest(".course-button")) {
      let button = event.target.closest(".course-button");
      let courseId = button.getAttribute("data-courseid");
      let classId = button.getAttribute("data-classid");

      handleCourseRegistration(courseId, classId);
    }
  });

  //when clicked, should display a modal about the class
  document.addEventListener("click", function (event) {
    if (event.target.closest(".course-row")) {
      let row = event.target.closest(".course-row");
      //    alert("Row clicked! ")
    }
  });

  function handleCourseRegistration(courseId, classId) {
    const user = JSON.parse(localStorage.loggedInUser);
    const student = allStudents.find((s) => s.email == user.email);
    const allEnrollments = JSON.parse(
      localStorage.getItem("courseEnrollments")
    );
    console.log(allEnrollments);

    //1. Check if the student has already enrolled in that course/section

    const index = allEnrollments.findIndex(
      (e) => e.studentId == student.studentId && e.courseId == courseId
    );

    if (index != -1) {
      alert(
        `ERROR: You are already Registered in a section the Course ID: ${courseId}`
      );
      return;
    }

    //2. Check if the student has passed the pre-req for that course
    const preRequesites = allCourses.find(
      (c) => c.courseId == courseId
    ).prerequisites;
    console.log(preRequesites);

    completedCourses = student.completedCourses;
    console.log(completedCourses);

    const passedPreReq = preRequesites.every((course) =>
      completedCourses.includes(course)
    ); //Checking if pre-requisites are passed
    console.log(passedPreReq);

    if (passedPreReq) {
      //3. Create courseEnrollment object
      const courseEnrollment = {
        enrollmentId: Date.now(),
        studentId: student.studentId,
        classId: classId,
        courseId: courseId, //Not in the class diagram
        status: "Enrolled",
        courseGrade: 0,
        letterGrade: "NA",
      };
      console.log(courseEnrollment);

      //      - Update the No of enrollement of the class
      const updateClasses = allClasses.map((cls) => {
        if (cls.classId == classId) {
          return { ...cls, enrollmentActual: cls.enrollmentActual + 1 };
        } else {
          return cls;
        }
      });

      console.log(updateClasses);

      //      - Save course enrollment and classes in the local storge
      localStorage.setItem("classes", JSON.stringify(updateClasses));

      allEnrollments.push(courseEnrollment);
      localStorage.setItem("courseEnrollments", JSON.stringify(allEnrollments));
      alert(
        `Succesfully registered for class ${classId}, of course ${courseId}.`
      );

      location.reload(); //Refresh the table
    } else {
      alert(
        `The pre-requisite for the course ${courseId} has not been completed.`
      ); //Do styling
    }
  }
});
