//custRoute.js
import express from "express";
import {
  create,
  deleteCust,
  getAll,
  getOne,
  update,
} from "../controller/customerCom.controller.js";

const cust = express.Router();

cust.post("/create", create);
cust.get("/getAll", getAll);
cust.get("/getOne/:id", getOne);
cust.put("/update/:id", update);
cust.delete("/delete/:id", deleteCust);

export default cust;
