import { celebrate, Joi } from "celebrate";
import express from "express";
import { StudentsController } from "./controllers/studentController";
import { StudentSchema } from "./types/Student";

const routes = express.Router();

const studentsController = new StudentsController();

routes.get("/ping", (_, res) => res.json("pong"));

routes.get("/students", studentsController.get);
routes.post(
  "/students",
  celebrate({ body: Joi.object().keys(StudentSchema) }),
  studentsController.create
);
routes.put(
  "/students/:id",
  celebrate({
    params: Joi.object().keys({ id: Joi.number() }),
    body: Joi.object().keys(StudentSchema),
  }),
  studentsController.update
);
routes.delete(
  "/students/:id",
  celebrate({
    params: Joi.object().keys({ id: Joi.number() }),
  }),
  studentsController.delete
);


export default routes;
