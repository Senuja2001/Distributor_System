import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Components/Return_Manager/Navbar';

const Delivery_Dashboard = () => {
  const [deliveryPersons, setDeliveryPersons] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [deliveries, setDeliveries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch Delivery Person Details
    axios.get('http://localhost:5555/api/user/getall').then((response) => {
      setDeliveryPersons(response.data);
    }).catch((error) => {
      console.error('Error fetching delivery persons:', error);
    });

    // Fetch Customer Communication Details
    axios.get('http://localhost:5555/api/cust/getall').then((response) => {
      setCustomers(response.data);
    }).catch((error) => {
      console.error('Error fetching customer details:', error);
    });

    // Fetch Delivery Details
    axios.get('http://localhost:5555/api/deliv/getall').then((response) => {
      setDeliveries(response.data);
    }).catch((error) => {
      console.error('Error fetching deliveries:', error);
    });
  }, []);

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
  <div>
    <Navbar/>
      <div className="min-h-screen bg-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
        Delivery Management Dashboard
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Delivery Person Stats */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={() => handleNavigate('/user')}
        >
          <div className="flex items-center">
            <div className="text-4xl text-blue-500">🧑‍🤝‍🧑</div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">Delivery Personnel</h3>
              <p className="text-2xl font-bold text-blue-800">{deliveryPersons.length}</p>
            </div>
          </div>
        </div>

        {/* Customer Stats */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={() => handleNavigate('/com')}
        >
          <div className="flex items-center">
            <div className="text-4xl text-green-500">💬</div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">Customers Communicated</h3>
              <p className="text-2xl font-bold text-green-800">{customers.length}</p>
            </div>
          </div>
        </div>

        {/* Delivery Stats */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={() => handleNavigate('/delivery')}
        >
          <div className="flex items-center">
            <div className="text-4xl text-red-500">🚚</div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-800">Total Deliveries</h3>
              <p className="text-2xl font-bold text-red-800">{deliveries.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Personnel Table */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6 transition duration-500 ease-in-out transform hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Personnel Details</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">ID</th>
              <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Name</th>
              <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Contact</th>
            </tr>
          </thead>
          <tbody>
            {deliveryPersons.map((person, index) => (
              <tr key={person.id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="px-6 py-4 border-b text-gray-700">{person.empID}</td>
                <td className="px-6 py-4 border-b text-gray-700">{person.fname}</td>
                <td className="px-6 py-4 border-b text-gray-700">{person.contactNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customer Communication Table */}
      <div className="mb-8 bg-white rounded-lg shadow-lg p-6 transition duration-500 ease-in-out transform hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Communication Details</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-green-100">
              <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Customer</th>
              <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Route</th>
              <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Message</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust, index) => (
              <tr key={cust.customer} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="px-6 py-4 border-b text-gray-700">{cust.customer}</td>
                <td className="px-6 py-4 border-b text-gray-700">{cust.route}</td>
                <td className="px-6 py-4 border-b text-gray-700">{cust.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delivery Records Table */}
      <div className="bg-white rounded-lg shadow-lg p-6 transition duration-500 ease-in-out transform hover:scale-105">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Delivery Details</h2>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-red-100">
              <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">ID</th>
              <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Customer</th>
              <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Route</th>
              <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery, index) => (
              <tr key={delivery.deliveryId} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                <td className="px-6 py-4 border-b text-gray-700">{delivery.deliveryId}</td>
                <td className="px-6 py-4 border-b text-gray-700">{delivery.customer}</td>
                <td className="px-6 py-4 border-b text-gray-700">{delivery.route}</td>
                <td className="px-6 py-4 border-b text-gray-700">{delivery.deliveryStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
  );
};

export default Delivery_Dashboard;
