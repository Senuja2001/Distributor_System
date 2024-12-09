//custComController.js
import Cust from "../models/customerCom.model.js";

//create user
export const create = async (req, res) => {
  try {
    const custData = new Cust(req.body);

    if (!custData) {
      return res.status(404).json({ message: "Customer data not found" });
    }

    const savedDataga = await custData.save();
    res.status(200).json(savedDataga);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all
export const getAll = async (req, res) => {
  try {
    const custData = await Cust.find();
    if (!custData) {
      return res.status(404).json({ message: "Customer data not found" });
    }
    res.status(200).json(custData);
  } catch (error) {
    res.status(500).json({ message: error.error });
  }
};

//get one user
export const getOne = async (req, res) => {
  try {
    const custExist = await Cust.findById(req.params.id);
    if (!custExist) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json(custExist);
  } catch (error) {
    res.status(500).json({ message: error.error });
  }
};

export const update = async (req, res) => {
  try {
    const updatedCust = await Cust.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedCust) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "User updated successfully", updatedCust });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCust = async (req, res) => {
  try {
    const deletedCust = await Cust.findByIdAndDelete(req.params.id);
    if (!deletedCust) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: error.error });
  }
};
