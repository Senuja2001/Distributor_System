// DeliveryForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrashAlt } from 'react-icons/fa'; // Import icon
import { Navbar } from '../../Components/Return_Manager/Navbar';

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    deliveryId: '',
    deliveryDate: '',
    customer: '',
    route: '',
    expectedDeliveryTime: '',
    actualDeliveryTime: '',
    deliveryStatus: '',
  });

  const [deliveryRecords, setDeliveryRecords] = useState([]);
  const [deliveryStats, setDeliveryStats] = useState({
    totalRecords: 0,
    onTimeDeliveries: 0,
    lateDeliveries: 0,
    earlyDeliveries: 0,
  });

  // Generate delivery ID automatically
  const generateDeliveryId = () => {
    const newId = 'D' + Math.floor(10000 + Math.random() * 90000);
    return newId;
  };

  // Fetch delivery records from backend
  const fetchDeliveryRecords = async () => {
    try {
      const response = await axios.get('http://localhost:5555/api/deliv/getall');
      if (response.status === 200) {
        setDeliveryRecords(response.data);
        calculateStats(response.data);
      }
    } catch (error) {
      console.error('Error fetching delivery records:', error);
      Swal.fire('Error', 'Failed to fetch delivery records.', 'error');
    }
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      deliveryId: generateDeliveryId(),
    }));
    fetchDeliveryRecords(); // Fetch records when component mounts
  }, []);

  // Calculate delivery stats
  const calculateStats = (records) => {
    let onTime = 0, late = 0, early = 0;
    records.forEach((record) => {
      const expectedTime = new Date(`1970-01-01T${record.expectedDeliveryTime}:00`);
      const actualTime = new Date(`1970-01-01T${record.actualDeliveryTime}:00`);

      if (actualTime > expectedTime) {
        late++;
      } else if (actualTime < expectedTime) {
        early++;
      } else {
        onTime++;
      }
    });

    setDeliveryStats({
      totalRecords: records.length,
      onTimeDeliveries: onTime,
      lateDeliveries: late,
      earlyDeliveries: early,
    });
  };

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5555/api/deliv/create', formData);

      if (response.status === 200) {
        Swal.fire('Success', 'Delivery record added successfully!', 'success');
        fetchDeliveryRecords(); // Refetch records after adding a new one
        setFormData({
          deliveryId: generateDeliveryId(),
          deliveryDate: '',
          customer: '',
          route: '',
          expectedDeliveryTime: '',
          actualDeliveryTime: '',
          deliveryStatus: '',
        });
      }
    } catch (error) {
      Swal.fire('Error', 'Failed to add delivery record. Please try again.', 'error');
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setFormData({
      deliveryId: generateDeliveryId(),
      deliveryDate: '',
      customer: '',
      route: '',
      expectedDeliveryTime: '',
      actualDeliveryTime: '',
      deliveryStatus: '',
    });
  };

  // Handle delete operation using the MongoDB _id
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5555/api/deliv/delete/${id}`);
          Swal.fire('Deleted!', 'The delivery record has been deleted.', 'success');
          fetchDeliveryRecords(); // Refresh records after deletion
        } catch (error) {
          Swal.fire('Error', 'Failed to delete the record.', 'error');
        }
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
   <div>
    <Navbar/>
     <div className="min-h-screen p-8 bg-blue-100 flex flex-col items-center">
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mb-10">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Delivery Details Form</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Delivery ID */}
          <div>
            <label htmlFor="deliveryId" className="text-gray-800">Delivery ID:</label>
            <input 
              id="deliveryId" 
              type="text" 
              className="w-full p-2 border border-gray-400 rounded-lg bg-gray-100 cursor-not-allowed"
              value={formData.deliveryId} 
              readOnly 
            />
          </div>

          {/* Delivery Date */}
          <div>
            <label htmlFor="deliveryDate" className="text-gray-800">Delivery Date:</label>
            <input 
              id="deliveryDate" 
              type="date" 
              className="w-full p-2 border border-gray-400 rounded-lg"
              value={formData.deliveryDate}
              onChange={handleChange}
            />
          </div>

          {/* Customer */}
          <div>
            <label htmlFor="customer" className="text-gray-800">Customer:</label>
            <input 
              id="customer" 
              type="text" 
              className="w-full p-2 border border-gray-400 rounded-lg"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Enter customer name"
            />
          </div>

          {/* Route */}
          <div>
            <label htmlFor="route" className="text-gray-800">Route:</label>
            <input 
              id="route" 
              type="text" 
              className="w-full p-2 border border-gray-400 rounded-lg"
              value={formData.route}
              onChange={handleChange}
              placeholder="Enter route"
            />
          </div>

          {/* Expected Delivery Time */}
          <div>
            <label htmlFor="expectedDeliveryTime" className="text-gray-800">Expected Delivery Time:</label>
            <input 
              id="expectedDeliveryTime" 
              type="time" 
              className="w-full p-2 border border-gray-400 rounded-lg"
              value={formData.expectedDeliveryTime}
              onChange={handleChange}
            />
          </div>

          {/* Actual Delivery Time */}
          <div>
            <label htmlFor="actualDeliveryTime" className="text-gray-800">Actual Delivery Time:</label>
            <input 
              id="actualDeliveryTime" 
              type="time" 
              className="w-full p-2 border border-gray-400 rounded-lg"
              value={formData.actualDeliveryTime}
              onChange={handleChange}
            />
          </div>

          {/* Delivery Status */}
          <div>
            <label htmlFor="deliveryStatus" className="text-gray-800">Delivery Status:</label>
            <select 
              id="deliveryStatus" 
              className="w-full p-2 border border-gray-400 rounded-lg"
              value={formData.deliveryStatus}
              onChange={handleChange}
            >
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600"
          >
            Submit
          </button>
          <button
            type="button"
            className="bg-gray-400 text-white py-2 px-6 rounded-lg hover:bg-gray-500"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    {/* Stats Section */}
    <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8 mb-10">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Delivery Summary</h3>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-700">Total Deliveries</h4>
          <p className="text-2xl text-gray-800">{deliveryStats.totalRecords}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-700">On-Time Deliveries</h4>
          <p className="text-2xl text-green-800">{deliveryStats.onTimeDeliveries}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-700">Late Deliveries</h4>
          <p className="text-2xl text-red-800">{deliveryStats.lateDeliveries}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-700">Early Deliveries</h4>
          <p className="text-2xl text-yellow-800">{deliveryStats.earlyDeliveries}</p>
        </div>
      </div>
    </div>


   
      {/* Delivery Records Table */}
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Delivery Records</h3>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Customer</th>
              <th className="px-4 py-2 border">Route</th>
              <th className="px-4 py-2 border">Expected Time</th>
              <th className="px-4 py-2 border">Actual Time</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveryRecords.map((record) => (
              <tr key={record._id}>
                <td className="px-4 py-2 border">{record.deliveryId}</td>
                <td className="px-4 py-2 border">{formatDate(record.deliveryDate)}</td>
                <td className="px-4 py-2 border">{record.customer}</td>
                <td className="px-4 py-2 border">{record.route}</td>
                <td className="px-4 py-2 border">{record.expectedDeliveryTime}</td>
                <td className="px-4 py-2 border">{record.actualDeliveryTime}</td>
                <td className="px-4 py-2 border">{record.deliveryStatus}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDelete(record._id)}
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
   </div>
  );
};

export default DeliveryForm;
