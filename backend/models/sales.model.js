import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    orderno: {
      type: String,
    },
    cname: {
      type: String,
      required: [true, "cname is Required!"],
    },
    ccode: {
      type: String,
    },
    cphone: {
      type: String,
    },
    cemail: {
      type: String,
    },
    rcode: {
      type: String,
    },
    odate: {
      type: String,
    },

    status: {
      type: String,
      default: "Pending",
    },
    distibutor: {
      type: String,
    },
    dphone: {
      type: String,
    },
    demail: {
      type: String,
    },
    tamount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Sales = mongoose.model("Sales", salesSchema);
export default Sales;
