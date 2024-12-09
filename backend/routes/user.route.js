import express from "express";
import {
  create,
  deleteUser,
  getAll,
  getOne,
  update,
} from "../controller/user.controller.js";

const route = express.Router();

route.post("/create", create);
route.get("/getAll", getAll);
route.get("/getOne/:id", getOne);
route.put("/update/:id", update);
route.delete("/delete/:id", deleteUser);

export default route;
