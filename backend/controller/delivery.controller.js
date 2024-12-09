//delivController.js
import Delivery from "../models/delivery.model.js";

//create user
export const create = async (req, res) => {
  try {
    const dlvData = new Delivery(req.body);

    if (!dlvData) {
      return res.status(404).json({ message: "Delivery data not found" });
    }

    const savedDataga = await dlvData.save();
    res.status(200).json(savedDataga);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get all
export const getAll = async (req, res) => {
  try {
    const dlvData = await Delivery.find();
    if (!dlvData) {
      return res.status(404).json({ message: "Delivery data not found" });
    }
    res.status(200).json(dlvData);
  } catch (error) {
    res.status(500).json({ message: error.error });
  }
};

//get one user
export const getOne = async (req, res) => {
  try {
    const dlvExist = await Delivery.findById(req.params.id);
    if (!dlvExist) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res.status(200).json(dlvExist);
  } catch (error) {
    res.status(500).json({ message: error.error });
  }
};

export const update = async (req, res) => {
  try {
    const updateddlv = await Delivery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updateddlv) {
      return res.status(404).json({ message: "Delivery not found" });
    }
    res
      .status(200)
      .json({ message: "Delivery Details updated successfully", updateddlv });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const delete1 = async (req, res) => {
  try {
    const delete1 = await Delivery.findByIdAndDelete(req.params.id);
    if (!delete1) {
      return res.status(404).json({ message: "Delivery Details not found" });
    }
    res.status(200).json({ message: "Delivery Details deleted" });
  } catch (error) {
    res.status(500).json({ message: error.error });
  }
};
