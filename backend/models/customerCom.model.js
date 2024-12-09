//custComModel.js
import mongoose from "mongoose";

const CustComSchema = new mongoose.Schema({
  salesRep: {
    type: String,
    enum: ["EM6555", "EM5894", "EM7483", "EM8678"],
    required: true,
    unique: true,
  },
  route: {
    type: String,
    enum: ["184R01-Moratuwa", "184R02-Panadura"],
    required: true,
  },
  customer: {
    type: String,
    enum: [
      "ELISHA SUPERSTORE",
      "LAL STORES",
      "SAMPATH STORES",
      "SHAMAL STORES",
    ],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

export default mongoose.model("CustCom", CustComSchema);
