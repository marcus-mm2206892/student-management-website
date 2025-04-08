document.addEventListener("DOMContentLoaded", function () {
  const user = JSON.parse(localStorage.loggedInUser);

  let classes = [],
    instructors = [],
    students = [],
    courses = [],
    users = [];

  Promise.all([
    fetch("../assets/data/classes.json").then((res) => res.json()),
    fetch("../assets/data/instructors.json").then((res) => res.json()),
    fetch("../assets/data/students.json").then((res) => res.json()),
    fetch("../assets/data/courses.json").then((res) => res.json()),
    fetch("../assets/data/users.json").then((res) => res.json()),
  ]).then(
    ([classesData, instructorsData, studentsData, coursesData, usersData]) => {
      classes = classesData;
      instructors = instructorsData;
      students = studentsData;
      courses = coursesData;
      users = usersData;

      const instructor = instructors.find((i) => i.email === user.email);
      const instructorClasses = classes.filter((c) =>
        c.instructors.includes(instructor.email)
      );

      const instructorClassesWithName = instructorClasses.map((ic) => {
        const course = courses.find(
          (course) => course.courseId === ic.courseId
        );
        return { ...ic, courseName: course?.courseName || "Unnamed Course" };
      });

      document.querySelector(
        "#no-of-classes"
      ).innerHTML = `<span>${instructorClasses.length} Classes</span>`;

      const currentTeaching = document.querySelector(
        "#current-teaching-classes"
      );
      currentTeaching.innerHTML = instructorClassesWithName
        .map(
          (ic) => `
        <div class="card" data-classid="${ic.classId}" data-courseid="${ic.courseId}" data-section="${ic.section}" data-coursename="${ic.courseName}">
          <div class="course-header">
            <span class="course-tag">${ic.courseId}</span>
            <span class="section-tag">${ic.section}</span>
          </div>
          <div class="course-completed-main">
            <div class="course-grade">
              <div><h3>${ic.courseName}</h3></div>
              <div class="status-container"><span class="status">S</span></div>
            </div>
            <div class="course-tags">
              <span class="tag"><i class="fa-solid fa-user-graduate"></i> ${ic.enrollmentActual}</span>
              <span class="tag"><i class="fa-solid fa-chart-bar"></i> Average Letter Grade: B+</span>
            </div>
          </div>
        </div>
      `
        )
        .join("");

      // Listener to handle class card click and load students
      currentTeaching.addEventListener("click", function (event) {
        const card = event.target.closest(".card");
        if (!card) return;

        const classId = card.dataset.classid;
        const courseId = card.dataset.courseid;
        const section = card.dataset.section;
        const courseName = card.dataset.coursename;

        renderStudentsForClass(classId, courseId, courseName, section);
      });
    }
  );

  function renderStudentsForClass(classId, courseId, courseName, section) {
    const selectedContainer = document.querySelector(".classes.selected");

    const enrolledStudents = students.filter((student) =>
      student.semesterEnrollment?.classes?.some(
        (cls) => cls.classId === classId
      )
    );

    const studentCards = enrolledStudents
      .map((student) => {
        const userProfile = users.find((u) => u.email === student.email);
        const savedGrade = localStorage.getItem(student.email) || "A";

        return `
          <div class="card">
            <div class="student">
              <div class="student-grade">
                <div>
                  <h3>${userProfile?.firstName || "Unknown"} ${
          userProfile?.lastName || ""
        }</h3>
                  <div><span class="student-info email">${
                    student.email
                  }</span></div>
                </div>
                <div class="dropdown">
                  <div class="dropdown-toggle">
                    <span id="selectedOption">${savedGrade}</span>
                    <i class="fas fa-chevron-down"></i>
                  </div>
                  <div class="dropdown-menu">
                    ${["A", "B+", "B", "C+", "C", "D+", "D", "F", "I"]
                      .map((g) => `<div>${g}</div>`)
                      .join("")}
                  </div>
                </div>
              </div>
            </div>
          </div>`;
      })
      .join("");

    selectedContainer.innerHTML = `
      <div class="class-header">
        <div class="course-tags-div">
          <span class="course-tag">${courseId}</span>
          <span class="section-tag">Section ${section}</span>
          <h3>${courseName}</h3>
        </div>
        <div class="course-tags-div">
          <span class="tag"><i class="fa-solid fa-user-graduate"></i> ${enrolledStudents.length} Students</span>
          <span class="tag"><i class="fa-solid fa-chart-bar"></i> Average Letter Grade: B+</span>
        </div>
      </div>
  
      <div class="cards-container" id="students">
        ${studentCards}
      </div>
  
      <div class="submit-container">
        <button class="submit-btn">Submit Grades</button>
      </div>
    `;

    initializeDropdownListeners();
  }

  function initializeDropdownListeners() {
    document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
      toggle.addEventListener("click", function (event) {
        event.stopPropagation();
        let dropdownMenu = this.nextElementSibling;
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          if (menu !== dropdownMenu) menu.style.display = "none";
        });
        dropdownMenu.style.display =
          dropdownMenu.style.display === "block" ? "none" : "block";
      });
    });

    document.querySelectorAll(".dropdown-menu div").forEach((option) => {
      option.addEventListener("click", function () {
        const selectedText = this.textContent;
        const dropdownToggle =
          this.closest(".dropdown").querySelector("#selectedOption");
        dropdownToggle.textContent = selectedText;

        const email = this.closest(".student-grade").querySelector(
          ".student-info.email"
        ).textContent;
        localStorage.setItem(email, selectedText);

        this.closest(".dropdown-menu").style.display = "none";
      });
    });

    // Global hide on click outside
    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.style.display = "none";
      });
    });

    document.querySelector("#students").addEventListener("scroll", () => {
      document.querySelectorAll(".dropdown-menu").forEach((menu) => {
        menu.style.display = "none";
      });
    });
  }

  // Adjust layout on resize
  function adjustLayout() {
    const teachingDiv = document.querySelector(".classes.teaching");
    const selectedDiv = document.querySelector(".classes.selected");
    if (window.innerWidth <= 768) {
      teachingDiv.style.height = "auto";
      selectedDiv.style.height = `calc(100vh - ${teachingDiv.offsetHeight}px - 2rem)`;
    } else {
      teachingDiv.style.height = "100%";
      selectedDiv.style.height = "100%";
    }
  }

  adjustLayout();
  window.addEventListener("resize", adjustLayout);
});
