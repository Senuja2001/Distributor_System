import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Use navigate to redirect after deletion
  const [complaint, setComplaint] = useState(null);

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const response = await axios.get(`http://localhost:5555/complain/getId/${id}`);
        setComplaint(response.data);
      } catch (error) {
        console.error('Error fetching complaint details:', error);
      }
    };

    fetchComplaint();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5555/complain/delete/${id}`);
      // Optionally navigate back to the previous page or show a success message
      navigate('/complaints'); // Adjust the path to your complaints list
    } catch (error) {
      console.error('Error deleting complaint:', error);
    }
  };

  const handleUpdate = () => {
    // You might want to navigate to an update form
    navigate(`/complaint/update/${id}`); // Adjust the path as needed
  };

  if (!complaint) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Complaint Details</h2>
      <p className="text-lg mb-2"><strong>Name:</strong> {complaint.firstName} {complaint.lastName}</p>
      <p className="text-lg mb-2"><strong>Username:</strong> {complaint.username}</p>
      <p className="text-lg mb-2"><strong>City:</strong> {complaint.city}</p>
      <p className="text-lg mb-2"><strong>Code:</strong> {complaint.code}</p>
      <p className="text-lg mb-2"><strong>Complain Date:</strong> {new Date(complaint.complain_date).toLocaleDateString()}</p>
      <p className="text-lg mb-2"><strong>Purchased Date:</strong> {new Date(complaint.purchased_date).toLocaleDateString()}</p>
      <p className="text-lg mb-4"><strong>Complain:</strong> {complaint.complain}</p>

      <div className="flex justify-between">
        <button 
          onClick={handleUpdate} 
          className="px-4 py-2 bg-yellow-500 text-white rounded-md shadow-sm hover:bg-yellow-600">
          Update
        </button>
        <button 
          onClick={handleDelete} 
          className="px-4 py-2 bg-red-500 text-white rounded-md shadow-sm hover:bg-red-600">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ComplaintDetail;
