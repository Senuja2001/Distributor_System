import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div>
      {/* Header Section */}
      <header className="bg-blue-900 text-white p-4 flex justify-between">
        <h1 className="text-xl">Distribution Management System</h1>
        <div className="text-sm">
          <p>Welcome Selvakumar Sadurshan...</p>
          <p>Last Login 16/07/2024 21:37:54</p>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-blue-800 text-white py-2">
        <ul className="flex justify-around">
          <li>Dashboard</li>
          <li>Customer</li>
          <li>Promotion</li>
          <li><Link to="/orders">Order</Link></li> {/* Correct usage of Link */}
          <li>Inventory</li>
          <li>Sales</li>
          <li>Return</li>
          <li>Complain</li>
        </ul>
      </nav>
    </div>
  );
};
