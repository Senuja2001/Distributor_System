import React, { useState, useEffect } from 'react';
import BackButton from '../../Components/Return_Manager/BackButton';
import Spinner from '../../Components/Return_Manager/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const DeleteReturn = () => {
    const [returnProduct, setReturnProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        setLoading(true);
        // Fetch the return product details before deletion
        axios.get(`http://localhost:5555/api/returns/${id}`)
            .then((response) => {
                setReturnProduct(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console.');
                console.log(error);
            });
    }, [id]);

    const handleDeleteReturn = () => {
        setLoading(true);
        axios.delete(`http://localhost:5555/api/returns/${id}`)
            .then(() => {
                setLoading(false);
                navigate('/'); // Redirect after successful deletion
            })
            .catch((error) => {
                setLoading(false);
                alert('An error happened. Please check console.');
                console.log(error);
            });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Delete Return</h1>
            {loading ? <Spinner /> : ''}
            {returnProduct && (
                <div className='flex flex-col border-2 border-red-400 rounded-xl w-[600px] p-8 mx-auto'>
                    <h3 className='text-xl text-gray-600'>Are you sure you want to delete this return?</h3>
                    <div className='my-4'>
                        <span className='text-lg text-gray-500'>Customer Code: {returnProduct.customerCode}</span>
                    </div>
                    <div className='my-4'>
                        <span className='text-lg text-gray-500'>Total Net Amount: {returnProduct.totalNetAmount}</span>
                    </div>
                    <button className='p-2 bg-red-500 text-white m-8' onClick={handleDeleteReturn}>
                        Yes, Delete it
                    </button>
                </div>
            )}
        </div>
    );
};

export default DeleteReturn;
