import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {Navbar} from '../../Components/Return_Manager/Navbar';

function AddItem() {
    const [formData, setFormData] = useState({
        warehouseCode: '',
        warehouseDescription: '',
        productCode: '',
        productDescription: '',
        quantityOnHand: '',
        quantityAvailable: '',
        quantityAllocated: '',
        cost: '',
        price: ''
    });

    const updatedData = {
        WarehouseCode: formData.warehouseCode,
        WarehouseDescription: formData.warehouseDescription,
        ProductCode: formData.productCode,
        ProductDescription: formData.productDescription,
        QuantityonHand: Number(formData.quantityOnHand),
        QuantityAvailable: Number(formData.quantityAvailable),
        QuantityAllocated: Number(formData.quantityAllocated),
        Cost: parseFloat(formData.cost),
        Price: parseFloat(formData.price)
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data before submitting:", updatedData);

        axios.post('http://localhost:5555/Item/add', updatedData)
            .then(response => {
                console.log('Data submitted successfully:', response.data);
                alert('Data successfully added to the database!');
            })
            .catch(error => {
                console.error('There was an error submitting the data:', error);
                alert('Data adding failed to the database!');
            });
    };

    return (
        <div>
            
            <Navbar />
            <div className="container mx-auto p-4 border-2 border-gray-300 rounded-lgmax-w-[1600px] mx-auto my-12 bg-white p-5 rounded-lg shadow-lg w-full">
                <form onSubmit={handleSubmit} className="mt-8">
                    <fieldset className="border p-4 mb-4">
                        <legend className="w-auto px-2 text-lg font-semibold">Add New Item :</legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="mb-4">
                                <label htmlFor="warehouseCode" className="block text-sm font-medium text-gray-700">Warehouse Code:</label>
                                <select
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    id="warehouseCode"
                                    name="warehouseCode"
                                    value={formData.warehouseCode}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Warehouse Code</option>
                                    <option value="208524">PRIMARY WAREHOUSE</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="warehouseDescription" className="block text-sm font-medium text-gray-700">Warehouse Description:</label>
                                <select
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    id="warehouseDescription"
                                    name="warehouseDescription"
                                    value={formData.warehouseDescription}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Warehouse Description</option>
                                    <option value="PRIMARY WAREHOUSE">PRIMARY WAREHOUSE</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="productCode" className="block text-sm font-medium text-gray-700">Product Code:</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    id="productCode"
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="mb-4">
                                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Product Description:</label>
                                <input
                                    type="text"
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    id="productDescription"
                                    name="productDescription"
                                    value={formData.productDescription}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="quantityOnHand" className="block text-sm font-medium text-gray-700">Quantity on Hand:</label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    id="quantityOnHand"
                                    name="quantityOnHand"
                                    value={formData.quantityOnHand}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="quantityAvailable" className="block text-sm font-medium text-gray-700">Quantity Available:</label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    id="quantityAvailable"
                                    name="quantityAvailable"
                                    value={formData.quantityAvailable}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="mb-4">
                                <label htmlFor="quantityAllocated" className="block text-sm font-medium text-gray-700">Quantity Allocated:</label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    id="quantityAllocated"
                                    name="quantityAllocated"
                                    value={formData.quantityAllocated}
                                    onChange={handleChange}
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost:</label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    id="cost"
                                    name="cost"
                                    value={formData.cost}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"
                                    min="0"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default AddItem;
