import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Navbar } from '../../Components/Return_Manager/Navbar';

const CustomerCommunication = () => {
  const [formData, setFormData] = useState({
    salesRep: '',
    route: '',
    customer: '',
    message: ''
  });
  const [communications, setCommunications] = useState([]);

  const fetchCommunications = async () => {
    try {
      const response = await axios.get("http://localhost:5555/api/cust/getAll");
      setCommunications(response.data); // Adjust based on your API response structure
    } catch (error) {
      console.error('Error fetching communications:', error);
    }
  };

  useEffect(() => {
    fetchCommunications(); // Fetch data when the component mounts
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { salesRep, route, customer, message } = formData;

    if (!salesRep || !route || !customer || !message) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please fill out all fields.',
      });
      return;
    }

    try {
      await axios.post("http://localhost:5555/api/cust/create", formData);
      Swal.fire({
        icon: 'success',
        title: 'Details Submitted',
        text: 'The customer communication details have been successfully submitted.',
        confirmButtonText: 'OK',
      });

      // Reset form data
      setFormData({
        salesRep: '',
        route: '',
        customer: '',
        message: ''
      });

      // Refetch communications to update the list
      fetchCommunications();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: 'There was an error submitting the details. Please try again.',
      });
    }
  };

  // New delete handler
  const handleDelete = async (id) => {
    const confirmation = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (confirmation.isConfirmed) {
      try {
        await axios.delete(`http://localhost:5555/api/cust/delete/${id}`); // Adjust the endpoint as needed
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'The communication record has been deleted.',
        });
        fetchCommunications(); // Refetch communications to update the list
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Deletion Failed',
          text: 'There was an error deleting the record. Please try again.',
        });
      }
    }
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-purple-100">
      <div className="w-3/4 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900">Delivery | Customer Communication</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="bg-gray-100 p-6 rounded-lg border border-gray-300 mb-6">
            <div className="grid grid-cols-3 gap-4">
              {/* Sales Rep Select */}
              <div className="flex items-center">
                <label htmlFor="salesRep" className="text-gray-800 w-40">Sales Rep:</label>
                <select 
                  id="salesRep" 
                  className="ml-2 p-2 border border-gray-400 rounded-lg w-full"
                  value={formData.salesRep}
                  onChange={handleChange}
                >
                  <option value="">Select Sales Rep</option>
                  <option value="EM6555">EM6555</option>
                  <option value="EM5894">EM5894</option>
                  <option value="EM7483">EM7483</option>
                  <option value="EM8678">EM8678</option>
                </select>
              </div>

              {/* Route Select */}
              <div className="flex items-center">
                <label htmlFor="route" className="text-gray-800 w-40">Route:</label>
                <select 
                  id="route" 
                  className="ml-2 p-2 border border-gray-400 rounded-lg w-full"
                  value={formData.route}
                  onChange={handleChange}
                >
                  <option value="">Select Route</option>
                  <option value="184R01-Moratuwa">184R01-Moratuwa</option>
                  <option value="184R02-Panadura">184R02-Panadura</option>
                </select>
              </div>

              {/* Customer Select */}
              <div className="flex items-center">
                <label htmlFor="customer" className="text-gray-800 w-40">Select Customer:</label>
                <select 
                  id="customer" 
                  className="ml-2 p-2 border border-gray-400 rounded-lg w-full"
                  value={formData.customer}
                  onChange={handleChange}
                >
                  <option value="">Select Customer</option>
                  <option value="ELISHA SUPERSTORE">ELISHA SUPERSTORE</option>
                  <option value="LAL STORES">LAL STORES</option>
                  <option value="SAMPATH STORES">SAMPATH STORES</option>
                  <option value="SHAMAL STORES">SHAMAL STORES</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-lg border border-red-400">
            <textarea
              id="message"
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="5"
              placeholder="Message ....."
              value={formData.message}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="inputGroup mt-4">
            <button
              type="submit"
              className="w-full bg-[#6f94af] text-white py-2 rounded-md hover:bg-[#5a7b8f] transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Display communications */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-900">Submitted Communications</h3>
          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300">
            {communications.length > 0 ? (
              <ul>
                {communications.map((comm, index) => (
                  <li key={index} className="border-b border-gray-300 py-2 flex justify-between items-center">
                    <div>
                      <strong>Sales Rep:</strong> {comm.salesRep} <br />
                      <strong>Route:</strong> {comm.route} <br />
                      <strong>Customer:</strong> {comm.customer} <br />
                      <strong>Message:</strong> {comm.message} <br />
                    </div>
                    <button 
                      onClick={() => handleDelete(comm._id)} // Assuming your API returns an _id for each communication
                      className="ml-4 text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No communications submitted yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CustomerCommunication;
