import React, { useState } from 'react'; 
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios'; 
import Chart from './chart'; 

export default function SearchComplaints() {
    const navigate = useNavigate();
    const [searchCriteria, setSearchCriteria] = useState({
      firstName: '',
      lastName: '',
      username: '',
      city: '',
      code: ''
    });
    const [filteredComplaints, setFilteredComplaints] = useState([]);

    const handleSearch = (event) => {
      event.preventDefault();
  
      axios.get('http://localhost:5555/complain/getId/${id}')
        .then(response => {
          const filtered = response.data.filter(complaint => {
            return (
              complaint.firstName.toLowerCase().includes(searchCriteria.firstName.toLowerCase()) &&
              complaint.lastName.toLowerCase().includes(searchCriteria.lastName.toLowerCase()) &&
              complaint.username.toLowerCase().includes(searchCriteria.username.toLowerCase()) &&
              complaint.city.toLowerCase().includes(searchCriteria.city.toLowerCase()) &&
              complaint.code.toLowerCase().includes(searchCriteria.code.toLowerCase())
            );
          });
  
          setFilteredComplaints(filtered);
        })
        .catch(error => {
          console.error('Error fetching complaints:', error);
        });
    };
  
    const clearSearch = () => {
      setSearchCriteria({
        firstName: '',
        lastName: '',
        username: '',
        city: '',
        code: ''
      });
      setFilteredComplaints([]);
    };
  
    const handleAddComplaint = () => {
      navigate('/complain/adds/');
    };

    // New function to handle tracking complaints
    const handleTrackComplaints = () => {
      navigate('/complainttrack'); // Update this path as needed
    };
  
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Search Complaints</h1>
  
        <form className="space-y-4" onSubmit={handleSearch}>
          <div className="form-group">
            <label htmlFor="searchFirstName" className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="searchFirstName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by first name"
              value={searchCriteria.firstName}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, firstName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="searchLastName" className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="searchLastName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by last name"
              value={searchCriteria.lastName}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, lastName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="searchUsername" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="searchUsername"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by username"
              value={searchCriteria.username}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="searchCity" className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              id="searchCity"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by city"
              value={searchCriteria.city}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, city: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="searchCode" className="block text-sm font-medium text-gray-700">Inventory Code</label>
            <input
              type="text"
              id="searchCode"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search by code"
              value={searchCriteria.code}
              onChange={(e) => setSearchCriteria({ ...searchCriteria, code: e.target.value })}
            />
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600">Search</button>
            <button type="button" onClick={clearSearch} className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-600">Clear</button>
            <button type="button" onClick={handleAddComplaint} className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600">Add Complaint</button>
            {/* New button for tracking complaints */}
            <button type="button" onClick={handleTrackComplaints} className="px-4 py-2 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600">Track Complaints</button>
          </div>
        </form>
  
        {filteredComplaints.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Filtered Complaints:</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complain Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchased Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Complain</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredComplaints.map(complaint => (
                  <tr key={complaint._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{complaint.firstName} {complaint.lastName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{complaint.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{complaint.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Link to={`/complaint/${complaint._id}`} className="text-blue-500 hover:text-blue-700">{complaint.code}</Link>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{complaint.complain_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{complaint.purchased_date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{complaint.complain}</td>
                  </tr>
                ))} 
              </tbody>
            </table>
  
            {/* Render the ComplaintsChart component */}
            <Chart data={filteredComplaints} />
          </div>
        )}
      </div>
    );
}
