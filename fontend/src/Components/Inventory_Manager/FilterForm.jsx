import React, { useState } from 'react';

function FilterForm({ filterData, handleFilterChange }) {
  return (
    <div className="container mx-auto p-4 border-2 border-gray-300 rounded-lgmax-w-[1600px] mx-auto my-12 bg-white p-5 rounded-lg shadow-lg w-full">
      <form>
        <fieldset className="border p-4 mb-4">
          <legend className="w-auto px-2">Filter Data:</legend>
          <div className="grid grid-cols-1 gap-4">
            <div className="col-span-1">
              <label htmlFor="warehouseCode" className="block mb-1">Warehouse Code:</label>
              <select
                className="form-select w-full p-2 border border-gray-300 rounded-md"
                id="warehouseCode"
                name="warehouseCode"
                value={filterData.warehouseCode}
                onChange={handleFilterChange}
              >
                <option value="">Select Warehouse Code</option>
                <option value="208524">PRIMARY</option>
                <option value="SCNWH">SECONDARY</option>
                <option value="DAMAGE_WHS">DAMAGE</option>
                <option value="DVWH1B">BAD TYPE (Expired)</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="col-span-1">
              <label htmlFor="productCode" className="block mb-1">Product Code:</label>
              <select
                className="form-select w-full p-2 border border-gray-300 rounded-md"
                id="productCode"
                name="productCode"
                value={filterData.productCode}
                onChange={handleFilterChange}
              >
                <option value="">Select Product Code</option>
                <option value="F21272001">TOMATO SAUCE 200GR</option>
                <option value="F21292503">GINGER BEER 250ML</option>
                <option value="F21292502">LIME SODA DRINK 250ML</option>
                <option value="F21221003">MIXED FRUIT JAM CUP 100G</option>
                <option value="F21292506">RIDE CLASSIC DOUBLE PACK</option>
                <option value="F21222002">S/BERRY FLV. MELON JAM 200G</option>
                <option value="F21223004">MIXED FRUIT JAM 300G</option>
                <option value="F21281501">MUSTARD CREAM 150G</option>
                <option value="F21283402">KITHUL TREACLE 340ML</option>
                <option value="F21273501">SOYA SAUCE 350ML</option>
                <option value="F21232003">FUN B ORANGE PET 200ML</option>
              </select>
            </div>
            <div className="col-span-1">
              <label htmlFor="quantityOnHand" className="block mb-1">Quantity on Hand:</label>
              <input
                type="number"
                className="form-input w-full p-2 border border-gray-300 rounded-md"
                id="quantityOnHand"
                name="quantityOnHand"
                value={filterData.quantityOnHand}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="quantityAvailable" className="block mb-1">Quantity Available:</label>
              <input
                type="number"
                className="form-input w-full p-2 border border-gray-300 rounded-md"
                id="quantityAvailable"
                name="quantityAvailable"
                value={filterData.quantityAvailable}
                onChange={handleFilterChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            <div className="col-span-1">
              <label htmlFor="quantityAllocated" className="block mb-1">Quantity Allocated:</label>
              <input
                type="number"
                className="form-input w-full p-2 border border-gray-300 rounded-md"
                id="quantityAllocated"
                name="quantityAllocated"
                value={filterData.quantityAllocated}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="cost" className="block mb-1">Cost:</label>
              <input
                type="number"
                className="form-input w-full p-2 border border-gray-300 rounded-md"
                id="cost"
                name="cost"
                step="0.01"
                value={filterData.cost}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="price" className="block mb-1">Price:</label>
              <input
                type="number"
                className="form-input w-full p-2 border border-gray-300 rounded-md"
                id="price"
                name="price"
                step="0.01"
                value={filterData.price}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default FilterForm;
