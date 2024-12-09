import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../../Components/Return_Manager/Navbar';

const EditCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    distributorCode: '',
    customerCode: '',
    customerName: '',
    status: 'Active',
    type: 'Cash',
    contactPerson: '',
    emailAddress: '',
    imageUri: '', // For current image URI
  });
  const [newImage, setNewImage] = useState(null); // To handle new image upload

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:5555/api/customers/${id}`);
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error('Error fetching customer:', error);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setNewImage(files[0]);
      setFormData({ ...formData, imageUri: URL.createObjectURL(files[0]) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) updatedData.append(key, formData[key]);
    });
    if (newImage) {
      updatedData.append('image', newImage);
    }

    try {
      const response = await fetch(`http://localhost:5555/api/customers/${id}`, {
        method: 'PUT',
        body: updatedData,
      });
      if (response.ok) {
        alert('Customer updated successfully!');
        navigate('/');
      } else {
        alert('Error updating customer.');
      }
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto mt-5">
        <div className="bg-white shadow-lg rounded-lg p-6 text-center">
        
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{formData.customerName}</h2>
          <form onSubmit={handleSubmit} className="mt-4 text-left">
            {/* Distributor Code */}
            <div className="mb-4">
              <label className="block text-left font-medium text-gray-700">Distributor Code</label>
              <input type="text" name="distributorCode" value={formData.distributorCode} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>

            {/* Customer Code */}
            <div className="mb-4">
              <label className="block text-left font-medium text-gray-700">Customer Code</label>
              <input type="text" name="customerCode" value={formData.customerCode} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>

            {/* Customer Name */}
            <div className="mb-4">
              <label className="block text-left font-medium text-gray-700">Customer Name</label>
              <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-left font-medium text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Type */}
            <div className="mb-4">
              <label className="block text-left font-medium text-gray-700">Type</label>
              <select name="type" value={formData.type} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2">
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
              </select>
            </div>

            {/* Contact Person */}
            <div className="mb-4">
              <label className="block text-left font-medium text-gray-700">Contact Person</label>
              <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>

            {/* Email Address */}
            <div className="mb-4">
              <label className="block text-left font-medium text-gray-700">Email Address</label>
              <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>

            {/* Image Upload */}
            <div className="mb-4">
              <label className="block text-left font-medium text-gray-700">Change Profile Picture</label>
              <input type="file" name="image" accept="image/*" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
            </div>

            <div className="text-center mt-4">
              <button type="submit" className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300">Update Customer</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCustomer;
