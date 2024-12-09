import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-100">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link className="text-xl font-bold" to="/">
          Distributor Management
        </Link>
        <button
          className="text-gray-600 md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            ></path>
          </svg>
        </button>
        <div
          className={`md:flex md:items-center md:space-x-4 ${
            isOpen ? 'block' : 'hidden'
          }`}
        >
          <Link className="text-gray-700 hover:text-blue-600" to="/">
            Home
          </Link>
          <Link className="text-gray-700 hover:text-blue-600" to="/dashboard">
            Dashboard
          </Link>
          <Link className="text-gray-700 hover:text-blue-600" to="/customers">
            Customer
          </Link>

          {/* Order Dropdown */}
          <div className="relative">
            <button className="text-gray-700 hover:text-blue-600">
              Order
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg">
              <Link
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                to="/orders/principal"
              >
                Order to Principal
              </Link>
            </div>
          </div>

          {/* Inventory Dropdown */}
          <div className="relative">
            <button className="text-gray-700 hover:text-blue-600">
              Inventory
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg">
              <Link
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                to="/inventory/summary"
              >
                Inventory Summary
              </Link>
              <Link
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                to="/inventory/report"
              >
                Stock Receipt
              </Link>
              <Link
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                to="/inventory/add"
              >
                Stock Adjustment
              </Link>
            </div>
          </div>

          {/* Sales Dropdown */}
          <div className="relative">
            <button className="text-gray-700 hover:text-blue-600">Sales</button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg">
              <Link
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                to="/sales/new"
              >
                New Order
              </Link>
              <Link
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                to="/sales/invoice"
              >
                Invoice
              </Link>
              <Link
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                to="/sales/picklist"
              >
                Picklist
              </Link>
            </div>
          </div>

          {/* Return Dropdown */}
          <div className="relative">
            <button className="text-gray-700 hover:text-blue-600">
              Return
            </button>
            <div className="absolute hidden group-hover:block bg-white shadow-lg rounded-lg">
              <Link
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                to="/returns/create"
              >
                Add Return
              </Link>
              <Link
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                to="/returns/credit"
              >
                Credit Note
              </Link>
              <Link
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                to="/returns/manage"
              >
                Manage Returns
              </Link>
            </div>
          </div>

          <Link className="text-gray-700 hover:text-blue-600" to="/promotion">
            Promotion
          </Link>
          <Link className="text-gray-700 hover:text-blue-600" to="/complain">
            Complain
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
