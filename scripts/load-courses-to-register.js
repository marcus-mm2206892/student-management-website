fetch("../assets/data/courses.json")
.then( function(response) {
    return response.json();
})
.then( function(allCourses) {
    let placeholder = document.querySelector('#data-output');
    let out = "";
    for(let course of allCourses){
        out += `
        <tr>
            <td class="course-no"> ${course.courseId} </td>
            <td> ${course.courseName} </td>
            <td> ${course.courseName}  </td>
            <td> L01 </td>
            <td> 33/40 </td>
            <td> <p class="status"> Not Approved </p>  </td>
            <td> MON-WED </td>
            <td>
                <button> <strong> Register </strong> </button> 
            </td>
        </tr>

        `
    }

    placeholder.innerHTML = out;
})