document.addEventListener("DOMContentLoaded", function () {
    const searchBar = document.getElementById("searchBar");
    const resultsGrid = document.getElementById("resultsGrid");
    const noResults = document.getElementById("noResults");
    const searchQueryText = document.getElementById("searchQueryText");
    const resultsCount = document.getElementById("resultsCount");

    document.querySelectorAll(".fa-plus").forEach(button =>{
        //redirects to register when plus button pressed
        button.addEventListener("click",function(event){
            event.stopPropagation();
            window.location.href = "../html/register-course.html";
        })
    })
    // // Simulated search term (replace with actual query parameter later)
    // const query = "Mobile";
    // searchQueryText.innerHTML = query;

    // fetch("../assets/data/courses.json")
    // .then(res => res.json())
    // .then(courses => {
    //     let results = courses.filter(course => 
    //         course.courseName.toLowerCase().includes(query.toLowerCase()) ||
    //         course.courseId.toLowerCase().includes(query.toLowerCase())
    //     );

    //     if (results.length === 0) {
    //         noResults.style.display = "block";
    //         resultsGrid.style.display = "none";
    //         resultsCount.innerHTML = "0 results";
    //     } else {
    //         noResults.style.display = "none";
    //         resultsGrid.style.display = "grid";
    //         resultsCount.innerHTML = `${results.length} results`;

    //         let output = results.map(course => `
    //             <div class="course-card">
    //                 <h3>${course.courseName}</h3>
    //                 <p>${course.courseId} - ${course.instructor || "TBA"}</p>
    //             </div>
    //         `).join("");

    //         resultsGrid.innerHTML = output;
    //     }
    // });

    // searchBar.addEventListener("input", function () {
    //     window.location.href = `student-query.html?q=${searchBar.value}`;
    // });
});
