import React, { useState } from "react";
import axios from "axios";
import { FaSave } from "react-icons/fa";
import { Dialog } from "@headlessui/react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HelpIcon from "@mui/icons-material/Help";
import { Navbar } from "../../Components/Return_Manager/Navbar";

export const AddPromotion = () => {
  const [formData, setFormData] = useState({
    promotionType: "",
    promotionDescription: "",
    promotionCode: "",
    distributor: "",
    distributorEmail: "", // New field
    promotionStartDate: "",
    promotionEndDate: "",
    totalBuyQty: "",
    focQty: "",
  });

  const [errors, setErrors] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.promotionType)
      newErrors.promotionType = "Promotion type is required";
    if (!formData.promotionDescription)
      newErrors.promotionDescription = "Description is required";
    if (!formData.promotionCode)
      newErrors.promotionCode = "Promotion code is required";
    if (!formData.distributor)
      newErrors.distributor = "Distributor is required";
    if (!formData.distributorEmail)
      newErrors.distributorEmail = "Distributor email is required"; // New validation
    if (!formData.promotionStartDate)
      newErrors.promotionStartDate = "Start date is required";
    if (!formData.promotionEndDate)
      newErrors.promotionEndDate = "End date is required";
    if (!formData.totalBuyQty || formData.totalBuyQty < 1)
      newErrors.totalBuyQty = "Must be at least 1";
    if (formData.focQty < 0) newErrors.focQty = "Cannot be negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:5555/api/promotion",
          formData
        );
        console.log("Promotion added successfully:", response.data);
        setFormData({
          promotionType: "",
          promotionDescription: "",
          promotionCode: "",
          distributor: "",
          distributorEmail: "", // Resetting the new field
          promotionStartDate: "",
          promotionEndDate: "",
          totalBuyQty: "",
          focQty: "",
        });
        setShowConfirmModal(true);
      } catch (error) {
        console.error("Failed to add promotion:", error.message);
        alert("Failed to add promotion.");
      }
    }
  };

  const handleReset = () => {
    setFormData({
      promotionType: "",
      promotionDescription: "",
      promotionCode: "",
      distributor: "",
      distributorEmail: "", // Resetting the new field
      promotionStartDate: "",
      promotionEndDate: "",
      totalBuyQty: "",
      focQty: "",
    });
    setErrors({});
  };

  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="relative mt-8 p-8 bg-white border-4 border-gray-300 rounded-lg shadow-xl w-full max-w-3xl transition-all transform hover:scale-105">
        <div className="absolute top-0 left-0 bg-primary w-full h-14 flex items-center justify-center rounded-t-lg">
          <h2 className="text-2xl font-bold text-white">Add Promotion</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-8 mt-16 animate-fade-in"
        >
          {/* Form fields */}
          {Object.keys(formData).map((field) => (
            <div key={field} className="mb-6 relative">
              <label className="block text-lg font-semibold text-gray-700 mb-2 flex items-center">
                {field
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                {errors[field] && (
                  <Tooltip title={errors[field]} placement="top">
                    <IconButton size="small">
                      <HelpIcon className="text-red-500" fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </label>
              {field === "promotionDescription" ? (
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full text-lg p-4 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              ) : field === "distributor" ? (
                <select
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="select select-bordered w-full text-lg p-4 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                >
                  <option value="">Select Distributor</option>
                  <option value="Distributor A">Wijesinghe</option>
                  <option value="Distributor B">Nanayakkara</option>
                  <option value="Distributor C">Jayasundara</option>
                </select>
              ) : (
                <input
                  type={
                    field.includes("Date")
                      ? "date"
                      : field === "totalBuyQty" || field === "focQty"
                      ? "number"
                      : field === "distributorEmail" // Check if the field is distributorEmail
                      ? "email" // Set the input type to email
                      : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="input input-bordered w-full text-lg p-4 rounded-md shadow-md focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
              )}
            </div>
          ))}
          <div className="flex justify-between space-x-6">
            <button
              type="button"
              onClick={handleReset}
              className="btn text-lg bg-red-500 text-white flex items-center space-x-2 px-6 py-3 rounded-md shadow-md hover:bg-green-600 transition-transform transform hover:scale-105"
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn text-lg bg-primary text-white flex items-center space-x-2 px-6 py-3 rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
            >
              <FaSave className="mr-2" /> Add Promotion
            </button>
          </div>
        </form>
      </div>

      {/* Confirmation Modal */}
      <Dialog
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      >
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center animate-fade-in"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-xl transition-transform transform hover:scale-105">
            <h3 className="text-lg font-semibold mb-4">Promotion Added</h3>
            <p className="mb-4">The promotion has been successfully added.</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="btn bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-transform transform hover:scale-105"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
    </div>
  );
};
