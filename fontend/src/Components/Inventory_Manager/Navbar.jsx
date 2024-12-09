import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showInventoryDropdown, setShowInventoryDropdown] = useState(false); // State for inventory dropdown

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleInventoryDropdown = () => {
    setShowInventoryDropdown(!showInventoryDropdown);
  };

  return (
    <nav className="navbar-custom bg-[#115288] text-white py-2">
      <ul className="flex justify-around items-center">
        <li><Link to="/dashboard" className="nav-link text-white">Dashboard</Link></li>
        <li><Link to="/customers" className="nav-link text-white">Customer</Link></li>
        <li><Link to="/promotion" className="nav-link text-white">Promotion</Link></li>
        <li><Link to="/orders" className="nav-link text-white">Order</Link></li>

        {/* Inventory with Dropdown */}
        <li className="relative">
          <button onClick={toggleInventoryDropdown} className="focus:outline-none text-white">
            Inventory
          </button>

          {/* Inventory Dropdown Menu */}
          {showInventoryDropdown && (
            <ul className="absolute bg-[#115288] mt-2 p-2 rounded shadow-lg flex flex-col whitespace-nowrap"> {/* Prevent line breaks */}
              <li>
                <Link to="/" className="block text-white hover:bg-[#092143] rounded px-2">
                  View Inventory
                </Link>
              </li>
              <li>
                <Link to="/add-item" className="block text-white hover:bg-[#092143] rounded px-2">
                  Add Item
                </Link>
              </li>
              <li>
                <Link to="/report" className="block text-white hover:bg-[#092143] rounded px-2">
                  Report
                </Link>
              </li>
              <li>
                <Link to="/stock" className="block text-white hover:bg-[#092143] rounded px-2">
                  Restock
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li><Link to="/sales" className="nav-link text-white">Sales</Link></li>
        <li><Link to="/returns" className="nav-link text-white">Return</Link></li>

        {/* Delivery with Dropdown */}
        <li className="relative">
          <button onClick={toggleDropdown} className="focus:outline-none text-white">
            Delivery
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <ul className="absolute bg-[#115288] mt-2 p-2 rounded shadow-lg flex flex-col whitespace-nowrap">
              <li>
                <Link to="/delivery-personnel" className="block text-white hover:bg-[#092143] rounded px-2">
                  Delivery Personnel
                </Link>
              </li>
              <li>
                <Link to="/summary-report" className="block text-white hover:bg-[#092143] rounded px-2">
                  Summary Report
                </Link>
              </li>
            </ul>
          )}
        </li>

        <li><Link to="/complain" className="nav-link text-white">Complain</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
