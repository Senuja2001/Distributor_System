import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const AllPromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    sortBy: "none", // Default no sorting
  });
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch promotions from the server
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/api/promotion"
        );
        setPromotions(response.data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterOptions({
      ...filterOptions,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5555/api/promotion/${promotionToDelete}`
      );
      setPromotions(
        promotions.filter((promotion) => promotion._id !== promotionToDelete)
      );
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Failed to delete promotion:", error);
    }
  };

  const handleEdit = (promotion) => {
    setSelectedPromotion(promotion);
    setShowEditModal(true);
  };

  const handleUpdatePromotion = async () => {
    try {
      await axios.put(
        `http://localhost:5555/api/promotion/${selectedPromotion._id}`,
        selectedPromotion
      );
      setPromotions(
        promotions.map((promotion) =>
          promotion._id === selectedPromotion._id
            ? selectedPromotion
            : promotion
        )
      );
      setShowEditModal(false);
    } catch (error) {
      console.error("Failed to update promotion:", error);
    }
  };

  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    const tableData = sortedPromotions.map((promotion) => [
      promotion.promotionType,
      promotion.promotionDescription,
      promotion.promotionCode,
      promotion.distributor,
      new Date(promotion.promotionStartDate).toLocaleDateString(),
      new Date(promotion.promotionEndDate).toLocaleDateString(),
      promotion.totalBuyQty,
      promotion.focQty,
    ]);

    autoTable(doc, {
      head: [
        [
          "Type",
          "Description",
          "Code",
          "Distributor",
          "Start Date",
          "End Date",
          "Total Buy Qty",
          "FOC Qty",
        ],
      ],
      body: tableData,
    });

    doc.save("promotions.pdf");
  };

  const sortOptions = ["none", "Type", "Start Date", "End Date"]; // Sorting options

  // Filtering based on search query (only by type)
  const filteredPromotions = promotions.filter((promotion) =>
    promotion.promotionType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic based on filter options
  const sortedPromotions = [...filteredPromotions].sort((a, b) => {
    if (filterOptions.sortBy === "Type") {
      return a.promotionType.localeCompare(b.promotionType);
    } else if (filterOptions.sortBy === "Start Date") {
      return new Date(a.promotionStartDate) - new Date(b.promotionStartDate);
    } else if (filterOptions.sortBy === "End Date") {
      return new Date(a.promotionEndDate) - new Date(b.promotionEndDate);
    } else {
      return 0; // No sorting
    }
  });

  return (
    <div className="flex-1 bg-gray-100 p-8">
      <div className="relative mt-8 p-6 bg-white border-gray-300 border-4 rounded-lg shadow-lg">
        <div className="absolute top-0 left-0 bg-primary w-full h-12 flex items-center justify-center rounded-t-lg">
          <h2 className="text-white text-2xl font-semibold">All Promotions</h2>
        </div>
        <div className="flex justify-between items-center mt-12 mb-4">
          <div className="flex space-x-4">
            {/* Download PDF Button */}
            <button
              onClick={handleGeneratePDF}
              className="bg-teal-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-700 transition-colors flex items-center"
            >
              <FaDownload className="mr-2" /> Download PDF
            </button>
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-primary text-white rounded-md px-4 py-2 hover:bg-blue-700"
              >
                Sort By
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <div className="px-4 py-2">
                    <label className="block text-gray-700">Sort By</label>
                    <select
                      name="sortBy"
                      value={filterOptions.sortBy}
                      onChange={handleFilterChange}
                      className="input input-bordered w-full"
                    >
                      {sortOptions.map((option) => (
                        <option key={option} value={option}>
                          {option === "none" ? "No Sorting" : option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by type..."
            className="input input-bordered px-2 py-1 border-2 border-blue-400 outline-none rounded-md w-1/3 shadow-md"
          />
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {sortedPromotions.map((promotion) => (
            <div
              key={promotion._id}
              className="relative p-4 bg-white border-gray-300 border-4 rounded-lg shadow-md"
            >
              <div className="absolute top-0 left-0 bg-primary w-full h-12 flex items-center justify-center rounded-t-lg">
                <h3 className="text-white text-xl font-semibold">
                  {promotion.promotionType}
                </h3>
              </div>
              <div className="pt-12">
                <p className="text-center mb-2 text-gray-700">
                  <strong>Description:</strong> {promotion.promotionDescription}
                </p>
                <p className="text-center mb-2 text-gray-700">
                  <strong>Code:</strong> {promotion.promotionCode}
                </p>
                <p className="text-center mb-2 text-gray-700">
                  <strong>Distributor:</strong> {promotion.distributor}
                </p>
                <p className="text-center mb-2 text-gray-700">
                  <strong>Start Date:</strong>{" "}
                  {new Date(promotion.promotionStartDate).toLocaleDateString()}
                </p>
                <p className="text-center mb-2 text-gray-700">
                  <strong>End Date:</strong>{" "}
                  {new Date(promotion.promotionEndDate).toLocaleDateString()}
                </p>
                <p className="text-center mb-2 text-gray-700">
                  <strong>Total Buy Qty:</strong> {promotion.totalBuyQty}
                </p>
                <p className="text-center mb-2 text-gray-700">
                  <strong>FOC Qty:</strong> {promotion.focQty}
                </p>
                <div className="flex justify-around mt-4">
                  <button
                    onClick={() => handleEdit(promotion)}
                    className="bg-primary  text-black px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors flex items-center"
                  >
                    <AiOutlineEdit className="mr-1" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      setPromotionToDelete(promotion._id);
                      setShowConfirmModal(true);
                    }}
                    className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors flex items-center"
                  >
                    <AiOutlineDelete className="mr-1" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Edit Promotion Modal */}
      <Dialog
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Edit Promotion
          </Dialog.Title>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                value={selectedPromotion?.promotionDescription || ""}
                onChange={(e) =>
                  setSelectedPromotion({
                    ...selectedPromotion,
                    promotionDescription: e.target.value,
                  })
                }
                className="input input-bordered w-full h-24"
              />
            </div>
            <div>
              <label className="block text-gray-700">End Date</label>
              <input
              
                type="date"
                value={selectedPromotion?.promotionEndDate || ""}
                onChange={(e) =>
                  setSelectedPromotion({
                    ...selectedPromotion,
                    promotionEndDate: e.target.value,
                  })
                }
                className="input input-bordered w-full border-2 px-2 py-1 rounded-md border-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">Total Buy Qty</label>
              <input
                type="number"
                value={selectedPromotion?.totalBuyQty || ""}
                onChange={(e) =>
                  setSelectedPromotion({
                    ...selectedPromotion,
                    totalBuyQty: e.target.value,
                  })
                }
                className="input input-bordered w-full border-2 px-2 py-1 rounded-md border-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700">FOC Qty</label>
              <input
                type="number"
                value={selectedPromotion?.focQty || ""}
                onChange={(e) =>
                  setSelectedPromotion({
                    ...selectedPromotion,
                    focQty: e.target.value,
                  })
                }
                className="input input-bordered w-full"
              />
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdatePromotion}
                className="bg-primary text-black px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-4 max-w-sm w-full">
          <Dialog.Title className="text-xl font-semibold mb-4">
            Confirm Deletion
          </Dialog.Title>
          <p className="text-gray-700 mb-4">
            Are you sure you want to delete this promotion?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md shadow-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  );
};
