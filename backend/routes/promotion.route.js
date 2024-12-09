//promotionroute
import express from "express";
import {
  createPromotion,
  getPromotions,
  getActivePromotions,
  updatePromotion,
  deletePromotion,
  deleteExpiredPromotions,
} from "../controller/promotion.controller.js";
import schedule from "node-schedule";

const router = express.Router();

// Routes
router.post("/", createPromotion);
router.get("/", getPromotions);
router.get("/promotions", getActivePromotions);
router.put("/:id", updatePromotion);
router.delete("/:id", deletePromotion);

// Schedule the automatic deletion to run at midnight every day
schedule.scheduleJob("0 0 * * *", deleteExpiredPromotions);

export default router;
