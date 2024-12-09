import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Rectangle } from 'recharts';
import { Navbar } from '../../Components/Return_Manager/Navbar';
import axios from 'axios';
import Footer from './Footer';

export const Order_Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [processedOrders, setProcessedOrders] = useState([]);
    const [confirm, setConfirm] = useState(0); // Initialize as 0 instead of null

    useEffect(() => {
        axios.get('http://localhost:5555/order')
            .then((res) => {
                console.log('API response:', res.data.data); // Debugging: Log the API response
                setOrders(res.data.data);

                // Create a new array to store processed orders
                const tempProcessedOrders = [];
                let tempConfirm = 0; // Initialize tempConfirm as 0

                // Process the API response data
                res.data.data.forEach(order => {
                    const existingProduct = tempProcessedOrders.find(p => p.product_name.trim().toLowerCase() === order.product_name.trim().toLowerCase());

                    if (order.status === 'Confirm') {
                        tempConfirm += 1;
                    }

                    if (existingProduct) {
                        // If product exists, sum the quantity
                        existingProduct.quantity += order.quantity;
                    } else {
                        // If product does not exist, add a new object to the array
                        tempProcessedOrders.push({
                            product_name: order.product_name.trim(), // Trim spaces from product name
                            quantity: order.quantity
                        });
                    }
                });

                // Update the state with the processed orders and confirmed orders count
                setProcessedOrders(tempProcessedOrders);
                setConfirm(tempConfirm); // Update the confirm state
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                alert('Failed to fetch orders.');
            });
    }, []); // Dependency array to ensure effect only runs once

    console.log("Processed Orders:", processedOrders); // Debugging: Log the processed orders

    const totalOfOrders = orders.length;

    return (
        <div className='items-center'>
            <Navbar />

            <div className='cards flex flex-row w-full justify-center mt-10 gap-x-10'>
                <div className='bg-yellow-500 w-48 py-2 text-center rounded-md'>
                    <h1 className='text-xl'>Orders</h1>
                    <p className='text-3xl'>{totalOfOrders}</p>
                </div>

                <div className='bg-yellow-500 w-48 py-2 text-center rounded-md'>
                    <h1 className='text-xl'>Confirm Orders</h1>
                    <p className='text-3xl'>{confirm}</p>
                </div>

                <div className='bg-yellow-500 w-48 py-2 text-center rounded-md'>
                    <h1 className='text-xl'>Pending Orders</h1>
                    <p className='text-3xl'>{totalOfOrders - confirm}</p> {/* Assuming pending orders are total - confirmed */}
                </div>

                <div className='bg-yellow-500 w-48 py-2 text-center rounded-md'>
                    <h1 className='text-xl'>Total Quantity</h1>
                    <p className='text-3xl'>{processedOrders.reduce((sum, order) => sum + order.quantity, 0)}</p> {/* Sum of all quantities */}
                </div>
            </div>

            <div className='w-4/12  h-96 mx-auto mt-10'>
            <div className='flex flex-row text-2xl font-semibold justify-center mb-2  mt-20'><h1>Product Name & Quantities</h1></div>
                <ResponsiveContainer>
                    <BarChart
                        data={processedOrders} // Use processedOrders for chart data
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="product_name" /> {/* Ensure this matches the property name */}
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                            dataKey="quantity"
                            fill="#835dc5"
                            shape={<Rectangle fill="#835dc5" stroke="blue" />}
                        />
                    </BarChart>
                </ResponsiveContainer>
                <div className='mb-10'></div>
            </div>
            <Footer/>
        </div>
    );
};
