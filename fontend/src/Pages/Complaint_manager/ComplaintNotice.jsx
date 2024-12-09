import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../../Components/Return_Manager/Navbar';

const ComplaintNotice = () => {
  const { id } = useParams(); // Get the complaint ID from the URL
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [status, setStatus] = useState('pending'); // Default status
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(''); // Error state for user feedback

  // Fetch complaint details by ID when component mounts
  useEffect(() => {
    const fetchComplaint = async () => {
      setLoading(true); // Start loading state
      try {
        const response = await axios.get(`http://localhost:5555/complain/getId/${id}`); // Correct dynamic URL
        setComplaint(response.data);
        console.log(complaint);
        setStatus(response.data.status || 'pending'); // Set status or default to 'pending'
      } catch (error) {
        console.error('Error fetching complaint details:', error);
        setError('Failed to load complaint details. Please try again later.'); // Set error message
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchComplaint();
  }, [id]);

  const handleStatusChange = async () => {
    // Validate that the status is selected
    if (!status) {
      setError('Please select a valid status.');
      return;
    }

    setLoading(true); // Start loading when updating
    setError(''); // Reset error state
    try {
      // Update the complaint status (only updating the status field)
      const response = await axios.put(`http://localhost:5555/complain/status/${id}`, {
        status, // Only update status
      });
      console.log(response);
      // If the complaint has an email, send a status update email
      if (complaint.email) {
        try {
          await axios.post('http://localhost:5555/complain/sendEmail', {
            email: complaint.email,
            subject: 'Complaint Status Update',
            message: `Dear ${complaint.firstName}, your complaint status has been updated to: ${status}`,
          });
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          alert('Status updated, but failed to send email.');
        }
      }

      alert('Status updated and email sent!');
      navigate('/complaint/ComplaintTracking'); // Navigate back to the dashboard
    } catch (error) {
      console.error('Error updating status or sending email:', error);
      setError('Failed to update status. Please try again.'); // Set error message
    } finally {
      setLoading(false); // Stop loading after the operation
    }
  };

  return (
   <div>
    <Navbar/>
     <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Complaint Notice</h1>

      {error && <div className="mb-4 text-red-500 text-center">{error}</div>}

      {loading ? (
        <div className="text-center">
          <p className="text-gray-500">Loading complaint details...</p>
        </div>
      ) : complaint ? (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Name: {complaint.firstName} {complaint.lastName}</h2>
            <p className="text-gray-600">Username: {complaint.username}</p>
            <p className="text-gray-600">City: {complaint.city}</p>
            <p className="text-gray-600">Code: {complaint.code}</p>
            <p className="text-gray-600">Complain Date: {new Date(complaint.complain_date).toLocaleDateString()}</p>
            <p className="text-gray-600">Purchased Date: {new Date(complaint.purchased_date).toLocaleDateString()}</p>
            <p className="text-gray-600">Complain: {complaint.complain}</p>
          </div>

          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <div className="text-right">
            <button
              onClick={handleStatusChange}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {loading ? 'Updating...' : 'Update Status & Send Email'}
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-500">No complaint details available.</p>
        </div>
      )}
    </div>
   </div>
  );
};

export default ComplaintNotice;
