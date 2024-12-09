import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Navbar } from '../../Components/Return_Manager/Navbar';

function ComplaintDetail() {
  const { id } = useParams();  // Get the complaint ID from the route
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    city: '',
    code: '',
    complain: '',
    complain_date: '',
    purchased_date: ''
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 


  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/complain/getId/${id}`);
        setComplaint(response.data);
       
        setFormData({
          ...response.data,
          complain_date: response.data.complain_date.split('T')[0],
          purchased_date: response.data.purchased_date.split('T')[0] 
        });
      } catch (error) {
        setError('Error fetching complaint details.');
        console.error('Error fetching complaint details:', error);
      } finally {
        setLoading(false); 
      }
    };
    fetchComplaint();
  }, [id]);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:5555/complain/update/${id}`, formData);
      alert('Complaint Updated Successfully');
      navigate('/'); 
    } catch (err) {
      console.error(err);
      alert('Error updating complaint.');
    }
  };


  const triggerDeleteConfirmation = () => {
    setShowDeleteConfirmation(true);
  };


  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/complain/delete/${id}`);
      alert('Complaint deleted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error deleting complaint:', error);
      alert('Error deleting complaint.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div>Loading complaint details...</div>; 

  if (!complaint) return <div>Error: Complaint not found.</div>;

  return (
   <div>
    <Navbar/>
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Complaint Details</h1>
      <form onSubmit={handleUpdate}>
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Inventory Code</label>
            <input
              type="text"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Complain Date</label>
            <input
              type="date"
              name="complain_date"
              value={formData.complain_date}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Purchased Date</label>
            <input
              type="date"
              name="purchased_date"
              value={formData.purchased_date}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Complain</label>
          <textarea
            name="complain"
            value={formData.complain}
            onChange={handleChange}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            rows="4"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white text-lg rounded-md shadow-sm hover:bg-blue-600"
        >
          Update Complaint
        </button>

        <button
          type="button"
          onClick={triggerDeleteConfirmation}
          className="px-6 py-2 bg-red-500 text-white text-lg rounded-md shadow-sm hover:bg-red-600 ml-4"
        >
          Delete Complaint
        </button>
      </form>

      {showDeleteConfirmation && (
        <div className="mt-8 bg-red-50 border border-red-300 p-4 rounded-md">
          <h2 className="text-lg font-semibold text-red-600 mb-4">Are you sure you want to delete this complaint?</h2>
          <p><strong>First Name:</strong> {complaint.firstName}</p>
          <p><strong>Last Name:</strong> {complaint.lastName}</p>
          <p><strong>Username:</strong> {complaint.username}</p>
          <p><strong>City:</strong> {complaint.city}</p>
          <p><strong>Inventory Code:</strong> {complaint.code}</p>
          <p><strong>Complain:</strong> {complaint.complain}</p>

          <div className="flex gap-4 mt-4">
            <button
              className="px-6 py-2 bg-red-600 text-white text-lg rounded-md shadow-sm hover:bg-red-700"
              onClick={handleDelete}
            >
              Yes, Delete
            </button>
            <button
              className="px-6 py-2 bg-gray-500 text-white text-lg rounded-md shadow-sm hover:bg-gray-600"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
   </div> 
  );
}

export default ComplaintDetail;
