import app from '..';
import supertest from 'supertest';

jest.mock('../../src/db/students', () => {
  const originalMock = jest.requireActual('../../src/db/students');

  const students = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      city: 'Belo Horizonte',
      birth: new Date('11/13/1999').toISOString(),
    },
  ];

  const updateStudentMock = () => {
    return {
      ...students[0],
      name: 'Johnny Doe',
      email: 'john.doe@example.com',
      city: 'Belo Horizonte',
      birth: '1999-11-13T02:00:00.000Z',
    };
  };

  const generateNewStudentMock = () => {
    const newStudent = {
      id: 2,
      name: 'John Doe 2',
      email: 'john.doe.2@example.com',
      city: 'Belo Horizonte',
      birth: '1999-11-13T02:00:00.000Z',
    };

    students.push(newStudent);

    return newStudent;
  };

  const removeLastStudentMock = () => {
    students.pop();
  };

  return {
    __esModule: true,
    ...originalMock,
    getStudents: jest.fn(() => Promise.resolve(students)),
    updateStudent: jest.fn(() => Promise.resolve(updateStudentMock())),
    addStudent: jest.fn(() => Promise.resolve(generateNewStudentMock())),
    deleteStudent: jest.fn(() => Promise.resolve(removeLastStudentMock())),
  };
});

describe('Test student requests', () => {
  it('should return the example student', async () => {
    await supertest(app)
      .get('/students')
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            city: 'Belo Horizonte',
            birth: new Date('11/13/1999').toISOString(),
          },
        ])
      );
  });

  it('should update the first student', async () => {
    const studentID = 1;

    const requestBody = {
      name: 'Johnny Doe',
      email: 'john.doe@example.com',
      city: 'Belo Horizonte',
      birth: '1999-11-13T02:00:00.000Z',
    };

    await supertest(app)
      .put(`/students/${studentID}`)
      .send(requestBody)
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject({ id: studentID, ...requestBody })
      );
  });

  it('should create a new student', async () => {
    const newStudent = {
      name: 'John Doe 2',
      email: 'john.doe.2@example.com',
      city: 'Belo Horizonte',
      birth: new Date('11/13/1999').toISOString(),
    };

    await supertest(app)
      .post('/students')
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 2, ...newStudent }));
  });
});

it('should delete the first student', async () => {
  const studentID = 1;

  await supertest(app).delete(`/students/${studentID}`).expect(200);
});
