import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    _id:{type:String},
    catagory_code:{type:String},
    catagory_name:{type:String},
    product_code:{type:String},
    product_name:{type:String},
    quantity:{type:Number},
    company:{type:String},
    warehouse:{type:String},
    remarks:{type:String},
    order_date:{type:Date},
    status:{type:String,type: String,
        enum: ["Pending", "Confirm"],
        default: "Pending",},
    
})
  
OrderSchema.pre('save', function(next) {
    if (!this._id) {
        this._id = generateCustomId();  // Replace with your custom ID generation logic
    }
    next();
});

function generateCustomId() {
    // Custom ID generation logic, e.g., a combination of timestamp and a random number
    return 'ORD-' + Math.floor(Math.random() * 10000);
}

export default mongoose.model("oder", OrderSchema);