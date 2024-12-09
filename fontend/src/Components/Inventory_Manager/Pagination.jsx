import React from 'react';

function Pagination({ totalPages, currentPage, onPageChange }) {
    // Create an array of page numbers for rendering
    const pageNumbers = [...Array(totalPages).keys()].map(i => i + 1);

    return (
        <div className="flex justify-between items-center my-4">
            <nav>
                <ul className="flex space-x-2">
                    <li>
                        <button 
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400" 
                            onClick={() => onPageChange(1)} 
                            disabled={currentPage === 1}
                        >
                            &#171; First
                        </button>
                    </li>
                    <li>
                        <button 
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400" 
                            onClick={() => onPageChange(currentPage - 1)} 
                            disabled={currentPage === 1}
                        >
                            &#8249; Previous
                        </button>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number}>
                            <button 
                                className={`px-4 py-2 text-sm font-medium rounded hover:bg-blue-100 ${number === currentPage ? 'bg-blue-500 text-white' : 'text-gray-700'}`} 
                                onClick={() => onPageChange(number)}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                    <li>
                        <button 
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400" 
                            onClick={() => onPageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                        >
                            Next &#8250;
                        </button>
                    </li>
                    <li>
                        <button 
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 disabled:bg-gray-400" 
                            onClick={() => onPageChange(totalPages)} 
                            disabled={currentPage === totalPages}
                        >
                            Last &#187;
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Pagination;
