import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Navbar } from '../../Components/Return_Manager/Navbar';
import Footer from './Footer';

export const Orders = () => {
  const [orders, setOrders] = useState([]); // State to hold the list of orders
  const [filteredOrders, setFilteredOrders] = useState([]); // State to hold the filtered orders
  const [searchText, setSearchText] = useState(''); // State for text input filter
  const [searchDate, setSearchDate] = useState(''); // State for date input filter

  const handleConfirm = (id) => {
    // Set the status to 'Confirm' and send the PUT request
    axios.put(`http://localhost:5555/order/${id}`, {
      status: 'Confirm',
    })
    .then(res => {
      console.log(res.data);
      alert('Order Confirmed');
      window.location.reload();
    })
    .catch(err => {
      console.log(err);
      alert('Failed to confirm order. Please try again.');
    });
  }

  useEffect(() => {
    axios.get('http://localhost:5555/order')
      .then((res) => {
        console.log('API response:', res.data.data); // Debugging: Log the API response
        setOrders(res.data.data); // Update the orders state with the API response
        setFilteredOrders(res.data.data); // Initialize filtered orders to all orders
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        alert('Failed to fetch orders.');
      });
  }, []); // Dependency array to ensure effect only runs once

  // Function to filter orders based on search criteria
  useEffect(() => {
    const filtered = orders.filter(order => {
      const orderDate = new Date(order.order_date).toISOString().slice(0, 10); // Format order date as yyyy-mm-dd

      return (
        (searchText === '' || 
          (order._id && order._id.toLowerCase().includes(searchText.toLowerCase())) || // Check if field exists before calling toLowerCase
          (order.company && order.company.toLowerCase().includes(searchText.toLowerCase())) ||
          (order.catagory_name && order.catagory_name.toLowerCase().includes(searchText.toLowerCase())) ||
          (order.catagory_code && order.catagory_code.toLowerCase().includes(searchText.toLowerCase())) ||
          (order.product_code && order.product_code.toLowerCase().includes(searchText.toLowerCase())) ||
          (order.status && order.status.toLowerCase().includes(searchText.toLowerCase())) ||
          (order.product_name && order.product_name.toLowerCase().includes(searchText.toLowerCase())) ||
          (order.warehouse && order.warehouse.toLowerCase().includes(searchText.toLowerCase()))
        ) &&
        (searchDate === '' || orderDate === searchDate)
      );
    });
    setFilteredOrders(filtered);
  }, [searchText, searchDate, orders]);

  const handleDelete = (id) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this order?');
  
    if (userConfirmed) {
      axios.delete(`http://localhost:5555/order/${id}`)
        .then((res) => {
          console.log('Order deleted:', res.data);
          alert('Order has been successfully deleted.');
          window.location.reload();
        })
        .catch(error => {
          console.error('Error deleting order:', error);
          alert('Failed to delete the order. Please try again.');
        });
    } else {
      console.log('Order deletion canceled by user.');
    }
  };

  // Function to generate PDF of orders table
  const generatePDF = () => {
    const doc = new jsPDF();

    // Define the table column headers
    const tableColumn = ["Order No", "Category Code", "Category Name", "Company", "Product Code", "Product Name", "Quantity", "Warehouse", "Order Date"];
    
    // Define the table rows
    const tableRows = [];

    filteredOrders.forEach(order => {
      const orderData = [
        order._id,
        order.product_catagory_code,
        order.product_catagory_name,
        order.company,
        order.product_code,
        order.product_name,
        order.quantity,
        order.warehouse,
        new Date(order.order_date).toLocaleDateString(),
      ];
      tableRows.push(orderData);
    });

    // Add the table to the PDF
    doc.autoTable(tableColumn, tableRows, { startY: 20 });

    // Save the PDF
    doc.save("orders.pdf");
  };

  return (
    <div>
      <Navbar/>
      <div className="bg-white p-6 rounded shadow-md">
      <fieldset className='border border-gray-300 p-2 m-2'>
        <legend className="font-bold">Search Orders</legend>
        {/* Text input for filtering multiple fields */}
        <input
          className='border border-gray-300 p-2 m-2'
          placeholder="Search..."
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        {/* Date input for filtering by order date */}
        <input
          className='border border-gray-300 p-2 m-2'
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
        <div className='float-right'>
          <Link to={`/createorder`}>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Add Order</button>
          </Link>
        </div>
      </fieldset>
      <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-4 rounded mb-2' onClick={generatePDF}>Download PDF</button>
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Order No</th>
            <th className="border border-gray-300 p-2">Category Code</th>
            <th className="border border-gray-300 p-2">Category Name</th>
            <th className="border border-gray-300 p-2">Company</th>
            <th className="border border-gray-300 p-2">Product Code</th>
            <th className="border border-gray-300 p-2">Product Name</th>
            <th className="border border-gray-300 p-2">Quantity</th>
            <th className="border border-gray-300 p-2">Warehouse</th>
            <th className="border border-gray-300 p-2">Order Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map((order, i) => (
            <tr key={i}>
              <td className="border border-gray-300 p-2">{order._id}</td>
              <td className="border border-gray-300 p-2">{order.catagory_code}</td>
              <td className="border border-gray-300 p-2">{order.catagory_name}</td>
              <td className="border border-gray-300 p-2">{order.company}</td>
              <td className="border border-gray-300 p-2">{order.product_code}</td>
              <td className="border border-gray-300 p-2">{order.product_name}</td>
              <td className="border border-gray-300 p-2">{order.quantity}</td>
              <td className="border border-gray-300 p-2">{order.warehouse}</td>
              <td className="border border-gray-300 p-2">{new Date(order.order_date).toLocaleDateString()}</td>
              <td className={`border border-gray-300 p-2 ${order.status === 'Pending' ? 'text-red-500' : order.status === 'Confirm' ? 'text-green-500' : ''}`}>{order.status}</td>
              <td className='flex flex-row gap-x-2 justify-center items-center'>
                <Link to={`/updateorder/${order._id}`}>
                  <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold text-sm px-4 rounded'>Edit</button>
                </Link>
                <button onClick={() => handleConfirm(order._id)} className='bg-green-900 hover:bg-red-900 text-white font-bold text-sm px-4 rounded'>Confirm</button>
                <button onClick={() => handleDelete(order._id)} className='bg-red-500 hover:bg-red-900 text-white font-bold text-sm px-4 rounded'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Footer/>
    </div>
  );
};
