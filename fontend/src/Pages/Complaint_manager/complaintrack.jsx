import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ComplaintTracking = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    // Fetch complaints from the server
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5555/complain/get'); // Update endpoint as needed
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">Complaint Tracking Dashboard</h1>

      {complaints.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto divide-y divide-gray-200 shadow-md">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Code</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Complain Date</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {complaints.map(complaint => (
                <tr key={complaint._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{complaint.firstName} {complaint.lastName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{complaint.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{complaint.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{complaint.code}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(complaint.complain_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${complaint.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {complaint.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`ComplaintNotice/${complaint._id}`} className="text-blue-500 hover:text-blue-700">View Details</Link>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-gray-500">No complaints found.</p>
        </div>
      )}
    </div>
  );
};

export default ComplaintTracking;
