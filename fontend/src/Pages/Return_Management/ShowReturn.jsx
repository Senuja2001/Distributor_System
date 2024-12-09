import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../../Components/Return_Manager/BackButton';
import Spinner from '../../Components/Return_Manager/Spinner';

const ShowReturn = () => {
    const [returnItem, setReturnItem] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5555/api/returns/${id}`)
            .then((response) => {
                setReturnItem(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError('Failed to fetch return data. Please try again later.');
                setLoading(false);
            });
    }, [id]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString(); // Format date as needed
    };

    return (
        <div className='p-4 bg-[#E3E4FA] min-h-screen'>
            <BackButton />
            <h1 className='text-3xl my-4 text-[#092142]'>Show Return</h1>
            {loading ? (
                <Spinner />
            ) : (
                <div className='flex flex-col border-2 border-[#10538A] rounded-xl w-fit p-4'>
                    {error && <p className='text-red-500'>{error}</p>}
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Return No</span>
                        <span>{returnItem?.returnNo}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Return Date</span>
                        <span>{formatDate(returnItem?.returnDate)}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Customer Code</span>
                        <span>{returnItem?.customerCode}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Route Code</span>
                        <span>{returnItem?.routeCode}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Total Net Amount</span>
                        <span>{returnItem?.totalNetAmount}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Status</span>
                        <span>{returnItem?.status}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Create Time</span>
                        <span>{formatDate(returnItem?.createdAt)}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-xl mr-4 text-[#6B94B2]'>Last Updated Time</span>
                        <span>{formatDate(returnItem?.updatedAt)}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowReturn;
