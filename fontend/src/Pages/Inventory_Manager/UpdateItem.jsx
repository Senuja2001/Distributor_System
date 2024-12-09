import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // React Router to get URL parameters
import Header from '../../Components/Inventory_Manager/Header';
import Navbar from '../../Components/Inventory_Manager/Navbar';

function UpdateItem() {
    const { id } = useParams(); // Extract item ID from URL parameters
    const [loading, setLoading] = useState(true);  // Track loading state
    const [error, setError] = useState(null);      // Track error state

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

    // Fetch item data for editing
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5555/item/${id}`);
                setFormData({
                    warehouseCode: response.data.WarehouseCode,
                    warehouseDescription: response.data.WarehouseDescription,
                    productCode: response.data.ProductCode,
                    productDescription: response.data.ProductDescription,
                    quantityOnHand: response.data.QuantityonHand,
                    quantityAvailable: response.data.QuantityAvailable,
                    quantityAllocated: response.data.QuantityAllocated,
                    cost: response.data.Cost,
                    price: response.data.Price
                });
                setLoading(false);  // Stop loading once data is fetched
            } catch (error) {
                setError(error.message);
                setLoading(false);  // Stop loading if an error occurs
            }
        };

        fetchData();
    }, [id]);  // Re-fetch data when `id` changes

    const updatedData = {
        WarehouseCode: formData.warehouseCode,
        WarehouseDescription: formData.warehouseDescription,
        ProductCode: formData.productCode,
        ProductDescription: formData.productDescription,
        QuantityonHand: Number(formData.quantityOnHand),
        QuantityAvailable: Number(formData.quantityAvailable),
        QuantityAllocated: Number(formData.quantityAllocated),
        Cost: parseFloat(formData.cost),  // Parse as float for decimal handling
        Price: parseFloat(formData.price)  // Parse as float for decimal handling
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data before submitting:", updatedData);

        axios.put(`http://localhost:5555/Item/update/${id}`, updatedData) // Send updated data to the backend
            .then(response => {
                console.log('Data updated successfully:', response.data);
                alert('Item successfully updated!');
            })
            .catch(error => {
                console.error('Error updating item:', error);
                alert('Failed to update item.');
            });
    };

    if (loading) {
        return <p>Loading inventory data...</p>; // Loading message
    }

    if (error) {
        return <p>Error fetching data: {error}</p>; // Error message
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Header />
            <Navbar />
            <div className="container mx-auto p-4 border-2 border-gray-300 rounded-lg max-w-[1600px] my-12 bg-white p-5 shadow-lg">
                <form onSubmit={handleSubmit} className="border p-4 mb-4">
                    <fieldset className="border-t-2 border-gray-300 p-4 mb-4">
                        <legend className="text-lg font-semibold">Update Item Data:</legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label htmlFor="warehouseCode" className="block text-sm font-medium text-gray-700">Warehouse Code:</label>
                                <input
                                    type="text"
                                    className="form-select w-full p-2 border border-gray-300 rounded-md bg-gray-200 select-none cursor-not-allowed"
                                    id="warehouseCode"
                                    name="warehouseCode"
                                    value={formData.warehouseCode}
                                    onChange={handleChange}
                                    required
                                    readOnly
                                />
                            </div>
                            <div>
                                <label htmlFor="warehouseDescription" className="block text-sm font-medium text-gray-700">Warehouse Description:</label>
                                <input
                                    type="text"
                                    className="form-select w-full p-2 border border-gray-300 rounded-md bg-gray-200 select-none cursor-not-allowed"
                                    id="warehouseDescription"
                                    name="warehouseDescription"
                                    value={formData.warehouseDescription}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label htmlFor="productCode" className="block text-sm font-medium text-gray-700">Product Code:</label>
                                <input
                                    type="text"
                                    className="form-select w-full p-2 border border-gray-300 rounded-md bg-gray-200 select-none cursor-not-allowed"
                                    id="productCode"
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={handleChange}
                                    required
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700">Product Description:</label>
                                <input
                                    type="text"
                                    className="form-select w-full p-2 border border-gray-300 rounded-md bg-gray-200 select-none cursor-not-allowed"
                                    id="productDescription"
                                    name="productDescription"
                                    value={formData.productDescription}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label htmlFor="quantityOnHand" className="block text-sm font-medium text-gray-700">Quantity on Hand:</label>
                                <input
                                    type="number"
                                    className="form-input w-full p-2 border border-gray-300 rounded-md"
                                    id="quantityOnHand"
                                    name="quantityOnHand"
                                    value={formData.quantityOnHand}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="quantityAvailable" className="block text-sm font-medium text-gray-700">Quantity Available:</label>
                                <input
                                    type="number"
                                    className="form-input w-full p-2 border border-gray-300 rounded-md"
                                    id="quantityAvailable"
                                    name="quantityAvailable"
                                    value={formData.quantityAvailable}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <div>
                                <label htmlFor="quantityAllocated" className="block text-sm font-medium text-gray-700">Quantity Allocated:</label>
                                <input
                                    type="number"
                                    className="form-input w-full p-2 border border-gray-300 rounded-md"
                                    id="quantityAllocated"
                                    name="quantityAllocated"
                                    value={formData.quantityAllocated}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost:</label>
                                <input
                                    type="number"
                                    className="form-input w-full p-2 border border-gray-300 rounded-md"
                                    id="cost"
                                    name="cost"
                                    value={formData.cost}
                                    onChange={handleChange}
                                    step="0.01"  // Ensure correct decimal formatting
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price:</label>
                                <input
                                    type="number"
                                    className="form-input w-full p-2 border border-gray-300 rounded-md"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    step="0.01"  // Ensure correct decimal formatting
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default UpdateItem;
