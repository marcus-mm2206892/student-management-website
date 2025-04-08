  //1. Fix the dropdowns. Should get a value 

  //2. Update the classes dropdown depending on the selected course 

  //3. Display class schedule and relevent info (instructors, class location etc)
  
  let allCourses = JSON.parse(localStorage.getItem("courses"));
  let allClasses = JSON.parse(localStorage.getItem("classes"));

  allCourses = allCourses.filter( crs => crs.currentClasses.length > 0); //Only display courses that have classes

  //renderCourseDD();
  //selectOption('course', allCourses[0].courseId); // Selects the first course by default

  let currentCourseId = null;
  
  function toggleDropdown(event) {
    const dropdown = event.currentTarget.parentElement;  //Need to fix the closing of dropdown
    if (!dropdown) return;

    dropdown.classList.toggle("active");

    const menu = dropdown.querySelector(".dropdown-menu");
    if (menu) {
        menu.style.display = (menu.style.display === "block") ? "none" : "block";
    }
}
  
  function selectOption(type, value) {
    if (type === 'course') {
      currentCourseId = value;

      console.log(currentCourseId);
      document.getElementById("selectedOption").textContent = value;

      const course = allCourses.find( crs => crs.courseId == currentCourseId);
      const courseClasses = course.currentClasses;
      console.log(courseClasses);

      const classDropdown = document.querySelectorAll(".dropdown-menu")[1];
      classDropdown.innerHTML = "";
  
      courseClasses.forEach(classId => {
        const option = document.createElement("div");
        option.innerHTML = `<i class="fas fa-calendar-alt"></i>CRN: ${classId}`;
        // option.innerHTML = classDdTemplate(classId)
        option.onclick = () => selectOption('class', classId);
        classDropdown.appendChild(option);
      });
      
      document.querySelector(".course-title").textContent = course.courseName || '';
      document.querySelector(".course-tag").textContent = value;
  
      if (courseClasses.length) { 
        const firstClass = allClasses.find( cls => cls.classId == courseClasses[0]);  // Auto select the first class of the course, by default
        updateSchedule(firstClass);
      }
    }
  
    if (type === 'class') {
      const selectedClass = allClasses.find( cls => cls.classId == value);
      console.log(selectedClass);
      document.querySelector(".section-tag").textContent = selectedClass?.section || '';
      document.querySelector(".crn-tag").textContent = `CRN ${selectedClass?.classId || ''}`;
  
      updateSchedule(selectedClass);
    }
  
    // Hide all dropdowns after selection
    document.querySelectorAll(".dropdown").forEach(d => {
      d.classList.remove("active");
      const menu = d.querySelector(".dropdown-menu");
      if (menu) menu.style.display = "none";
    });
  }
  
  function updateSchedule(cls) {
    const scheduleContainer = document.querySelector(".class-schedule");
    const locationContainer = document.querySelector(".class-location");
    document.querySelector(".section-tag").textContent = cls.section || ''; // Set the CRN and section of the class in the modal header
    document.querySelector(".crn-tag").textContent = `CRN ${cls.classId}`;
  
    // Update schedule days
    const weekdays = scheduleContainer.querySelector(".weekdays");
    weekdays.innerHTML = "";
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const scheduleDays = cls.schedule.scheduleType;

    if (scheduleDays == "STT") {
      activeDays = ["SUN","TUE","THU"]
    } else if (scheduleDays == "MW") {
      activeDays = ["MON","WED"]
    }

    days.forEach(day => {
      const span = document.createElement("span");
      span.classList.add("day");
      if (activeDays.includes(day)) span.classList.add("active");
      span.textContent = day;
      weekdays.appendChild(span);
    });
    
    let dataRange;
    if (cls.semester == "Spring 2025") {
      dataRange = "19/01/2025 - 05/08/2025"
    } else if (cls.semester == "Fall 2025") {
      dataRange = "24/08/2025 - 11/12/2025" 
    }
  
    // Update date range
    scheduleContainer.querySelector(".date-range").textContent = dataRange;
  
    // Update time/location
    const locationInfo = locationContainer.querySelector(".location-info");
    locationInfo.querySelector(".time").textContent = `${cls.schedule.startTime} - ${cls.schedule.endTime}`;
    locationInfo.querySelector(".location-text").textContent = "H07 - College of Engineering | Room C105";
  }
  
  // Attach toggleDropdown dynamically to both dropdowns
  document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
    toggle.addEventListener("click", toggleDropdown);
  });

  function courseDdTemplate(courseId) {
    return `<div onclick="selectOption('course','${courseId}')"><i class="fas fa-book"></i>${courseId}</div>`;
  }
  function classDdTemplate(classId) {
    return `<div onclick="selectOption('class')"><i class="fas fa-calendar-alt"></i>CRN: ${classId}</div>`;
  }

  function renderCourseDD(){
    const courseDD = document.querySelector(".view-schedule-header .dropdown-menu");
    out = ``;

    allCourses.forEach(course => {
      out += courseDdTemplate(course.courseId);
    })
  
    courseDD.innerHTML = out;
  }

  function renderClassesDD() {
    const classDD = document.querySelector(".view-schedule-container .dropdown-menu");
    out = ``;

    allClasses.forEach(classItem => {
      out += classDdTemplate(classItem.classId);
    })
  
    classDD.innerHTML = out;
  }

  renderCourseDD()

  // renderClassesDD()
