import { StatusCodes } from "http-status-codes";
import { Student } from "../types/Student";
import { HttpError } from "../types/HttpError";


const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
function addStudent(student: Student) {
  const newStudent = {
    id: students.length ? students[students.length - 1].id! + 1 : 1,
    ...student,
  };
  students.push(Object.freeze(newStudent));
  return Promise.resolve(newStudent);
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => Promise.resolve(Object.freeze([...students]));

/**
 * Update a student
 * @param id Student id
 * @param studentData Student data
 * @returns updated student
 */
function updateStudent(id: number, studentData: Student) {
  const student = students.find(e => e.id === id);

  if (!student) {
    return Promise.reject({
      status: StatusCodes.NOT_FOUND,
      json: {
        message: "User not found",
      }
    } as HttpError);
  }

  Object.assign(student, studentData);
  return Promise.resolve(student);
}

/**
 * Delete a student
 * @param id Student id
 */
 function deleteStudent(id: number) {
  const studentPosition = students.findIndex(e => e.id === id);

  if (studentPosition === -1) {
    return Promise.reject({
      status: StatusCodes.NOT_FOUND,
      json: {
        message: "User not found",
      }
    } as HttpError);
  }

  students.splice(studentPosition, 1);
  return Promise.resolve();
 }

export {
  addStudent,
  getStudents,
  updateStudent,
  deleteStudent,
};
