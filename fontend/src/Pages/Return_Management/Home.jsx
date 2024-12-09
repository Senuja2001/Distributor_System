// Home.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../../Components/Return_Manager/Spinner'
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { Navbar } from '../../Components/Return_Manager/Navbar';
import SearchFilter from '../../Components/Return_Manager/Search';
import Footer from '../../Components/Return_Manager/Footer'; // Import the Footer component

const Home = () => {
    const [returns, setReturns] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useState({
        returnNo: '',
        returnDateFrom: '',
        returnDateTo: '',
        customerCode: '',
        routeCode: '',
        status: '',
    });

    useEffect(() => {
        fetchReturns();
    }, []);

    const fetchReturns = () => {
        setLoading(true);
        axios
            .get('http://localhost:5555/api/returns')
            .then((response) => {
                setReturns(response.data.data);
                console.log(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({ ...searchParams, [name]: value });
    };

    const handleSearch = () => {
        setLoading(true);

        const filteredParams = Object.keys(searchParams).reduce((acc, key) => {
            if (searchParams[key]) acc[key] = searchParams[key];
            return acc;
        }, {});

        axios
            .get('http://localhost:5555/api/returns', { params: filteredParams })
            .then((response) => {
                setReturns(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };

    const generatePDF = () => {
        const doc = new jsPDF();

        // Adding a title
        doc.setFontSize(20);
        doc.text("Returns Report", 20, 20);

        // Format dates
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString();
        };

        // Adding headers
        const headers = ["Return No", "Return Date", "Customer Code", "Route Code", "Total Net Amount", "Status"];
        doc.setFontSize(12);
        doc.autoTable({
            head: [headers],
            body: returns.map(returnItem => [
                returnItem.returnNo,
                formatDate(returnItem.returnDate),
                returnItem.customerCode,
                returnItem.routeCode,
                returnItem.totalNetAmount,
                returnItem.status
            ]),
            startY: 30,
            theme: 'striped', // Optional styling
            headStyles: { fillColor: [22, 160, 133] }, // Custom header styling
        });

        // Save the PDF
        doc.save("returns_report.pdf");
    };

    return (
        <div>
            <Navbar />
            <div className='p-4 bg-[#E3E4FA] min-h-screen'>
                <div className='flex justify-between items-center'>
                    <h1 className='text-3xl my-8 text-[#092142]'>|Return|</h1>
                </div>
                {/* Search Filter Component */}
                <SearchFilter
                    searchParams={searchParams}
                    handleInputChange={handleInputChange}
                    handleSearch={handleSearch}
                />
                {/* Buttons Section */}
                <div className="flex justify-end space-x-2 mt-4">
                    <Link to='/returns/create'>
                        <button
                            className="bg-[#10538A] text-white px-4 py-2 rounded-md hover:bg-[#0e3d61]"
                        >
                            Add Return
                        </button>
                    </Link>
                    <button
                        className="bg-[#1D4E89] text-white px-4 py-2 rounded-md hover:bg-[#163a64]"
                        onClick={generatePDF}
                    >
                        Print
                    </button>
                    <button className="bg-[#1D4E89] text-white px-4 py-2 rounded-md hover:bg-[#163a64]">
                        Cancel
                    </button>
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <table className='w-full border-separate border-spacing-2'>
                        <thead>
                            <tr className='bg-[#10538A] text-white'>
                                <th className='border border-slate-600 rounded-md'>Return No</th>
                                <th className='border border-slate-600 rounded-md'>Return Date</th>
                                <th className='border border-slate-600 rounded-md'>Customer Code</th>
                                <th className='border border-slate-600 rounded-md'>Route Code</th>
                                <th className='border border-slate-600 rounded-md'>Total Net Amount</th>
                                <th className='border border-slate-600 rounded-md'>Status</th>
                                <th className='border border-slate-600 rounded-md'>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {returns.length > 0 ? (
                                returns.map((returnItem) => (
                                    <tr key={returnItem._id} className='h-8'>
                                        <td className='border border-[#6B94B2] rounded-md text-center'>
                                            {returnItem.returnNo}
                                        </td>
                                        <td className='border border-[#6B94B2] rounded-md text-center'>
                                            {new Date(returnItem.returnDate).toLocaleDateString()}
                                        </td>
                                        <td className='border border-[#6B94B2] rounded-md text-center'>
                                            {returnItem.customerCode}
                                        </td>
                                        <td className='border border-[#6B94B2] rounded-md text-center'>
                                            {returnItem.routeCode}
                                        </td>
                                        <td className='border border-[#6B94B2] rounded-md text-center'>
                                            {returnItem.totalNetAmount}
                                        </td>
                                        <td className='border border-[#6B94B2] rounded-md text-center'>
                                            {returnItem.status}
                                        </td>
                                        <td className='border border-[#6B94B2] rounded-md text-center'>
                                            <div className='flex justify-center gap-x-4'>
                                                <Link to={`/returns/details/${returnItem._id}`}>
                                                    <BsInfoCircle className='text-2xl text-green-800' />
                                                </Link>
                                                <Link to={`/returns/edit/${returnItem._id}`}>
                                                    <AiOutlineEdit className='text-2xl text-yellow-600' />
                                                </Link>
                                                <Link to={`/returns/delete/${returnItem._id}`}>
                                                    <MdOutlineDelete className='text-2xl text-red-600' />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No return records found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer /> {/* Add Footer Component Here */}
        </div>
    );
};

export default Home;
