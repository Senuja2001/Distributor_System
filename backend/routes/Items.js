import express from 'express';
import mongoose from 'mongoose';
import Item from '../models/InItem.js';  // Add .js for ES modules
import { stringify as csvStringify } from 'csv-stringify';

const router = express.Router();

router.post("/add", async (req, res) => {
    console.log("Received data:", req.body);
    try {
        const {
            WarehouseCode,
            WarehouseDescription,
            ProductCode,
            ProductDescription,
            QuantityonHand,
            QuantityAvailable,
            QuantityAllocated,
            Cost,
            Price
        } = req.body;

        const item = new Item({
            WarehouseCode,
            WarehouseDescription,
            ProductCode,
            ProductDescription,
            QuantityonHand: Number(QuantityonHand),
            QuantityAvailable: Number(QuantityAvailable),
            QuantityAllocated: Number(QuantityAllocated),
            Cost: Number(Cost),
            Price: Number(Price)
        });

        await item.save();
        res.status(200).json({ message: "Item added successfully" });
    } catch (error) {
        console.error("Error adding item:", error);
        res.status(500).json({ message: "Error adding item", error: error.message });
    }
});

router.get('/', async (req, res) => {
    const { warehouseCode, productCode, quantityOnHand, quantityAvailable, cost, price } = req.query;
    
    let query = {};
    
    if (warehouseCode) {
        query.WarehouseCode = { $regex: warehouseCode, $options: 'i' };  // Case-insensitive partial match
    }
    if (productCode) {
        query.ProductCode = { $regex: productCode, $options: 'i' };
    }
    
    // Add numeric filters if provided
    if (quantityOnHand) {
        query.QuantityonHand = { $gte: Number(quantityOnHand) };  // Filters items where QuantityonHand is greater than or equal to the provided value
    }
    if (quantityAvailable) {
        query.QuantityAvailable = { $gte: Number(quantityAvailable) };
    }
    if (cost) {
        query.Cost = { $gte: Number(cost) };
    }
    if (price) {
        query.Price = { $gte: Number(price) };
    }
    
    try {
        const items = await Item.find(query);  // Execute the query with the filters
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: "Error fetching items", error: error.message });
    }
});

// Read (Get Item by ID)
router.get("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: "Error fetching item", error: error.message });
    }
});

// Update (Modify Item)
router.put("/update/:id", async (req, res) => {
    try {
        const {
            WarehouseCode,
            WarehouseDescription,
            ProductCode,
            ProductDescription,
            QuantityonHand,
            QuantityAvailable,
            QuantityAllocated,
            Cost,
            Price
        } = req.body;

        const item = await Item.findByIdAndUpdate(req.params.id, {
            WarehouseCode,
            WarehouseDescription,
            ProductCode,
            ProductDescription,
            QuantityonHand: Number(QuantityonHand),
            QuantityAvailable: Number(QuantityAvailable),
            QuantityAllocated: Number(QuantityAllocated),
            Cost: Number(Cost),
            Price: Number(Price)
        }, { new: true });

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        res.status(200).json({ message: "Item updated successfully", item });
    } catch (error) {
        res.status(500).json({ message: "Error updating item", error: error.message });
    }
});

// Delete (Remove Item)
router.delete("/delete/:id", async (req, res) => {
    try {
        const item = await Item.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting item", error: error.message });
    }
});

router.get('/report', async (req, res) => {
    try {
        console.log("Fetching inventory items...");
        const items = await Item.find(); // Fetch inventory items
        
        // Create CSV data with the exact field names from the schema
        const csvData = items.map(item => ({
            WarehouseCode: item.WarehouseCode,
            WarehouseDescription: item.WarehouseDescription,
            ProductCode: item.ProductCode,
            ProductDescription: item.ProductDescription,
            QuantityonHand: item.QuantityonHand, // Match this exactly as per schema
            QuantityAvailable: item.QuantityAvailable,
            QuantityAllocated: item.QuantityAllocated,
            Cost: item.Cost,
            Price: item.Price
        }));

        // Your logic to generate CSV and respond to the client goes here...

    } catch (error) {
        console.error("Error in report generation:", error);
        res.status(500).json({ message: 'Error generating report', error: error.message });
    }
});

router.post('/restock', async (req, res) => {
    try {
        const { warehouseCode, productCode, quantityAdded } = req.body;

        // Ensure quantityAdded is a positive number
        if (quantityAdded <= 0) {
            return res.status(400).json({ message: "Quantity added must be greater than zero" });
        }

        // Find the item by warehouse code and product code (ensure the field names match exactly)
        const item = await Item.findOne({ WarehouseCode: warehouseCode, ProductCode: productCode });

        console.log('Incoming request data:', req.body);

        if (!item) {
            return res.status(404).json({ message: "Item not found" });
        }

        // Update the quantity on hand by adding the new stock
        item.QuantityonHand += quantityAdded;
        item.QuantityAvailable += quantityAdded;

        // Save the updated item
        await item.save();

        res.status(200).json({ message: "Stock replenished successfully", updatedItem: item });
    } catch (error) {
        // Log the error details
        console.error("Error restocking item:", error);

        res.status(500).json({ message: "Error restocking item", error: error.message });
    }
});

export default router;
