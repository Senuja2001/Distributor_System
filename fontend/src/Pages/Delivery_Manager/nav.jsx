import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  // State to toggle the Delivery dropdown visibility
  const [showDropdown, setShowDropdown] = useState(false);

  // Function to handle dropdown toggle
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      {/* Header Section */}
      <header className="bg-blue-900 text-white p-4 flex justify-between">
        <h1 className="text-xl">Distribution Management System</h1>
        <div className="text-sm">
          <p>Welcome Kojitha Gunathilake...</p>
          <p>Last Login 16/07/2024 21:37:54</p>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-blue-800 text-white py-2">
        <ul className="flex justify-around">
          <li>Dashboard</li>
          <li>Customer</li>
          <li>Promotion</li>
          <li><Link to="/orders">Order</Link></li>
          <li>Inventory</li>
          <li>Sales</li>
          <li>Return</li>
                    {/* Delivery with Dropdown */}
                    <li className="relative">
            <button onClick={toggleDropdown} className="focus:outline-none">
              Delivery
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <ul className="absolute bg-blue-900 mt-2 p-2 rounded shadow-lg">
                <li className="py-1">
                  <Link to="/" className="block text-white hover:bg-blue-700 rounded px-2">
                   Dashboard
                  </Link>
                </li>
                <li className="py-1">
                  <Link to="/user" className="block text-white hover:bg-blue-700 rounded px-2">
                    Delivery Personnel
                  </Link>
                </li>
                <li className="py-1">
                  <Link to="/delivery" className="block text-white hover:bg-blue-700 rounded px-2">
                   Delivery Details
                  </Link>
                </li>
                <li className="py-1">
                  <Link to="/com" className="block text-white hover:bg-blue-700 rounded px-2">
                    Customer Communication
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>Complain</li>
          

        </ul>
      </nav>
    </div>
  );
};
