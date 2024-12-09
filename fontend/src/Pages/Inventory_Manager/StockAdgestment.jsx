import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../Components/Inventory_Manager/Header';
import Navbar from '../../Components/Inventory_Manager/Navbar';

function RestockItems() {
    const { id } = useParams(); // Get item ID from URL parameters (not used here but kept for future reference)

    const [formData, setFormData] = useState({
        warehouseCode: '',
        productCode: '',
        quantityOnHand: undefined // Default to undefined, change it to a number in input
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        console.log("Updated form data:", { ...formData, [name]: value }); // Logs the updated formData
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const restockData = {
            warehouseCode: formData.warehouseCode,  // Lowercase keys to match backend expectations
            productCode: formData.productCode,      // Fixed typo
            quantityAdded: Number(formData.quantityOnHand) // Convert quantityOnHand to a number
        };
    
        console.log("Submitting restock data:", restockData);
        
        axios.post('http://localhost:5555/Item/restock', restockData)
            .then(response => {
                if (response.status === 200) {
                    alert('Stock successfully replenished!');
                } else {
                    alert('Something went wrong. Please try again.');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    alert('Item not found. It may have been deleted.');
                } else {
                    alert('Failed to replenish stock. Please try again.');
                }
                console.error('Error:', error.response ? error.response.data : error.message); // Log error for debugging
            });
    };
    
    return (
        <div>
            <Header />
            <Navbar />
            <div className="container mx-auto p-4 border-2 border-gray-300 rounded-lgmax-w-[1600px] mx-auto my-12 bg-white p-5 rounded-lg shadow-lg w-full">
                <form onSubmit={handleSubmit}>
                    <fieldset className="border p-4 mb-4 rounded-lg">
                        <legend className="w-auto px-2 text-lg font-semibold">Restock :</legend>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
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
                                    <option value="SCNWH">SECONDARY WAREHOUSE</option>
                                    <option value="DVWH1B">BAD TYPE</option>
                                    <option value="DAMAGE_WHS">DAMAGE</option>                                    
                                </select>
                            </div>
                            <div>
                                <label htmlFor="productCode" className="block text-sm font-medium text-gray-700">Product Code:</label>
                                <select
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    id="productCode"
                                    name="productCode"
                                    value={formData.productCode}
                                    onChange={handleChange}
                                    required
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
                            <div>
                                <label htmlFor="quantityOnHand" className="block text-sm font-medium text-gray-700">Quantity to Add:</label>
                                <input
                                    type="number"
                                    className="mt-1 block w-full p-2 border rounded-md"
                                    id="quantityOnHand"
                                    name="quantityOnHand" // Ensure this matches the state key
                                    value={formData.quantityOnHand || ''} // Prevent NaN by converting to string
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="mt-4 btn btn-primary bg-blue-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50 float-right">Submit</button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
}

export default RestockItems;
