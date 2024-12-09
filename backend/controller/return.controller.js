// controllers/returnController.js
import { Return } from "../models/return.model.js";

// Get all return records (with search functionality)
export const getReturns = async (req, res) => {
  try {
    const {
      returnNo,
      returnDateFrom,
      returnDateTo,
      customerCode,
      routeCode,
      status,
    } = req.query;

    // Build the search criteria
    const searchCriteria = {};

    if (returnNo) {
      searchCriteria.returnNo = { $regex: returnNo, $options: "i" }; // Case insensitive
    }
    if (returnDateFrom || returnDateTo) {
      searchCriteria.returnDate = {};
      if (returnDateFrom) {
        searchCriteria.returnDate.$gte = new Date(returnDateFrom);
      }
      if (returnDateTo) {
        searchCriteria.returnDate.$lte = new Date(returnDateTo);
      }
    }
    if (customerCode) {
      searchCriteria.customerCode = { $regex: customerCode, $options: "i" };
    }
    if (routeCode) {
      searchCriteria.routeCode = { $regex: routeCode, $options: "i" };
    }
    if (status) {
      searchCriteria.status = status; // Exact match
    }

    const returns = await Return.find(searchCriteria);
    res.status(200).json({ data: returns });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get return record by ID
export const getReturnById = async (req, res) => {
  try {
    const { id } = req.params;
    const returnRecord = await Return.findById(id);

    if (!returnRecord) {
      return res.status(404).send({ message: "Return record not found" });
    }

    res.status(200).json(returnRecord);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Create new return record
export const createReturn = async (req, res) => {
  try {
    const {
      returnNo,
      returnDate,
      customerCode,
      routeCode,
      totalNetAmount,
      status,
    } = req.body;

    if (
      !returnNo ||
      !returnDate ||
      !customerCode ||
      !totalNetAmount ||
      !status
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: returnNo, returnDate, customerCode, routeCode, totalNetAmount, status",
      });
    }

    if (totalNetAmount < 0) {
      return res.status(400).send({
        message: "TotalNetAmount cannot be negative",
      });
    }

    const newReturn = new Return({
      returnNo,
      returnDate,
      customerCode,
      routeCode,
      totalNetAmount,
      status,
    });

    const savedReturn = await newReturn.save();
    res.status(201).json(savedReturn);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update return record
export const updateReturn = async (req, res) => {
  try {
    const { returnNo, returnDate, customerCode, totalNetAmount, status } =
      req.body;

    if (
      !returnNo ||
      !returnDate ||
      !customerCode ||
      !totalNetAmount ||
      !status
    ) {
      return res.status(400).send({
        message:
          "Send all required fields: returnNo, returnDate, customerCode, totalNetAmount, status",
      });
    }

    const { id } = req.params;
    const updatedRecord = await Return.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedRecord) {
      return res.status(404).json({ message: "Return record not found" });
    }

    res.status(200).json(updatedRecord);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};

// Delete return record
export const deleteReturn = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Return.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Return record not found" });
    }

    res.status(200).send({ message: "Return record deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ message: error.message });
  }
};
