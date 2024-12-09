import React, { useState, useEffect } from 'react';
import BackButton from '../../Components/Return_Manager/BackButton';
import Spinner from '../../Components/Return_Manager/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const CreateReturn = () => {
    const [customerCode, setCustomerCode] = useState('');
    const [routeCode, setRouteCode] = useState('184R01'); // Default value for route code
    const [totalNetAmount, setTotalNetAmount] = useState(0);
    const [status, setStatus] = useState('');
    const [returnNo, setReturnNo] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [products, setProducts] = useState([]); // To store product details
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQty, setProductQty] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Function to generate a new return number
    const generateReturnNo = () => {
        const timestamp = Date.now(); // Use current timestamp to ensure uniqueness
        return `RT${timestamp}`;
    };

    // Set the generated return number on component mount
    useEffect(() => {
        const newReturnNo = generateReturnNo();
        setReturnNo(newReturnNo);
    }, []);

    const handleAddProduct = () => {
        if (!productCode || !productName || !productPrice || !productQty) {
            alert('Please fill in all product details.');
            return;
        }

        const newProduct = {
            productCode,
            productName,
            productPrice: parseFloat(productPrice),
            productQty: parseInt(productQty),
            totalAmount: parseFloat(productPrice) * parseInt(productQty),
        };

        setProducts([...products, newProduct]);
        setTotalNetAmount((prevTotal) => prevTotal + newProduct.totalAmount);

        // Clear the input fields after adding the product
        setProductCode('');
        setProductName('');
        setProductPrice('');
        setProductQty('');
    };

    const handleSaveReturn = () => {
        if (!customerCode.trim() || !totalNetAmount || !returnNo.trim() || !returnDate.trim()) {
            Swal.fire('Missing Information', 'Please fill in all required fields.', 'warning');
            return;
        }

        const data = {
            returnNo,
            returnDate,
            customerCode: customerCode.trim(),
            routeCode,
            totalNetAmount,
            status: status.trim(),
            products, // Add the products list to the data
        };

        setLoading(true);
        axios
            .post('http://localhost:5555/api/returns', data)
            .then(() => {
                setLoading(false);
                Swal.fire({
                    title: 'Success!',
                    text: 'Return saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK',
                }).then(() => {
                    navigate('/');
                });
            })
            .catch((error) => {
                setLoading(false);
                console.error('Error Response:', error.response ? error.response.data : error.message);
                Swal.fire('Error', 'An error occurred. Please check the console for details.', 'error');
            });
    };

    return (
        <div className='p-8 bg-[#F4F4FC] h-screen'>
            <BackButton />
            <h1 className='text-4xl font-semibold mb-6 text-[#092142] text-center'>Create Return</h1>
            {loading && <Spinner />}
            <div className='flex flex-col border-2 border-[#10538A] shadow-lg rounded-xl w-[750px] p-6 mx-auto bg-white'>
                {/* Form Inputs */}
                <div className='mb-4'>
                    <label className='text-xl text-gray-700'>Return No</label>
                    <input
                        type='text'
                        value={returnNo}
                        readOnly
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full bg-gray-200 rounded-lg mt-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='text-xl text-gray-700'>Return Date</label>
                    <input
                        type='date'
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full rounded-lg mt-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='text-xl text-gray-700'>Customer Code</label>
                    <input
                        type='text'
                        value={customerCode}
                        onChange={(e) => setCustomerCode(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full rounded-lg mt-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='text-xl text-gray-700'>Route Code</label>
                    <input
                        type='text'
                        value={routeCode}
                        readOnly
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full bg-gray-200 rounded-lg mt-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='text-xl text-gray-700'>Total Net Amount</label>
                    <input
                        type='number'
                        min='0'
                        value={totalNetAmount}
                        readOnly
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full bg-gray-200 rounded-lg mt-2'
                    />
                </div>
                <div className='mb-4'>
                    <label className='text-xl text-gray-700'>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 w-full rounded-lg mt-2'
                        required
                    >
                        <option value="select">Select Status</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>

                {/* Product Input Section */}
                <div className='mb-4 grid grid-cols-3 gap-4'>
                    <input
                        type='text'
                        placeholder='Product Code'
                        value={productCode}
                        onChange={(e) => setProductCode(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 rounded-lg'
                    />
                    <input
                        type='text'
                        placeholder='Product Name'
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 rounded-lg'
                    />
                    <input
                        type='number'
                        placeholder='Price'
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 rounded-lg'
                    />
                    <input
                        type='number'
                        placeholder='Quantity'
                        value={productQty}
                        onChange={(e) => setProductQty(e.target.value)}
                        className='border-2 border-[#6B94B2] px-4 py-2 rounded-lg'
                    />
                    <button
                        onClick={handleAddProduct}
                        className='bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-400'
                    >
                        Add Product
                    </button>
                </div>

                {/* Products Table */}
                <table className='w-full text-left border-collapse'>
                    <thead>
                        <tr>
                            <th className='border-b p-2'>Product Code</th>
                            <th className='border-b p-2'>Product Name</th>
                            <th className='border-b p-2'>Price</th>
                            <th className='border-b p-2'>Quantity</th>
                            <th className='border-b p-2'>Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className='border-b p-2'>{product.productCode}</td>
                                <td className='border-b p-2'>{product.productName}</td>
                                <td className='border-b p-2'>${product.productPrice.toFixed(2)}</td>
                                <td className='border-b p-2'>{product.productQty}</td>
                                <td className='border-b p-2'>${product.totalAmount.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Save Button */}
                <button
                    onClick={handleSaveReturn}
                    className='bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 mt-6'
                >
                    Save Return
                </button>
            </div>
        </div>
    );
};

export default CreateReturn;
