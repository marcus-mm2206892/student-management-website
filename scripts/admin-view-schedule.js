const courseData = {
    "CMPS 350": [
      {
        crn: "25832",
        section: "L01",
        title: "Web Development Fundamentals",
        schedule: {
          days: ["S", "T"],
          time: "08:00 AM - 08:50 AM",
          location: "H07 - College of Engineering | Room C105",
          dateRange: "01/19/2025 - 05/08/2025"
        }
      },
      {
        crn: "25432",
        section: "L02",
        title: "Web Development Fundamentals",
        schedule: {
          days: ["M", "W"],
          time: "09:00 AM - 09:50 AM",
          location: "H07 - College of Engineering | Room C108",
          dateRange: "01/19/2025 - 05/08/2025"
        }
      }
    ],
    "MATH 100": [
      {
        crn: "26543",
        section: "L01",
        title: "Calculus I",
        schedule: {
          days: ["U", "T", "R"],
          time: "10:00 AM - 10:50 AM",
          location: "Building B | Room 204",
          dateRange: "01/19/2025 - 05/08/2025"
        }
      }
    ]
  };
  
  let currentCourse = null;
  
  function toggleDropdown() {
    this.parentElement.classList.toggle("active");
    const menu = this.nextElementSibling;
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
  
  function selectOption(type, value) {
    if (type === 'course') {
      currentCourse = value;
      document.getElementById("selectedOption").textContent = value;
  
      const courseClasses = courseData[value] || [];
      const classDropdown = document.querySelectorAll(".dropdown-menu")[1];
      classDropdown.innerHTML = "";
  
      courseClasses.forEach(cls => {
        const option = document.createElement("div");
        option.innerHTML = `<i class="fas fa-calendar-alt"></i>CRN: ${cls.crn}`;
        option.onclick = () => selectOption('class', cls.crn);
        classDropdown.appendChild(option);
      });
  
      document.querySelector(".course-title").textContent = courseClasses[0]?.title || '';
      document.querySelector(".course-tag").textContent = value;
      document.querySelector(".section-tag").textContent = courseClasses[0]?.section || '';
      document.querySelector(".crn-tag").textContent = `CRN ${courseClasses[0]?.crn || ''}`;
  
      if (courseClasses.length) {
        updateSchedule(courseClasses[0]);
      }
    }
  
    if (type === 'class') {
      const selectedClass = courseData[currentCourse].find(cls => cls.crn === value);
      document.querySelector(".section-tag").textContent = selectedClass?.section || '';
      document.querySelector(".crn-tag").textContent = `CRN ${selectedClass?.crn || ''}`;
  
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
  
    // Update schedule days
    const weekdays = scheduleContainer.querySelector(".weekdays");
    weekdays.innerHTML = "";
    const days = ["S", "M", "T", "W", "T", "F", "S"];
    const activeDays = cls.schedule.days;
    days.forEach(day => {
      const span = document.createElement("span");
      span.classList.add("day");
      if (activeDays.includes(day)) span.classList.add("active");
      span.textContent = day;
      weekdays.appendChild(span);
    });
  
    // Update date range
    scheduleContainer.querySelector(".date-range").textContent = cls.schedule.dateRange;
  
    // Update time/location
    const locationInfo = locationContainer.querySelector(".location-info");
    locationInfo.querySelector(".time").textContent = cls.schedule.time;
    locationInfo.querySelector(".location-text").textContent = cls.schedule.location;
  }
  
  // Attach toggleDropdown dynamically to both dropdowns
  document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
    toggle.addEventListener("click", toggleDropdown);
  });