import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ComplaintsChart from './chart.jsx';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable for table support
import { toast } from 'react-toastify'; // Import toast for notifications
import Tracking from './track.jsx';
import { Navbar } from '../../Components/Return_Manager/Navbar.jsx';


function Form() {
  const navigate = useNavigate();

  const [searchCriteria, setSearchCriteria] = useState({
    firstName: '',
    lastName: '',
    username: '',
    city: '',
    code: ''
  });

  const [filteredComplaints, setFilteredComplaints] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:5555/complain/get');
      console.log('Response data:', response.data);

      const filtered = response.data.filter(complaint => {
        return (
          (searchCriteria.firstName === '' || complaint.firstName.toLowerCase().includes(searchCriteria.firstName.toLowerCase())) &&
          (searchCriteria.lastName === '' || complaint.lastName.toLowerCase().includes(searchCriteria.lastName.toLowerCase())) &&
          (searchCriteria.username === '' || complaint.username.toLowerCase().includes(searchCriteria.username.toLowerCase())) &&
          (searchCriteria.city === '' || complaint.city.toLowerCase().includes(searchCriteria.city.toLowerCase())) &&
          (searchCriteria.code === '' || complaint.code.toLowerCase().includes(searchCriteria.code.toLowerCase()))
        );
      });

      setFilteredComplaints(filtered);
      console.log('Filtered complaints:', filtered);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error('Error fetching complaints');
    }
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
    navigate('/form');
  };

  const handleTrackComplaints = () => {
    navigate('/Tracking');
  };

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text('Complaints Report', 13, 20);

    const tableColumn = ['Name', 'Username', 'City', 'Code', 'Complain Date', 'Purchased Date', 'Complain'];
    const tableRows = [];

    filteredComplaints.forEach(complaint => {
      const complaintData = [
        `${complaint.firstName} ${complaint.lastName}`,
        complaint.username,
        complaint.city,
        complaint.code,
        complaint.complain_date,
        complaint.purchased_date,
        complaint.complain
      ];
      tableRows.push(complaintData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30
    });

    doc.save('complaints_report.pdf');
    toast.success('Report generated successfully!');
  };

  return (
    <div>
      <Navbar/>
      <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-12">Search Complaints</h1>
  
      
      <form className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-8 mb-12" onSubmit={handleSearch}>
       
        {['First Name', 'Last Name', 'Username', 'City', 'Inventory Code'].map((label, index) => (
          <div key={index}>
            <label htmlFor={`search${label.replace(" ", "")}`} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              id={`search${label.replace(" ", "")}`}
              className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder={`Search by ${label.toLowerCase()}`}
              value={searchCriteria[label.split(' ')[0].toLowerCase()]} 
              onChange={(e) => setSearchCriteria({ ...searchCriteria, [label.split(' ')[0].toLowerCase()]: e.target.value })} />
          </div>
        ))}
      </form>
  
      <div className="flex justify-center gap-6 mb-12">
        <button
          type="submit"
          className="px-8 py-3 bg-blue-500 text-white text-lg rounded-md shadow-sm hover:bg-blue-600"
          onClick={handleSearch}
        >
          Search
        </button>
        <button
          type="button"
          onClick={clearSearch}
          className="px-8 py-3 bg-gray-500 text-white text-lg rounded-md shadow-sm hover:bg-gray-600"
        >
          Clear
        </button>
        <button
          type="button"
          onClick={handleAddComplaint}
          className="px-8 py-3 bg-green-500 text-white text-lg rounded-md shadow-sm hover:bg-green-600"
        >
          Add Complaint
        </button>
        <button
          type="button"
          onClick={generateReport}
          className="px-8 py-3 bg-purple-500 text-white text-lg rounded-md shadow-sm hover:bg-purple-600"
        >
          Generate Report
        </button>
        <button
          type="button"
          onClick={handleTrackComplaints}
          className="px-8 py-3 bg-orange-500 text-white text-lg rounded-md shadow-sm hover:bg-orange-600"
        >
          Track Complaints
        </button>
      </div>
  
      {filteredComplaints.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-4">Filtered Complaints:</h2>
            <table className="min-w-full table-auto divide-y divide-gray-200 shadow-md">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Username</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Code</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Complain Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Purchased Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">Complain</th>
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
          </div>
          
          <div className="mt-12">
            <ComplaintsChart data={filteredComplaints} />
          </div>
        </>
      )}
    </div>
    </div>
  );
}

export default Form;
