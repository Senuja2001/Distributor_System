//promotion.controller.js
import Promotion from '../models/promotion.model.js';

// Create a new promotion
export const createPromotion = async (req, res) => {
  try {
    const promotion = new Promotion(req.body);
    await promotion.save();

    res
      .status(201)
      .json({ message: "Promotion created successfully", promotion });
  } catch (error) {
    console.error("Failed to create promotion:", error.message);
    res
      .status(400)
      .json({ message: "Failed to create promotion", error: error.message });
  }
};

// Get all promotions
export const getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.find();
    res.status(200).json(promotions);
  } catch (error) {
    console.error("Failed to fetch promotions:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch promotions", error: error.message });
  }
};

// Get active promotions
export const getActivePromotions = async (req, res) => {
  try {
    const now = new Date();
    const promotions = await Promotion.find({
      promotionStartDate: { $lte: now }, // Started
      endDate: { $gte: now }, // Not ended
    });
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch promotions" });
  }
};

// Update a promotion
export const updatePromotion = async (req, res) => {
  try {
    const updatedPromotion = await Promotion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPromotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    res.status(200).json({
      message: "Promotion updated successfully",
      promotion: updatedPromotion,
    });
  } catch (error) {
    console.error("Failed to update promotion:", error.message);
    res
      .status(400)
      .json({ message: "Failed to update promotion", error: error.message });
  }
};

// Delete a promotion
export const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const promotion = await Promotion.findByIdAndDelete(id);

    if (!promotion) {
      return res.status(404).json({ message: "Promotion not found" });
    }

    res.status(200).json({ message: "Promotion deleted successfully" });
  } catch (error) {
    console.error("Failed to delete promotion:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete promotion", error: error.message });
  }
};

// Automatically delete promotions by endDate
export const deleteExpiredPromotions = async () => {
  try {
    const now = new Date();
    const result = await Promotion.deleteMany({ endDate: { $lt: now } });
    console.log(`Deleted ${result.deletedCount} expired promotions`);
  } catch (error) {
    console.error("Failed to delete expired promotions:", error.message);
  }
};
