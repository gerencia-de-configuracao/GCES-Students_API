import * as StudentsDB from '../db/students';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../types/HttpError';

export class StudentsController {
  async get(
    _: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const students = await StudentsDB.getStudents();

    return res.status(StatusCodes.OK).json(students);
  }

  async create(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
  }

  async update(req: Request, res: Response): Promise<void> {
    StudentsDB.updateStudent(+req.params.id, req.body)
      .then((student) => {
        res.status(StatusCodes.OK).json(student);
      })
      .catch((error: HttpError) => {
        res.status(error.status).json(error.json);
      });
  }

  async delete(req: Request, res: Response): Promise<void> {
    StudentsDB.deleteStudent(+req.params.id)
      .then(() => {
        res.status(StatusCodes.OK).send();
      })
      .catch((error: HttpError) => {
        res.status(error.status).json(error.json);
      });
  }
}
