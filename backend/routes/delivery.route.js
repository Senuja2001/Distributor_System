//delivRoute.js
import express from "express";
import {
  create,
  delete1,
  getAll,
  getOne,
  update,
} from "../controller/delivery.controller.js";

const Delivery = express.Router();

Delivery.post("/create", create);
Delivery.get("/getAll", getAll);
Delivery.get("/getOne/:id", getOne);
Delivery.put("/update/:id", update);
Delivery.delete("/delete/:id", delete1);

export default Delivery;
