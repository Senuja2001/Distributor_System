import React, { useState } from 'react';
import { Navbar } from '../../Components/Return_Manager/Navbar';
import axios from 'axios';
import Footer from './Footer';

export const OrderPage = () => {
  const [catagory_code, setCatagory_code] = useState('');
  const [catagory_name, setCatagory_name] = useState('');
  const [product_code, setProduct_code] = useState('');
  const [product_name, setProduct_name] = useState('');
  const [quantity, setQuantity] = useState('');
  const [company, setCompany] = useState('');
  const [warehouse, setWarehouse] = useState('');
  const [order_date, setOrder_date] = useState('');
  const [remarks, setRemarks] = useState('');
  const [quantityError, setQuantityError] = useState('');

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      // Accept only non-negative numbers
      setQuantity(value);
      setQuantityError('');
    } else {
      setQuantityError('Quantity must be a non-negative number');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (quantity === '' || Number(quantity) < 0) {
      setQuantityError('Quantity must be a non-negative number');
      return;
    }

    // Convert all fields to lowercase before sending the request
    axios
      .post('http://localhost:5555/order', {
        catagory_code: catagory_code.toLowerCase(),
        catagory_name: catagory_name.toLowerCase(),
        product_code: product_code.toLowerCase(),
        product_name: product_name.toLowerCase(),
        quantity,
        company: company.toLowerCase(),
        warehouse: warehouse.toLowerCase(),
        order_date,
        remarks: remarks.toLowerCase(),
      })
      .then((res) => {
        console.log(res.data);
        alert('Order Created Successfully');
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      
      <Navbar />
      
      <form className="p-4" onSubmit={handleSubmit}>
        
        <div className="bg-white p-6 rounded shadow-md mb-8">
          <h2 className="text-lg font-bold mb-4"> Order | Transaction </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2">Product Catagory Code</label>
              <div className="flex flex-row gap-x-3">
                <input
                  onChange={(e) => setCatagory_code(e.target.value)}
                  type="text"
                  name="distributor"
                  className="border border-gray-300 p-2 rounded"
                />
                <button className="bg-blue-900 w-20 text-white">view</button>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2">Warehouse</label>
              <input
                onChange={(e) => setWarehouse(e.target.value)}
                type="text"
                name="warehouse"
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2">Order Date </label>
              <input
                onChange={(e) => setOrder_date(e.target.value)}
                type="date"
                name="orderDateFrom"
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2">Remark</label>
              <input
                onChange={(e) => setRemarks(e.target.value)}
                type="text"
                name="remark"
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2">Company</label>
              <select
                onChange={(e) => setCompany(e.target.value)}
                name="company"
                className="border border-gray-300 p-2 rounded"
              >
                <option value="">Select a Company</option>
                <option value="Coca Cola">Coca Cola</option>
                <option value="Bighit ">Bighit</option>
                <option value="YG">YG</option>
                {}
              </select>
            </div>
          </div>
        </div>

        
        <div className="bg-white p-6 rounded shadow-md mb-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="mb-2">Product Catagory Description</label>
              <input
                onChange={(e) => setCatagory_name(e.target.value)}
                type="text"
                name="catagory description"
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2">Product Code</label>
              <div className="flex flex-row gap-x-3">
                <input
                  onChange={(e) => setProduct_code(e.target.value)}
                  type="text"
                  name="product code"
                  className="border border-gray-300 p-2 rounded"
                />
                <button className="bg-blue-900 w-20 text-white">view</button>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-2">Product Description</label>
              <input
                onChange={(e) => setProduct_name(e.target.value)}
                type="text"
                name="remark"
                className="border border-gray-300 p-2 rounded"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2">Quantity</label>
              <input
                onChange={handleQuantityChange}
                value={quantity}
                type="text"
                name="company"
                className="border border-gray-300 p-2 rounded"
              />
              {quantityError && (
                <span className="text-red-500 text-sm">{quantityError}</span>
              )}
            </div>
          </div>

          <div className="col-span-2 flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <Footer/>
    </div>
  );
};
