import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

//create order
router.post("/", async (req, res) => {
  const {
    catagory_code,
    catagory_name,
    product_code,
    product_name,
    quantity,
    company,
    warehouse,
    order_date,
    remarks,
    status
  } = req.body;

  try {
    const newOrder = new Order({
      catagory_code,
      catagory_name,
      product_code,
      product_name,
      quantity,
      company,
      warehouse,
      order_date,
      remarks,
      status
    });

    await newOrder.save();
    return res.json({ message: "order created" });
  } catch {
    res.status(400).json({ message: "order not created" });
  }
});

//Get all the orders

router.get('/', async(req,res)=>{ 

    try{

        const orders = await Order.find({})

        return res.status(200).json({
            
            data: orders
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 


//get one order

router.get('/:id', async(req,res)=>{ 

    try{

        const {id} = req.params;
        const order = await Order.findById(id)

        return res.status(200).json({
            
            data: order
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 


//Update orders

router.put('/:id', async(req, res)=>{ 

    try {

      

        const {id} = req.params;
        const result = await Order.findByIdAndUpdate(id, req.body)

        if(!result){
            return res.status(404).json({message: 'order not found'})
        }

        return res.status(200).send({message: 'order update successfully'})
        
    } catch (error) {

        console.log(error.message)
        res.status(500).send({message: error.message})
        
    }
})


//Delete order

router.delete('/:id', async(req,res)=>{ 

    try{

        const {id} = req.params;
        const result = await Order.findByIdAndDelete(id)

        if(!result){
            return res.status(404).send({message:'complaint not found'})
        }

        return res.status(200).send({message: "compalaint deleted successfuly"})

        
    }catch(err){
        console.log(err.message)
        res.status(500).send({message: err.message})
    }
}) 
export default router;
