import React, { useState, useEffect } from "react";
import { Navbar } from "../Return_Manager/Navbar";

export const PromotionForm = () => {
  const [promotions, setPromotions] = useState([]);
  const [selectedPromotion, setSelectedPromotion] = useState(null);
  const [totalBuyQty, setTotalBuyQty] = useState(0);
  const [focQty, setFocQty] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Fetch promotions from the backend
    const fetchPromotions = async () => {
      try {
        const response = await fetch("http://localhost:5555/api/promotion");
        const data = await response.json();
        setPromotions(data);
      } catch (error) {
        console.error("Failed to fetch promotions:", error);
      }
    };

    fetchPromotions();
  }, []);

  const handleApplyPromotion = () => {
    if (selectedPromotion && totalBuyQty > 0) {
      if (totalBuyQty % selectedPromotion.totalBuyQty === 0) {
        const calculatedFocQty =
          Math.floor(totalBuyQty / selectedPromotion.totalBuyQty) *
          selectedPromotion.focQty;

        setFocQty(calculatedFocQty);
        setErrorMessage("");
      } else {
        setFocQty(0);
        setErrorMessage("Promotion cannot be applied. Invalid quantity.");
      }
    } else {
      setErrorMessage("Please select a promotion and enter a valid quantity.");
      setFocQty(0);
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="p-4 max-w-lg mx-auto bg-base-200 rounded-lg shadow-md">
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Promotion
          </label>
          <select
            className="select select-bordered w-full"
            onChange={(e) =>
              setSelectedPromotion(
                promotions.find((promo) => promo._id === e.target.value)
              )
            }
          >
            <option value="">Select a promotion</option>
            {promotions.map((promotion) => (
              <option key={promotion._id} value={promotion._id}>
                {promotion.promotionType}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Total Buy Quantity
          </label>
          <input
            type="number"
            className="input input-bordered w-full"
            value={totalBuyQty}
            onChange={(e) => setTotalBuyQty(parseInt(e.target.value))}
          />
        </div>

        <button
          type="button"
          className="btn btn-primary w-full"
          onClick={handleApplyPromotion}
        >
          Apply Promotion
        </button>
      </form>

      {errorMessage && (
        <div className="mt-4 p-4 bg-error text-error-content rounded-lg">
          <h3 className="text-lg font-medium">{errorMessage}</h3>
        </div>
      )}

      {focQty > 0 && !errorMessage && (
        <div className="mt-4 p-4 bg-success text-success-content rounded-lg">
          <h3 className="text-lg font-medium">
            Free of Charge Quantity: {focQty}
          </h3>
        </div>
      )}
    </div>
    </div>
  );
};
