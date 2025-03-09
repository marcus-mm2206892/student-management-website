//figuring out how to save to json ->https://www.geeksforgeeks.org/read-json-file-using-javascript/
        // fetch('../data/courses.json').then(response => response.json()) // Parse JSON
        //     .then(data => console.log(data)) // Work with JSON data
        //     .catch(error => console.error('Error fetching JSON:', error));

        // document.getElementById('createClassForm').addEventListener('submit', function(event) {
        //     const classId = document.getElementById('classId').value;
        //     const instructor = document.getElementById('instructor').value;
        //     const maxStudents = parseInt(document.getElementById('maxStudents').value);
        //     const classStatus = false; //default value
        //     const schedule = "" //empty for now, probably add calendar later once we clarify what use case 8 is?
        //     const campus = document.querySelector('input[name="campus"]:checked').value;

        //     const newClass = {
        //         classId: classId,
        //         instructor: instructor,
        //         maxStudents: maxStudents,
        //         classStatus: false,
        //         Students: [""], // default value
        //         Schedule: schedule,
        //         campus: campus
        //     };

            
        //     document.getElementById('createClassForm').reset(); // Clear the form
        // });

const jsonData = import ('../data/courses.json');
console.log(jsonData);