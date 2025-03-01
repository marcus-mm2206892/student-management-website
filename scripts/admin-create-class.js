document.getElementById('createClassForm').addEventListener('submit', function(event) {

    const classId = document.getElementById('classId').value;
    const instructor = document.getElementById('instructor').value;
    const maxStudents = parseInt(document.getElementById('maxStudents').value);
    const classStatus = document.getElementById('classStatus').value === 'true';
    const schedule = document.getElementById('schedule').value;
    const campus = document.querySelector('input[name="campus"]:checked').value;

    const newClass = {
        classId: classId,
        instructor: instructor,
        maxStudents: maxStudents,
        classStatus: false,
        Students: [""], // Initially empty
        Schedule: schedule,
        campus: campus
    };

    //figuring out how to save to json file

    alert('Class created successfully!');
    document.getElementById('createClassForm').reset(); // Clear the form
});