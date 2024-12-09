// routes/returnRouter.js
import express from "express";
import {
  getReturns,
  getReturnById,
  createReturn,
  updateReturn,
  deleteReturn,
} from "../controller/return.controller.js"; // Import the controller functions

const router = express.Router();

// Route for getting all Return records (with search functionality)
router.get("/", getReturns);

// Route for getting a return record by ID
router.get("/:id", getReturnById);

// Route for creating a new return record
router.post("/", createReturn);

// Route for updating a return record
router.put("/:id", updateReturn);

// Route for deleting a return record
router.delete("/:id", deleteReturn);

export default router;
