import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../types/HttpError';
import { getConnection, Repository } from 'typeorm';
import { Student } from '../entities/Student';

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
async function addStudent(student: Student): Promise<Student> {
  const newStudent = new Student({ ...student });

  const repository = getStudentRepository();

  const createdStudent = await repository.save(newStudent);

  return createdStudent;
}

/**
 * Returns student list in ASC order
 * @returns Students
 */
async function getStudents(): Promise<Student[]> {
  return await getStudentRepository().find({ order: { id: 'ASC' } });
}

/**
 * Update a student
 * @param id Student id
 * @param studentData Student data
 * @returns updated student
 */
async function updateStudent(
  id: number,
  studentData: Student
): Promise<Student> {
  const isStudentFound = await getStudentRepository().find({ id });

  if (isStudentFound.length === 0) {
    return userNotFound();
  }

  return await getStudentRepository().save({ id, ...studentData });
}

/**
 * Delete a student
 * @param id Student id
 */
async function deleteStudent(id: number) {
  const deletedStudents = await getStudentRepository().delete({ id });

  if (!deletedStudents.affected) return userNotFound();
}

function getStudentRepository(): Repository<Student> {
  return getConnection().getRepository(Student);
}

function userNotFound() {
  return Promise.reject({
    status: StatusCodes.NOT_FOUND,
    json: {
      message: 'User not found',
    },
  } as HttpError);
}

export { addStudent, getStudents, updateStudent, deleteStudent };
