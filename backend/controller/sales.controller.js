import salesModel from "../models/sales.model.js";

const newsalesController = async (req, res) => {
  try {
    const transaction = new salesModel(req.body);
    await transaction.save();

    return res.status(201).send({
      sucess: true,
      message: "Transaction Successfully",
      transaction,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in transaction API",
      error,
    });
  }
};

const getallSale = async (req, res) => {
  try {
    const sales = await salesModel.find();
    res.json(sales);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getoneSale = async (req, res) => {
  try {
    const transaction = await salesModel.findOne({
      transactionID: req.params.tid,
    });

    if (!transaction) {
      return res.status(404).send({
        success: false,
        message: "Transaction Not Found!",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        transaction,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in Fetch API!",
      error,
    });
  }
};

const getSalesById = async (req, res) => {
  try {
    const sale = await salesModel.findById(req.params.id);
    if (!sale) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier not found" });
    }
    res.status(200).json({ success: true, data: sale });
  } catch (error) {
    console.error("Error fetching supplier:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const deleteSale = async (req, res) => {
  try {
    await salesModel.findByIdAndDelete(req.params.ssid);
    res.status(200).send({
      success: true,
      message: "Transaction deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Delete API!",
      error: error.message,
    });
  }
};

const upsale = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedItem = await salesModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: "Error Updating Sales Data", error });
  }
};

export {
  newsalesController,
  getoneSale,
  getSalesById,
  deleteSale,
  getallSale,
  upsale,
};
