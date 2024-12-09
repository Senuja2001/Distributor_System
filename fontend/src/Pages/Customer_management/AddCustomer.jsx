import React, { useState } from 'react';
import { Navbar } from '../../Components/Return_Manager/Navbar';

const AddCustomer = () => {
  const [formData, setFormData] = useState({
    distributorCode: '',
    customerCode: '',
    customerName: '',
    openAccountDate: '',
    registrationNumber: '',
    type: 'Cash',
    status: 'Active',
    contactPerson: '',
    telephoneNumber: '',
    additionalTelephoneNumber: '',
    emailAddress: '',
    emailNotification: false,
    image: null
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [preview, setPreview] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:5555/api/customers', {
        method: 'POST',
        body: formDataToSend
      });

      if (response.ok) {
        setSuccessMessage('Customer added successfully!');
        setErrorMessage('');
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error adding customer.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error adding customer:', error);
      setErrorMessage('An error occurred while adding the customer.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-300 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Add New Customer</h1>

        {/* Profile Image Picker */}
        <div className="flex justify-center mb-6 relative">
          <div className="w-40 h-40 border-2 border-dashed border-gray-400 rounded-full overflow-hidden shadow-lg cursor-pointer relative">
            <img 
              src={preview || 'https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg'} 
              alt="Profile Preview" 
              className="object-cover w-full h-full hover:opacity-80 transition-all duration-300"
              onClick={() => document.getElementById('filePicker').click()} 
            />
          </div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs rounded px-2 py-1">Click to upload</div>
        </div>
        <input 
          type="file" 
          id="filePicker" 
          accept="image/*" 
          onChange={handleChange} 
          name="image"
          className="hidden"
        />

        {/* Display success or error message */}
        {successMessage && <div className="bg-green-200 text-green-800 p-4 mb-4 rounded-lg text-center font-semibold shadow-md">{successMessage}</div>}
        {errorMessage && <div className="bg-red-200 text-red-800 p-4 mb-4 rounded-lg text-center font-semibold shadow-md">{errorMessage}</div>}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="bg-white p-8 rounded-lg shadow-lg space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group">
              <label className="block text-gray-700 font-semibold">Distributor Code</label>
              <input 
                type="text" 
                name="distributorCode" 
                value={formData.distributorCode} 
                onChange={handleChange} 
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Distributor Code" 
              />
            </div>
            
            <div className="form-group">
              <label className="block text-gray-700 font-semibold">Customer Code</label>
              <input 
                type="text" 
                name="customerCode" 
                value={formData.customerCode} 
                onChange={handleChange} 
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Customer Code" 
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold">Customer Name *</label>
              <input 
                type="text" 
                name="customerName" 
                value={formData.customerName} 
                onChange={handleChange} 
                required 
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Customer Name" 
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold">Open Account Date</label>
              <input 
                type="date" 
                name="openAccountDate" 
                value={formData.openAccountDate} 
                onChange={handleChange} 
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold">Registration Number</label>
              <input 
                type="text" 
                name="registrationNumber" 
                value={formData.registrationNumber} 
                onChange={handleChange} 
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Registration Number" 
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold">Type</label>
              <select 
                name="type" 
                value={formData.type} 
                onChange={handleChange} 
                required 
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Cash">Cash</option>
                <option value="Credit">Credit</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold">Status</label>
              <select 
                name="status" 
                value={formData.status} 
                onChange={handleChange} 
                required 
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold">Contact Person</label>
              <input 
                type="text" 
                name="contactPerson" 
                value={formData.contactPerson} 
                onChange={handleChange} 
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Contact Person" 
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold">Telephone Number *</label>
              <input 
                type="text" 
                name="telephoneNumber" 
                value={formData.telephoneNumber} 
                onChange={handleChange} 
                required 
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Telephone Number (10 digits)" 
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold">Additional Telephone Number</label>
              <input 
                type="text" 
                name="additionalTelephoneNumber" 
                value={formData.additionalTelephoneNumber} 
                onChange={handleChange} 
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Additional Telephone Number" 
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-semibold">Email Address *</label>
              <input 
                type="email" 
                name="emailAddress" 
                value={formData.emailAddress} 
                onChange={handleChange} 
                required 
                className="mt-1 block w-full bg-gray-50 border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Email Address" 
              />
            </div>

            <div className="form-group flex items-center space-x-3">
              <input 
                type="checkbox" 
                className="form-check-input h-5 w-5 text-blue-600 focus:ring-0 border-gray-300 rounded-lg" 
                name="emailNotification" 
                checked={formData.emailNotification} 
                onChange={handleChange} 
              />
              <label className="text-gray-700 font-semibold">Send Email Notification</label>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg">
            Create Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
