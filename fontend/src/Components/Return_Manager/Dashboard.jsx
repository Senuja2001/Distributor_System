import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from './Spinner'; // Ensure you have this component for loading state
import BackButton from './BackButton'; // Import your BackButton component if needed
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Navbar } from './Navbar';

const Dashboard = () => {
    const [totalNetAmount, setTotalNetAmount] = useState(0);
    const [totalReturns, setTotalReturns] = useState(0); // State for total return notes
    const [acceptedReturns, setAcceptedReturns] = useState(0); // State for accepted return notes
    const [pendingReturns, setPendingReturns] = useState(0); // State for pending return notes
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReturns = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5555/api/returns'); // Adjust endpoint if necessary
                const returns = response.data.data; // Adjust this based on your API response structure


                // Calculate total net amount
                const total = returns.reduce((acc, curr) => acc + curr.totalNetAmount, 0);
                setTotalNetAmount(total);

                // Set total returns
                setTotalReturns(returns.length);

                // Count accepted and pending return notes
                const acceptedCount = returns.filter(returnItem => returnItem.status === 'Accepted').length;
                const pendingCount = returns.filter(returnItem => returnItem.status === 'Pending').length;

                setAcceptedReturns(acceptedCount);
                setPendingReturns(pendingCount);

            } catch (error) {
                console.error('Error fetching return records:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReturns();
    }, []);

    // Data for the bar chart
    const chartData = [
        { name: 'Total Returns', value: totalReturns },
        { name: 'Accepted Returns', value: acceptedReturns },
        { name: 'Pending Returns', value: pendingReturns },
    ];

    return (
        <div>
            <Navbar/>
            <div className='p-4 bg-[#E3E4FA] min-h-screen'>
            <BackButton />
            
            <label htmlFor='dashboard' className='text-3xl my-4 text-[#092142]'>Dashboard</label> {/* Changed h1 to label */}
            {loading ? (
                <Spinner />
            ) : (
                <div className='border-2 border-[#10538A] rounded-xl p-4'>
                    <h2 className='text-xl text-[#6B94B2]'>Total Net Amount of All Returns</h2>
                    <p className='text-2xl font-bold'>{totalNetAmount.toFixed(2)} LKR</p> {/* Adjust currency as needed */}
                    
                    <h2 className='text-xl text-[#6B94B2] mt-4'>Return Notes Statistics</h2>
                    
                    {/* Bar Chart */}
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#10538A" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            )}
        </div>
        </div>
    );
};

export default Dashboard;
