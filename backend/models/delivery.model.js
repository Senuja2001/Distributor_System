//delivModel.js
import mongoose from "mongoose";

// Define a schema for the delivery details
const deliverySchema = new mongoose.Schema({
  deliveryId: {
    type: String,
    required: true,
    unique: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  customer: {
    type: String,
    required: true,
  },
  route: {
    type: String,
    required: true,
  },
  expectedDeliveryTime: {
    type: String,
    required: true,
  },
  actualDeliveryTime: {
    type: String,
    required: false,
  },
  deliveryStatus: {
    type: String,
    enum: ["Pending", "Delivered"],
    required: true,
  },
});

// Create the model using the schema

export default mongoose.model("Delivery", deliverySchema);
