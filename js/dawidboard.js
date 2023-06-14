const GRADES_URL = 'https://mbo-sd.nl/apiv2/student-grades/';

const studentPickerList = document.querySelector('.student-picker-list');
const periodeOneCanvas = document.querySelector('.periode-one-canvas');
const periodeTwoCanvas = document.querySelector('.periode-two-canvas');
const periodeThreeCanvas = document.querySelector('.periode-three-canvas');
const periodeFourCanvas = document.querySelector('.periode-four-canvas');

const periodeOneAvgElem = document.querySelector('.periode-one-average');
const periodeTwoAvgElem = document.querySelector('.periode-two-average');
const periodeThreeAvgElem = document.querySelector('.periode-three-average');
const periodeFourAvgElem = document.querySelector('.periode-four-average');
const totalAverage = document.querySelector('.total-average');

const studentDescriptionElem = document.querySelector('.student-description-text');

let chart1 = createChart(periodeOneCanvas, [0, 1], [0, 1], 'Pick A Student');
let chart2 = createChart(periodeTwoCanvas, [0, 1], [0, 1], 'Pick A Student');
let chart3 = createChart(periodeThreeCanvas, [0, 1], [0, 1], 'Pick A Student');
let chart4 = createChart(periodeFourCanvas, [0, 1], [0, 1], 'Pick A Student');

const studentNameElems = document.querySelectorAll('.student-name');
const studentEmailButton = document.querySelector('.student-email-button');

// Globally accessible object. The fetched data will come here.
let studentsData = {};

// Fetch allat
fetch(GRADES_URL) 
    .then(fetchedData => fetchedData.json()) 
    .then(jsonData => processData(jsonData));


function processData(studentGrades) {

    // Copy the studentGrades object to a global variable.
    studentsData = studentGrades;
    
    // Sort students alphabetically.
    const sortedStudentList = studentGrades.students.sort((a, b) => a.name.localeCompare(b.name));

    // Add every student to the "pick a student" dropdown list.
    pupulateDropdownMenu(sortedStudentList);
}


function pupulateDropdownMenu(sortedStudentList) {
    // For every student, create a list element and add it to the dropdown menu.
    sortedStudentList.forEach(student => {
        const listItemElem = document.createElement('li');
        listItemElem.innerHTML = `<a class="dropdown-item" data-student-id=${student.id} href="#">${student.name}</a>`
        
        // Also, for every list element add a click event listener.
        listItemElem.addEventListener('click', (ev) => {
            const student = findStudentById(ev.target.getAttribute('data-student-id'));
            // Display the students data on the website.
            showStudentData(student);
        });
        
        // Add the element to the dropdown.
        studentPickerList.appendChild(listItemElem);
    });
}


function sortGrades(grades) {

    // Sort grades into "per periode" basis
    const periodeOneGrades = {courseIDs: [], grades: []};
    const periodeTwoGrades = {courseIDs: [], grades: []};
    const periodeThreeGrades = {courseIDs: [], grades: []};
    const periodeFourGrades = {courseIDs: [], grades: []};

    let periodeOneAvg = 0;
    let periodeTwoAvg = 0;
    let periodeThreeAvg = 0;
    let periodeFourAvg = 0;

    grades.forEach((gradeData, ind) => {
        switch (gradeData.periode) {
            case 1:
                periodeOneGrades.courseIDs.push(gradeData.course_id);
                periodeOneGrades.grades.push(gradeData.grade);
                periodeOneAvg += gradeData.grade;
                break;
            case 2:
                periodeTwoGrades.courseIDs.push(gradeData.course_id);
                periodeTwoGrades.grades.push(gradeData.grade);
                periodeTwoAvg += gradeData.grade;
                break;
            case 3:
                periodeThreeGrades.courseIDs.push(gradeData.course_id);
                periodeThreeGrades.grades.push(gradeData.grade);
                periodeThreeAvg += gradeData.grade;
                break;
            case 4:
                periodeFourGrades.courseIDs.push(gradeData.course_id);
                periodeFourGrades.grades.push(gradeData.grade);
                periodeFourAvg += gradeData.grade;
                break;
            default:
                break;
        }
    });
    return {p1: periodeOneGrades, p2: periodeTwoGrades, p3: periodeThreeGrades, p4: periodeFourGrades,
            p1Avg: periodeOneAvg / periodeOneGrades.grades.length,
            p2Avg: periodeTwoAvg / periodeThreeGrades.grades.length,
            p3Avg: periodeThreeAvg / periodeThreeGrades.grades.length,
            p4Avg: periodeFourAvg / periodeFourGrades.grades.length
        };
}


function colorTotal() {
    // Color the element where totalAverage is displayed based on the height of the grade.
    totalAverage.classList.remove('text-success');
    totalAverage.classList.remove('text-warning');
    totalAverage.classList.remove('text-danger');

    if (parseFloat(totalAverage.innerHTML) >= 6) {
        totalAverage.classList.add('text-success');
    }
    if (parseFloat(totalAverage.innerHTML) < 6) {
        totalAverage.classList.add('text-warning');
    }
    if (parseFloat(totalAverage.innerHTML) < 5.5) {
        totalAverage.classList.add('text-danger');
    }
}


function updateCharts(grades) {
    destroyCharts();
    chart1 = createChart(periodeOneCanvas, grades.p1.grades, 
        grades.p1.courseIDs, 'grades periode #1');
    chart2 = createChart(periodeTwoCanvas, grades.p2.grades, 
        grades.p2.courseIDs, 'grades periode #2');
    chart3 = createChart(periodeThreeCanvas, grades.p3.grades, 
        grades.p3.courseIDs, 'grades periode #3');
    chart4 = createChart(periodeFourCanvas, grades.p4.grades, 
        grades.p4.courseIDs, 'grades periode #4');
}


function showStudentData(student) {
    // Sort grades into separate "datasets"
    const grades = sortGrades(studentsData.grades[student.id]);

    // Display all kinds of data about the student
    studentEmailButton.setAttribute('href', `mailto:${student.email}`)
    studentNameElems.forEach((elem) => {elem.innerText = student.name});
    periodeOneAvgElem.innerText = grades.p1Avg.toFixed(1);
    periodeTwoAvgElem.innerText = grades.p2Avg.toFixed(1);
    periodeThreeAvgElem.innerText = grades.p3Avg.toFixed(1);
    periodeFourAvgElem.innerText = grades.p4Avg.toFixed(1);
    totalAverage.innerText = ((grades.p1Avg + grades.p2Avg + grades.p3Avg + grades.p4Avg) / 4).toFixed(1);
    studentDescriptionElem.innerText = student.description;

    colorTotal();

    updateCharts(grades);
}


// Util functions

function createChart(canvas, data, labels, label) {
    const chart = new Chart(canvas, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                fill: true,
                borderColor: '#FF6384'
            }]
        },
        options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Grade'
                }
              },
              x: {
                title: {
                    display: true,
                    text: 'Course'
                }
              }
            }
          }
    });
    return chart;
}

function findStudentById(id) {
    let studentObj = {};
    studentsData.students.forEach((student) => {
        if (student.id == id){
            studentObj = student;
            return;
        }
    });
    return studentObj;
}

function destroyCharts() {
    chart1.destroy();
    chart2.destroy();
    chart3.destroy();
    chart4.destroy();
}
