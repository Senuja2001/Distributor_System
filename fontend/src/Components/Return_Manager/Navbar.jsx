import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString(); // e.g., "10/9/2024, 11:55:02 AM"
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  return (
    <div>
      {/* Header Section */}
      <header className="bg-blue-900 text-white p-4 flex justify-between">
        <h1 className="text-2xl font-bold">Distributor Management System</h1>
        <div className="text-sm">
          <p>Welcome W A A U WIJESING...</p>
          <p>Last Login 24/09/2024 21:37:54</p>
          <p>Current Time: {currentDateTime}</p>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-blue-800 text-white py-2">
        <ul className="flex justify-around relative">
          
          {/* Dashboard Dropdown */}
          <li
            onClick={() => toggleDropdown('dashboard')}
            className='relative cursor-pointer'
          >
            Dashboard
            {openDropdown === 'dashboard' && (
              <ul className="absolute bg-blue-700 text-white  mt-1 rounded shadow-lg z-50">
                <Link to={'/dashboard'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Return</li>
                </Link>
                <Link to={'/orderdashboard'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Orders</li>
                </Link>
              </ul>
            )}
          </li>

          {/* Customer Dropdown */}
          <li
            onClick={() => toggleDropdown('customer')}
            className='relative cursor-pointer'
          >
            Customer
            {openDropdown === 'customer' && (
              <ul className="absolute bg-blue-700 text-white mt-1 rounded shadow-lg z-50">
                <Link to={'/customerlist'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Customer List</li>
                </Link>
                <Link to={'/add-customer'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Add customer</li>
                </Link>
                <Link to={'/reports'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Reports</li>
                </Link>
              </ul>
            )}
          </li>

         
            <li 

            onClick={()=>toggleDropdown('promotion')}
            className="cursor-pointer">Promotion
            
            {openDropdown === 'promotion' && (

                <ul className="absolute bg-blue-700 text-white mt-1 rounded shadow-lg z-50">
                <Link to={'/allpromotion'}>
                  <li className="px-4 py-2 hover:bg-blue-600">All Promotion</li>
                </Link>
                <Link to={'/addPromotion'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Add Promotion</li>
                </Link>
                
                </ul>
              
            )}
            </li>


          {/* Sales Dropdown */}
          <li
            onClick={() => toggleDropdown('sales')}
            className="relative cursor-pointer"
          >
            Sales
            {openDropdown === 'sales' && (
              <ul className="absolute bg-blue-700 text-white mt-1 rounded shadow-lg z-50">
                <Link to={'/addSale'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Add Sale</li>
                </Link>
                <Link to={'/dash'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Dashboard</li>
                </Link>
               
              </ul>
            )}
          </li>

          {/* Inventory Dropdown */}
          <li
            onClick={() => toggleDropdown('inventory')}
            className="relative cursor-pointer"
          >
            Inventory
            {openDropdown === 'inventory' && (
              <ul className="absolute bg-blue-700 text-white mt-1 rounded shadow-lg z-50">
                <Link to={'/inventory'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Inventory List</li>
                </Link>
                <Link to={'/stock'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Re Stock</li>
                </Link>
                <Link to={'/report'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Report</li>
                </Link>
                <Link to={'/add-item'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Add Items</li>
                </Link>

                <Link to={'/inventorydashboard'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Dashboard</li>
                </Link>
              </ul>
            )}
          </li>
            <li 
            onClick={() => toggleDropdown('return')}
            className="cursor-pointer">Return
            
              {openDropdown === 'return' && (
                <ul className="absolute bg-blue-700 text-white mt-1 rounded shadow-lg z-50">
                  <Link to={'/returns/create'}>
                    <li className="px-4 py-2 hover:bg-blue-600">Create Return</li>
                  </Link>
                  <Link to={'/'}>
                    <li className="px-4 py-2 hover:bg-blue-600">Show Return</li>
                  </Link>
                </ul>
              )
              }
            </li>
          

          {/* Complaint Dropdown */}
          <li
            onClick={() => toggleDropdown('complaint')}
            className='relative cursor-pointer'
          >
            Complain
            {openDropdown === 'complaint' && (
              <ul className="absolute bg-blue-700 text-white mt-1 rounded shadow-lg z-50">
                <Link to={'/complaintlist'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Complaint List</li>
                </Link>
                <Link to={'/form'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Create Complaint</li>
                </Link>
                <Link to={'/Tracking'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Tracking</li>
                </Link>
              </ul>
            )}
          </li>

          {/* Delivery Dropdown */}
          <li
            onClick={() => toggleDropdown('delivery')}
            className='relative cursor-pointer'
          >
            Delivery
            {openDropdown === 'delivery' && (
              <ul className="absolute bg-blue-700 text-white mt-1 rounded shadow-lg z-50">
                <Link to={'/deliverymanagerdashboard'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Dashboard</li>
                </Link>
                <Link to={'/add'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Add Delivery Person</li>
                </Link>
                <Link to={'/delivery'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Delivery Details</li>
                </Link>
                <Link to={'/user'}>
                  <li className="px-4 py-2 hover:bg-blue-600">User</li>
                </Link>
                <Link to={'/com'}>
                  <li className="px-4 py-2 hover:bg-blue-600">Customer Communication</li>
                </Link>
              </ul>
            )}
          </li>

          <Link to={'/orders'}>
            <li className="cursor-pointer">Order</li>
          </Link>

        </ul>
      </nav>
    </div>
  );
};
