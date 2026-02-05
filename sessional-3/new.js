"use strict";

const students = [
  { name: "Rishabh", marks: 85, passed: true },
  { name: "Amit", marks: 45, passed: false },
  { name: "Neha", marks: 72, passed: true },
  { name: "Priya", marks: 60, passed: true },
  { name: "Rahul", marks: 30, passed: false }
];

const getNames = list => {
  return list.map(student => student.name);
};

const getPassedStudents = list => {
  return list.filter(student => student.passed === true);
};

const getAverageMarks = list => {
  const total = list.reduce((sum, student) => {
    return sum + student.marks;
  }, 0);

  return total / list.length;
};

const showStudent = student => {
  const { name, marks, passed } = student;
  console.log(`${name} got ${marks} marks and passed is ${passed}`);
};

const generateReport = (...studentList) => {
  const passedStudents = getPassedStudents(studentList);
  const averageMarks = getAverageMarks(studentList);

  return `
TOTAL STUDENTS: ${studentList.length}
PASSED: ${passedStudents.length}
AVG: ${averageMarks.toFixed(2)}
PASSED STUDENTS: ${passedStudents.map(s => s.name).join(", ")}
`;
};

console.log(getNames(students));

students.forEach(showStudent);

const finalReport = generateReport(...students);

console.log(finalReport);
