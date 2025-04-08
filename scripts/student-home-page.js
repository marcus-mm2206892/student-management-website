// 1. Get all of the courses

//2. Display them inside the container (use case 2.2)

document.addEventListener("DOMContentLoaded", function () {
  console.log("Page loaded");
  const allCourses = JSON.parse(localStorage.getItem("courses"));
  const allUsers = JSON.parse(localStorage.getItem("users"));
  const user = JSON.parse(localStorage.loggedInUser);

  document.querySelectorAll(".fa-plus").forEach((button) => {
    //redirects to registerhtml when button pressed

    button.addEventListener("click", function (event) {
      event.stopPropagation();
      window.location.href = "../html/register-course.html";
    });
  });

  document.querySelectorAll(".more-btn").forEach((button) => {
    //redirects to browse when more button pressed
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      window.location.href = "../html/user-query.html";
    });
  });

  document.addEventListener("click", function (event) {
    const courseCard = event.target.closest(".course-card");
    if (courseCard) {
      const courseId = courseCard
        .querySelector(".course-tag")
        ?.textContent.trim();
      if (courseId && window.openCourseModal) {
        openCourseModal(courseId);
      }
    }
  });

  function renderRecomended(query = "") {
    const recommendedCoursesGrid = document.querySelector(
      ".recommended-courses .course-grid"
    );
    const recommendedEmpty = document.querySelector("#recommendedEmpty");
    const errorElement = document.querySelector("#studentHomeError");
  
    // 1. Handle loading error
    if (!allCourses || !Array.isArray(allCourses)) {
      recommendedCoursesGrid.style.display = "none";
      recommendedEmpty.style.display = "none";
      errorElement.style.display = "flex";
      return;
    }
  
    // 2. Get student major
    const major = user.department == "Computer Science" ? "CMPS" : "CMPE";
  
    // 3. Get courses matching major
    const majorCourses = allCourses.filter((c) =>
      c.majorsOffered.includes(major)
    );
  
    // 4. Exclude completed courses
    const completedCoursesId = (user.completedCourses || []).map((c) => c.courseId);
    const recommendedCourses = majorCourses.filter(
      (c) => !completedCoursesId.includes(c.courseId)
    );
  
    // 5. Filter by search query
    query = query.trim().toLowerCase();
    const matchedCourses = recommendedCourses
      .filter(
        (course) =>
          course.courseName.toLowerCase().includes(query) ||
          course.courseId.toLowerCase().includes(query) ||
          (course.instructors || []).join(" ").toLowerCase().includes(query)
      )
      .slice(0, 6);
  
    // 6. Handle empty state
    if (matchedCourses.length === 0) {
      recommendedCoursesGrid.innerHTML = "";
      recommendedCoursesGrid.style.display = "none";
      recommendedEmpty.style.display = "flex";
      errorElement.style.display = "none";
      return;
    }
  
    // 7. Show results
    recommendedEmpty.style.display = "none";
    errorElement.style.display = "none";
    recommendedCoursesGrid.style.display = "grid";
  
    let out = "";
    matchedCourses.forEach((c) => {
      out += courseTemplate(c);
    });
    recommendedCoursesGrid.innerHTML = out;
  }  

  function renderSupplementary(query = "") {
    const supplementaryGrid = document.querySelector(
      ".supplementary-courses .course-grid"
    );
    const supplementaryEmpty = document.querySelector("#supplementaryEmpty");
    const errorElement = document.querySelector("#studentHomeError");
  
    // 1. Handle loading error
    if (!allCourses || !Array.isArray(allCourses)) {
      supplementaryGrid.style.display = "none";
      supplementaryEmpty.style.display = "none";
      errorElement.style.display = "flex";
      return;
    }
  
    // 2. Get student major and completed courses
    const completedIds = (user.completedCourses || []).map((c) => c.courseId);
    const userMajor = user.department === "Computer Science" ? "CMPS" : "CMPE";
  
    // 3. Get courses outside of student's major
    const supplementaryCourses = allCourses.filter(
      (course) =>
        !completedIds.includes(course.courseId) &&
        !course.majorsOffered.includes(userMajor)
    );
  
    // 4. Filter by search query
    query = query.trim().toLowerCase();
    const matchedCourses = supplementaryCourses
      .filter(
        (course) =>
          course.courseName.toLowerCase().includes(query) ||
          course.courseId.toLowerCase().includes(query) ||
          (course.instructors || []).join(" ").toLowerCase().includes(query)
      )
      .slice(0, 6);
  
    // 5. Handle empty state
    if (matchedCourses.length === 0) {
      supplementaryGrid.innerHTML = "";
      supplementaryGrid.style.display = "none";
      supplementaryEmpty.style.display = "flex";
      errorElement.style.display = "none";
      return;
    }
  
    // 6. Show results
    supplementaryEmpty.style.display = "none";
    errorElement.style.display = "none";
    supplementaryGrid.style.display = "grid";
  
    let out = "";
    matchedCourses.forEach((course) => {
      out += courseTemplate(course);
    });
    supplementaryGrid.innerHTML = out;
  }
  

  const csElectives = ["CMPS497", "CMPS482", "CMPS485", "CMPS493"];
  const ceElectives = ["CMPE457", "CMPE476", "CMPE483", "CMPE498"];

  function renderElectives(query = "") {
    const electiveGrid = document.querySelector(
      ".elective-courses .course-grid"
    );
    const electivesEmpty = document.querySelector("#electivesEmpty");
    const errorElement = document.querySelector("#studentHomeError");
  
    // 1. Handle loading error
    if (!allCourses || !Array.isArray(allCourses)) {
      electiveGrid.style.display = "none";
      electivesEmpty.style.display = "none";
      errorElement.style.display = "flex";
      return;
    }
  
    // 2. Get elective course list based on major
    const completedIds = (user.completedCourses || []).map((c) => c.courseId);
    const electives =
      user.department === "Computer Science" ? csElectives : ceElectives;
  
    // 3. Get elective courses not completed
    const electiveCourses = allCourses.filter(
      (course) =>
        electives.includes(course.courseId) &&
        !completedIds.includes(course.courseId)
    );
  
    // 4. Filter by search query
    query = query.trim().toLowerCase();
    const matchedCourses = electiveCourses
      .filter(
        (course) =>
          course.courseName.toLowerCase().includes(query) ||
          course.courseId.toLowerCase().includes(query) ||
          (course.instructors || []).join(" ").toLowerCase().includes(query)
      )
      .slice(0, 6);
  
    // 5. Handle empty state
    if (matchedCourses.length === 0) {
      electiveGrid.innerHTML = "";
      electiveGrid.style.display = "none";
      electivesEmpty.style.display = "flex";
      errorElement.style.display = "none";
      return;
    }
  
    // 6. Show results
    electivesEmpty.style.display = "none";
    errorElement.style.display = "none";
    electiveGrid.style.display = "grid";
  
    let out = "";
    matchedCourses.forEach((course) => {
      out += courseTemplate(course);
    });
    electiveGrid.innerHTML = out;
  }  

  renderRecomended();
  renderSupplementary();
  renderElectives();

  function courseTemplate(course) {
    const creditHoursText =
      course.creditHours === 1 ? "Credit Hour" : "Credit Hours";
    return `
            <div class="course-card">
                <div class="course-image">
                    <img src="${course.courseImage}" alt="Course Image">
                    <div class="hover-icon">
                        <i class="fa-solid fa-plus"></i>
                        <span class="hover-text">Register Course</span>
                    </div>
                    <i class="fa-solid fa-turn-up top-right-icon"></i>
                </div>
                <div class="course-info">
                    <div class="course-header">
                        <span class="course-tag">${course.courseId}</span>
                        <span class="semester">Spring 2025</span>
                    </div>
                    <h3>${course.courseName}</h3>
                    <p class="course-subtitle">${course.description}</p>
                     <div class="course-tags">
                        <span class="tag"><i class="fa-solid fa-hourglass-half"></i> ${
                          course.creditHours
                        } ${creditHoursText} </span>
                         ${course.majorsOffered
                           .map(
                             (major) => `
                        <span class="tag"><i class="fa-solid ${
                          major === "CMPE" ? "fa-microchip" : "fa-laptop-code"
                        }"></i> ${major}</span>
                        `
                           )
                           .join("")}
                    </div>
                </div>
            </div>
        `;
  }

  // cool cycle text color animation
  const cycleTexts = document.querySelectorAll(".cycle-text");
  let currentIndex = 0;

  setInterval(() => {
    cycleTexts.forEach((span) => span.classList.remove("active"));
    cycleTexts[currentIndex].classList.add("active");
    currentIndex = (currentIndex + 1) % cycleTexts.length;
  }, 1200);
});
