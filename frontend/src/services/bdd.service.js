// bdd.service.js
const students = [
  {
    studentId: "ESGI-0001",
    firstName: "Matthieu",
    lastName: "Durand",
    fullname: "Matthieu Durand",
  },
  {
    studentId: "ESGI-0002",
    firstName: "Emma",
    lastName: "Leroy",
    fullname: "Emma Leroy",
  },
  {
    studentId: "ESGI-0003",
    firstName: "Lucas",
    lastName: "Bernard",
    fullname: "Lucas Bernard",
  },
];

const courses = [
  { courseId: "C-001", name: "Mathématiques Avancées" },
  { courseId: "C-002", name: "Développement Smart Contracts" },
  { courseId: "C-003", name: "Sécurité Blockchain" },
  { courseId: "C-004", name: "Tokenomics" },
];

const grades = [
  { gradeId: "G-001", value: "A" },
  { gradeId: "G-002", value: "B" },
  { gradeId: "G-003", value: "C" },
];

// 🟢 Fonction pour récupérer les étudiants
export const getStudents = () => {
  return students;
};

// 🟢 Fonction pour récupérer un étudiant par son ID
export const getStudentById = (studentId) => {
  return students.find((student) => student.studentId === studentId);
};

// 🟢 Fonction pour récupérer les matières disponibles
export const getCourses = () => {
  return courses;
};

// 🟢 Fonction pour récupérer une matière par ID
export const getCourseById = (courseId) => {
  return courses.find((course) => course.courseId === courseId);
};

// 🟢 Fonction pour récupérer les matières disponibles
export const getGrades = () => {
  return grades;
};

// 🟢 Fonction pour récupérer une matière par ID
export const getGradesById = (gradeId) => {
  return grades.find((grade) => grade.gradeId === gradeId);
};
