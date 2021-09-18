import * as StudentsDB from "../db/students";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpError } from "../types/HttpError";

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();

    return res.status(StatusCodes.OK).json(students);
  }

  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
  }

  async update(req: Request, res: Response) {
    StudentsDB.updateStudent(+req.params.id, req.body).then(student => {
      res.status(StatusCodes.OK).json(student);
    }).catch((error: HttpError) => {
      res.status(error.status).json(error.json);
    })
  }

  async delete(req: Request, res: Response) {
    StudentsDB.deleteStudent(+req.params.id).then(() => {
      res.status(StatusCodes.OK).send();
    }).catch((error: HttpError) => {
      res.status(error.status).json(error.json);
    })
  }
}
