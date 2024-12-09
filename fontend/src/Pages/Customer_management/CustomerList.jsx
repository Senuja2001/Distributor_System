import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Components/Return_Manager/Navbar';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search term
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5555/api/customers');
      const data = await response.json();
      setCustomers(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const deleteCustomer = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        const response = await fetch(`http://localhost:5555/api/customers/${customerId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setCustomers(customers.filter((customer) => customer._id !== customerId));
          alert('Customer deleted successfully.');
        } else {
          alert('Failed to delete customer.');
        }
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const editCustomer = (customerId) => {
    navigate(`/edit-customer/${customerId}`);
  };

  // Filter customers based on search term
  const filteredCustomers = customers.filter(customer =>
    customer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Customer List</h2>

          {/* Search Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by Customer Name"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="py-3 px-6 text-left font-semibold">Distributor Code</th>
                  <th className="py-3 px-6 text-left font-semibold">Customer Code</th>
                  <th className="py-3 px-6 text-left font-semibold">Customer Name</th>
                  <th className="py-3 px-6 text-left font-semibold">Status</th>
                  <th className="py-3 px-6 text-left font-semibold">Type</th>
                  <th className="py-3 px-6 text-left font-semibold">Contact Person</th>
                  <th className="py-3 px-6 text-left font-semibold">Email Address</th>
                  <th className="py-3 px-6 text-center font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr key={customer._id} className="bg-gray-100 border-b border-gray-200 hover:bg-gray-200 transition duration-200">
                    <td className="py-3 px-6">{customer.distributorCode}</td>
                    <td className="py-3 px-6">{customer.customerCode}</td>
                    <td className="py-3 px-6">{customer.customerName}</td>
                    <td className="py-3 px-6">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        customer.status === 'Active' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                      }`}>
                        {customer.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">{customer.type}</td>
                    <td className="py-3 px-6">{customer.contactPerson}</td>
                    <td className="py-3 px-6">{customer.emailAddress}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mr-2 transition-all duration-200"
                        onClick={() => navigate(`/view-customer/${customer._id}`)}
                      >
                        View
                      </button>
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-md mr-2 transition-all duration-200"
                        onClick={() => editCustomer(customer._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-all duration-200"
                        onClick={() => deleteCustomer(customer._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
