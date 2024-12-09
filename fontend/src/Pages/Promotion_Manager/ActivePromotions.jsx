import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";

export const ActivePromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [promotionToDelete, setPromotionToDelete] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/promotions"
        );
        const now = new Date();
        const activePromotions = response.data.filter(
          (promo) => new Date(promo.endDate) > now
        );
        setPromotions(activePromotions);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/promotions/${promotionToDelete}`
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
        `http://localhost:3000/api/promotions/${selectedPromotion._id}`,
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

  const filteredPromotions = promotions.filter((promotion) =>
    promotion.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 bg-secondary p-8">
      <div className="relative mt-8 p-6 bg-white border-primary border-4 rounded-t-lg shadow-lg">
        <div className="absolute top-0 left-0 bg-primary w-full h-12 flex items-center justify-center rounded-t-lg">
          <h2 className="font-franklinGothic text-white text-2xl">
            Active Promotions
          </h2>
        </div>
        <div className="flex justify-between items-center mt-12 mb-4">
          <div className="flex space-x-4">
            {/* Download PDF Button */}
            <button className="btn bg-[#0A9396] text-white px-4 py-2 rounded-md shadow-md hover:bg-[#0A9396] transition-colors flex items-center">
              <FaDownload className="mr-2" /> Download PDF
            </button>
            {/* Filter Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="btn bg-primary text-white rounded-md px-4 py-2 hover:bg-primary"
              >
                Filter
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg">
                  <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Filter Option 1
                  </button>
                  <button className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100">
                    Filter Option 2
                  </button>
                  {/* Add more filter options as needed */}
                </div>
              )}
            </div>
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for promotions..."
            className="input input-bordered rounded-md w-1/3 shadow-md"
          />
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {filteredPromotions.map((promotion) => (
            <div
              key={promotion._id}
              className="p-4 bg-white rounded-lg shadow-lg border border-accent"
            >
              <h3 className="text-center mb-4 text-xl font-semibold text-accent">
                {promotion.name}
              </h3>
              <p className="text-center mb-2">{promotion.description}</p>
              <p className="text-center text-sm font-league-gothic">
                Ends on: {new Date(promotion.endDate).toLocaleDateString()}
              </p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(promotion)}
                  className="btn bg-accent text-white flex items-center space-x-2 px-4 py-2 rounded-md shadow-md hover:bg-primary transition-colors"
                >
                  <AiOutlineEdit /> <span>Edit</span>
                </button>
                <button
                  onClick={() => {
                    setPromotionToDelete(promotion._id);
                    setShowConfirmModal(true);
                  }}
                  className="btn bg-red-500 text-white flex items-center space-x-2 px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors"
                >
                  <AiOutlineDelete /> <span>Delete</span>
                </button>
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
        <div className="bg-white border-4 border-accent p-4 rounded-lg shadow-lg w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold text-dark mb-4">
            Edit Promotion
          </Dialog.Title>
          <div className="space-y-4">
            <input
              type="text"
              value={selectedPromotion?.name || ""}
              onChange={(e) =>
                setSelectedPromotion({
                  ...selectedPromotion,
                  name: e.target.value,
                })
              }
              placeholder="Promotion Name"
              className="input input-bordered w-full"
            />
            <textarea
              value={selectedPromotion?.description || ""}
              onChange={(e) =>
                setSelectedPromotion({
                  ...selectedPromotion,
                  description: e.target.value,
                })
              }
              placeholder="Promotion Description"
              className="textarea textarea-bordered w-full"
            />
            <input
              type="date"
              value={selectedPromotion?.endDate?.split("T")[0] || ""}
              onChange={(e) =>
                setSelectedPromotion({
                  ...selectedPromotion,
                  endDate: e.target.value,
                })
              }
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowEditModal(false)}
              className="btn bg-gray-200 text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-300 transition-colors mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdatePromotion}
              className="btn bg-accent text-white px-4 py-2 rounded-md shadow-md hover:bg-primary transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </Dialog>

      {/* Confirm Delete Modal */}
      <Dialog
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        className="fixed inset-0 flex items-center justify-center p-4"
      >
        <div className="bg-white border-4 border-accent p-4 rounded-lg shadow-lg w-full max-w-md">
          <Dialog.Title className="text-lg font-semibold text-dark mb-4">
            Are you sure you want to delete this promotion?
          </Dialog.Title>
          <div className="flex justify-end mt-4">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="btn bg-gray-200 text-black px-4 py-2 rounded-md shadow-md hover:bg-gray-300 transition-colors mr-2"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="btn bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
