import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // Import the database connection
import returnsRoute from "./routes/return.route.js"; // Updated to use the correct returns route
import salesRoute from "./routes/sales.route.js"; // Updated to use the correct returns route
import route from "./routes/user.route.js";
import cust from "./routes/customer.route.js";
import Delivery from "./routes/delivery.route.js";
import Promotion from "./routes/promotion.route.js";
import ItemsRouter from "./routes/Items.js"
import OrderRoute from "./routes/OrderRoute.js"
import customerRoutes from "./routes/customerRoutes.js"
import complainRouter from "./routes/complain.js"
import cors from "cors"



dotenv.config(); // Load environment variables

// Initialize express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))


// Connect to the database
connectDB();

// Basic home route
// app.get("/", (req, res) => {
//   res.send("API is running...");
// });

app.use("/api/returns", returnsRoute); // Updated to use 'returnsRoute'
app.use("/api/sales", salesRoute);
app.use("/api/promotion", Promotion);

//Delivery
app.use("/api/user", route);
app.use("/api/cust", cust);
app.use("/api/deliv", Delivery);


//Items
app.use("/Item",ItemsRouter);

//Order
app.use('/order', OrderRoute)

//complints
app.use("/complain", complainRouter);

//customer
app.use('/api/customers', customerRoutes);



// Error handling middleware (optional, can expand it)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
});

// Define port from environment or use default
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
