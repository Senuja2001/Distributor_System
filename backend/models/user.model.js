import mongoose from "mongoose";

const deliveryPersonnelSchema = new mongoose.Schema({
  empID: {
    type: String,
    required: true,
    unique: true,
  },
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  role: {
    // New role field added
    type: String,
    enum: ["Driver", "Sales Representative"],
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  joinDate: {
    type: Date,
    required: true,
  },
});
// Auto-generate empID (EM+number)
deliveryPersonnelSchema.pre("save", async function (next) {
  if (!this.empID) {
    const count = await this.constructor.countDocuments(); // Get total number of employees
    this.empID = `EM${(count + 1).toString().padStart(3, "0")}`; // Format: EM001, EM002...
  }
  next();
});

export default mongoose.model("DeliveryPersonnel", deliveryPersonnelSchema);
