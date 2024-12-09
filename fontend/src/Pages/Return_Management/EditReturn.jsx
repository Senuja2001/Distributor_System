import React, { useState, useEffect } from 'react';
import BackButton from '../../Components/Return_Manager/BackButton';
import Spinner from '../../Components/Return_Manager/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

const EditReturn = () => {
    const [customerCode, setCustomerCode] = useState('');
    const [routeCode, setRouteCode] = useState('184R01');
    const [totalNetAmount, setTotalNetAmount] = useState(0);
    const [status, setStatus] = useState('');
    const [returnNo, setReturnNo] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [productDetails, setProductDetails] = useState([]);
    const [productCode, setProductCode] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/api/returns/${id}`)
            .then((response) => {
                const data = response.data;
                setReturnNo(data.returnNo);
                setReturnDate(data.returnDate);
                setCustomerCode(data.customerCode);
                setTotalNetAmount(data.totalNetAmount);
                setStatus(data.status);
                setProductDetails(data.products || []);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred. Please check the console.',
                });
                console.log(error);
            });
    }, [id]);

    // Handle adding product details
    const handleAddProduct = () => {
        if (!productCode || !productName || !price || !quantity) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill in all product fields.',
            });
            return;
        }

        const newProduct = {
            productCode,
            productName,
            price: parseFloat(price),
            quantity: parseInt(quantity),
        };

        const updatedProductDetails = [...productDetails, newProduct];
        setProductDetails(updatedProductDetails);

        // Update the total amount
        const newTotal = updatedProductDetails.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        setTotalNetAmount(newTotal);

        // Reset input fields
        setProductCode('');
        setProductName('');
        setPrice('');
        setQuantity('');

        Swal.fire({
            icon: 'success',
            title: 'Product Added',
            text: 'The product has been added to the list.',
        });
    };

    const handleUpdateReturn = () => {
        if (!returnNo.trim() || !returnDate.trim() || !customerCode.trim() || !productDetails.length) {
            Swal.fire({
                icon: 'warning',
                title: 'Missing Fields',
                text: 'Please fill in all required fields.',
            });
            return;
        }

        const data = {
            returnNo,
            returnDate,
            customerCode,
            routeCode,
            totalNetAmount,
            status,
            products: productDetails,
        };

        setLoading(true);
        axios.put(`http://localhost:5555/api/returns/${id}`, data)
            .then(() => {
                setLoading(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Return Updated',
                    text: 'The return has been successfully updated!',
                }).then(() => {
                    navigate('/');
                });
            })
            .catch((error) => {
                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'An error occurred while updating the return. Please check the console.',
                });
                console.log('Error Response:', error.response.data);
            });
    };

    return (
        <div className='p-4 bg-[#E3E4FA]'>
            <BackButton />
            <h1 className='text-3xl my-4 text-[#092142]'>Edit Return</h1>
            {loading && <Spinner />}
            <div className='flex flex-col border-2 border-[#10538A] rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Return No</label>
                    <input
                        readOnly
                        type='text'
                        value={returnNo}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Return Date</label>
                    <input
                        type='date'
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Customer Code</label>
                    <input
                        readOnly
                        type='text'
                        value={customerCode}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Route Code</label>
                    <input
                        readOnly
                        type='text'
                        value={routeCode}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>
                
                {/* Product Details Section */}
                <div className='my-4'>
                    <h3 className='text-xl text-gray-500'>Product Details</h3>
                    <div className='flex gap-4'>
                        <input
                            type='text'
                            placeholder='Product Code'
                            value={productCode}
                            onChange={(e) => setProductCode(e.target.value)}
                            className='border-2 border-gray-500 px-2 py-1 w-full' />
                        <input
                            type='text'
                            placeholder='Product Name'
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            className='border-2 border-gray-500 px-2 py-1 w-full' />
                    </div>
                    <div className='flex gap-4 my-2'>
                        <input
                            type='text'
                            placeholder='Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className='border-2 border-gray-500 px-2 py-1 w-full' />
                        <input
                            type='text'
                            placeholder='Quantity'
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className='border-2 border-gray-500 px-2 py-1 w-full' />
                    </div>
                    <button className='p-2 bg-[#10538A] text-white rounded' onClick={handleAddProduct}>
                        Add Product
                    </button>
                </div>

                {/* Products Table */}
                {productDetails.length > 0 && (
                    <table className='table-auto border-collapse border border-gray-500 mt-4'>
                        <thead>
                            <tr>
                                <th className='border border-gray-500 px-4 py-2'>Product Code</th>
                                <th className='border border-gray-500 px-4 py-2'>Product Name</th>
                                <th className='border border-gray-500 px-4 py-2'>Price</th>
                                <th className='border border-gray-500 px-4 py-2'>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productDetails.map((product, index) => (
                                <tr key={index}>
                                    <td className='border border-gray-500 px-4 py-2'>{product.productCode}</td>
                                    <td className='border border-gray-500 px-4 py-2'>{product.productName}</td>
                                    <td className='border border-gray-500 px-4 py-2'>{product.price}</td>
                                    <td className='border border-gray-500 px-4 py-2'>{product.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Total Net Amount</label>
                    <input
                        readOnly
                        type='text'
                        value={totalNetAmount}
                        className='border-2 border-gray-500 px-4 py-2 w-full' />
                </div>

                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'>
                        <option value='pending'>Pending</option>
                        <option value='completed'>Completed</option>
                    </select>
                </div>

                <button className='p-2 bg-[#10538A] text-white rounded' onClick={handleUpdateReturn}>
                    Update Return
                </button>
            </div>
        </div>
    );
};

export default EditReturn;
