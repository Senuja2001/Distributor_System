import mongoose from "mongoose";

const returnSchema = new mongoose.Schema(
  {
    returnNo: {
      type: String,
      required: true,
      unique: true, // Primary key
    },
    returnDate: {
      type: Date,
    },
    customerCode: {
      type: String,
      required: true,
    },
    routeCode: {
      type: String,
      default: "184R01", // Default value
    },
    totalNetAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Approved", "Rejected"], // You can adjust this enum
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

export const Return = mongoose.model("Return", returnSchema);
