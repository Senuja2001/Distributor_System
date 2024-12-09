import React from 'react';

const SearchFilter = ({ searchParams, handleInputChange, handleSearch }) => {
    return (
        <div className="bg-white shadow-md p-6 rounded-md mb-6 relative">
            {/* Search Filter Section */}
            <div className="grid grid-cols-2 gap-4">
                {/* Return Date From */}
                <div className="flex items-center">
                    <label className="w-1/3 text-sm text-gray-700">Return Date From:</label>
                    <input
                        type="date"
                        name="returnDateFrom"
                        value={searchParams.returnDateFrom}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Return No */}
                <div className="flex items-center">
                    <label className="w-1/3 text-sm text-gray-700">Return No:</label>
                    <input
                        type="text"
                        name="returnNo"
                        value={searchParams.returnNo}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter return number"
                    />
                </div>

                {/* Return Date To */}
                <div className="flex items-center">
                    <label className="w-1/3 text-sm text-gray-700">Return Date To:</label>
                    <input
                        type="date"
                        name="returnDateTo"
                        value={searchParams.returnDateTo}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    />
                </div>

                {/* Route */}
                <div className="flex items-center">
                    <label className="w-1/3 text-sm text-gray-700">Route:</label>
                    <select
                        name="routeCode"
                        value={searchParams.routeCode}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value="">Select Route</option>
                        <option value="184R01">184R01</option>
                    </select>
                </div>

                {/* Customer Code */}
                <div className="flex items-center">
                    <label className="w-1/3 text-sm text-gray-700">Customer Code:</label>
                    <input
                        type="text"
                        name="customerCode"
                        value={searchParams.customerCode}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        placeholder="Enter customer code"
                    />
                </div>

                {/* Status */}
                <div className="flex items-center">
                    <label className="w-1/3 text-sm text-gray-700">Status:</label>
                    <select
                        name="status"
                        value={searchParams.status}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                        <option value=""></option>
                        <option value="Approved">Approved</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Search Button Positioned on Right Side */}
            <div className="flex justify-end mt-4">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;
