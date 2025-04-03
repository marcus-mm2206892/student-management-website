document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const tableHead = document.querySelector("#tableHead");
    const tableHeadRow = tableHead.querySelectorAll("tr")[1]; // second row (actual column headers)
    const tableBody = document.getElementById("data-output");
    const noResults = document.getElementById("noResults");
    const searchInfo = document.getElementById("searchInfo");

    let allCourses = JSON.parse(localStorage.getItem("courses"));
    let allClasses = JSON.parse(localStorage.getItem("classes"));
    let allStudents = JSON.parse(localStorage.getItem("students"));
    
    console.log("Courses Loaded:", allCourses);

    console.log("Classes Loaded:", allClasses);

    try {
        let out = "";
        allCourses.forEach(course => {     
            // Loop through all current classes for the course
            course.currentClasses.forEach(classId => {
                let classDetails = allClasses.find(cls => cls.classId == classId); 
                let classStatus = classDetails ? classDetails.classStatus.toLowerCase() : "unknown";
    
                let statusClass = "";
                let buttonText = "";
                let buttonDisabled = "";
    
                switch (classStatus) {
                    case "open":
                        statusClass = "status-approved";
                        // Disabling register button if the class is full
                        if (classDetails.enrollmentActual == classDetails.enrollmentMaximum){
                            buttonDisabled = "disabled";
                            buttonText = "Section Full";
                        } else {
                            buttonText = "Register";
                            buttonDisabled = "";
                        }
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
                    <td class="data course-section"><span>${classDetails ? classDetails.classId : "N/A"}</span></td>
                    <td class="data course-enrollment"><span>${classDetails ? classDetails.enrollmentActual + "/" + classDetails.enrollmentMaximum : "0/0"}</span></td>
                    <td class="data course-status">
                        <span class="status-badge ${statusClass}">
                            <span class="status-circle"></span>
                            ${classStatus.charAt(0).toUpperCase() + classStatus.slice(1)}
                        </span>
                    </td>
                    <td>
                        <button class="course-button" data-classid=${classDetails.classId} data-courseid=${course.courseId} ${buttonDisabled}>
                            <strong><span>${buttonText}</span></strong>
                        </button>
                    </td>
                </tr>`;
            });
        });
    
        tableBody.innerHTML = out;
        console.log("Courses successfully loaded into table.");
    
        if (typeof adjustTableColumns === "function") {
            adjustTableColumns();
        }
    
    } catch (error) {
        console.error("Error fetching course/class data:", error);
        tableBody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: red;">Failed to load courses.</td></tr>`;
    }
    

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

        tableBody.querySelectorAll("tr").forEach(row => {
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

    //When clicked, should display a modal about the class

    document.addEventListener("click", function (event) {
        if (event.target.closest(".course-row")) {
            let row = event.target.closest(".course-row");
        //    alert("Row clicked! ")  
        }
    });

    


    function handleCourseRegistration(courseId, classId){

        const user = JSON.parse(localStorage.loggedInUser);
        const student = allStudents.find( s => s.email == user.email)
        const allEnrollments = JSON.parse(localStorage.getItem("courseEnrollments"));
        console.log(allEnrollments);

        //1. Check if the student has already enrolled in that course/section

        const index = allEnrollments.findIndex( e => e.studentId == student.studentId && e.courseId == courseId);

        if (index != -1){
            alert(`ERROR: You are already Registered in a section the Course ID: ${courseId}`);
            return;
        }

        //2. Check if the student has passed the pre-req for that course
        const preRequesites = allCourses.find( c => c.courseId == courseId ).prerequisites;
        console.log(preRequesites);

        completedCourses = student.completedCourses;
        console.log(completedCourses);

        const passedPreReq = preRequesites.every( course => completedCourses.includes(course)); //Checking if pre-requisites are passed
        console.log(passedPreReq)
        
        if (passedPreReq) {
            //3. Create courseEnrollment object
            const courseEnrollment = {
                enrollmentId: Date.now(),
                studentId: student.studentId,
                classId: classId,
                courseId: courseId,  //Not in the class diagram
                status: "Enrolled",
                courseGrade: 0,
                letterGrade: "NA"
            }
            console.log(courseEnrollment);

            //      - Update the No of enrollement of the class
            const updateClasses = allClasses.map(cls => {
                if (cls.classId == classId) {
                    return { ...cls, enrollmentActual: cls.enrollmentActual+1 }
                } else {
                    return cls;
                }
            });

            console.log(updateClasses);

            //      - Save course enrollment and classes in the local storge
            localStorage.setItem("classes", JSON.stringify(updateClasses));

            allEnrollments.push(courseEnrollment);
            localStorage.setItem("courseEnrollments", JSON.stringify(allEnrollments));
            alert(`Succesfully registered for class ${classId}, of course ${courseId}.`)

            location.reload(); //Refresh the table

        } else {
            alert(`The pre-requisite for the course ${courseId} has not been completed.`) //Do styling
        }

    }
    
});

