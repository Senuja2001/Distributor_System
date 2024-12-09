import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import UserChart from './Chart';
import { Navbar } from '../../Components/Return_Manager/Navbar';

const User = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterJoinDate, setFilterJoinDate] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:5555/api/user/getall");
      setUsers(response.data);
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5555/api/user/delete/${id}`);
          setUsers(users.filter(user => user._id !== id));
  
          Swal.fire(
            'Deleted!',
            'The user has been deleted.',
            'success'
          );
        } catch (error) {
          console.error("There was an error deleting the user!", error);
          Swal.fire(
            'Error!',
            'There was an error deleting the user.',
            'error'
          );
        }
      }
    });
  };
  

  const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fname.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.lname.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.empID.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = filterRole ? user.role === filterRole : true;
    const matchesJoinDate = filterJoinDate ? formatDate(user.joinDate) === filterJoinDate : true;

    return matchesSearch && matchesRole && matchesJoinDate;
  });

  const resetSearch = () => {
    setSearchTerm('');
  };

  const resetJoinDate = () => {
    setFilterJoinDate('');
  };

  const generatePDF = () => {
    Swal.fire({
      title: 'Generating Report...',
      text: 'Please wait while the report is being generated.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    const input = document.getElementById('user-table');
  
    const actionColumns = document.querySelectorAll('.action-column');
    actionColumns.forEach(column => column.style.display = 'none');
  
    html2canvas(input).then((canvas) => {
      const pdf = new jsPDF();
  
      // Add company name and report title
      pdf.setFontSize(22);
      pdf.text('Wijesinghe Distributors', pdf.internal.pageSize.width / 2, 20, { align: 'center' });
  
      pdf.setFontSize(16);
      pdf.text('User Summary Report', pdf.internal.pageSize.width / 2, 30, { align: 'center' });
  
      // Add table image
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 190;
      const pageHeight = pdf.internal.pageSize.height;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 40; // Adjust position below the titles
  
      pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      // Add footer sentence
      pdf.setFontSize(12);
      pdf.text('This Report Provides clear details of the details you requested.', pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height - 10, { align: 'center' });
  
      pdf.save('UserSummaryReport.pdf');
  
      actionColumns.forEach(column => column.style.display = '');
  
      Swal.close(); // Close the loading alert
      Swal.fire({
        title: 'Success!',
        text: 'The report has been generated successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    });
  };
  

  return (
   <div>
    <Navbar/>
     <div className="min-h-screen bg-[#e2e5f8] flex flex-col justify-center items-center">
      <div className="w-4/5 bg-white shadow-lg rounded-lg p-12">
        <Link
          to="/add"
          className="inline-block mb-8 px-5 py-2 bg-[#6f94af] text-white no-underline rounded hover:bg-[#5a7b8f] transition-colors"
        >
          Add New Delivery Personnel
        </Link>

        {/* Search and Filter Section */}
        <div className="mb-6 flex flex-col md:flex-row md:justify-between">
          <div className="flex items-center mb-4 md:mb-0 relative">
            <label htmlFor="search" className="mr-2 text-[#13518a]">Search for Delivery Personnel:</label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="border border-[#13518a] rounded-md px-3 py-1 focus:outline-none focus:border-[#6f94af] pr-10"
            />
            {searchTerm && (
              <FaTimes 
                onClick={resetSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-black" 
                size={20}
              />
            )}
          </div>

          <div className="flex space-x-4">
            <div>
              <label htmlFor="role" className="block text-[#13518a]">Filter by Role:</label>
              <select
                id="role"
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="border border-[#13518a] rounded-md px-3 py-1 focus:outline-none focus:border-[#6f94af]"
              >
                <option value="">All Roles</option>
                <option value="Driver">Driver</option>
                <option value="Sales Representative">Sales Representative</option>
              </select>
            </div>
            <div>
              <label htmlFor="joinDate" className="block text-[#13518a]">Filter by Join Date:</label>
              <input
                type="date"
                id="joinDate"
                value={filterJoinDate}
                onChange={(e) => setFilterJoinDate(e.target.value)}
                className="border border-[#13518a] rounded-md px-3 py-1 focus:outline-none focus:border-[#6f94af]"
              />
              <button 
                onClick={resetJoinDate}
                className="ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Reset Date
              </button>
            </div>
          </div>
        </div>

        {/* New Summary Report Button */}
        <button
          onClick={generatePDF}
          className="inline-block mb-8 px-5 py-2 bg-[#6f94af] text-white no-underline rounded hover:bg-[#5a7b8f] transition-colors"
        >
          Summary Report
        </button>

        {/* User Table */}
        <div id="user-table">
          <table className="w-full border-collapse mb-8">
            <thead>
              <tr className="bg-gray-100 text-[#13518a]">
                <th className="border p-2">S.No</th>
                <th className="border p-2">Employee ID</th>
                <th className="border p-2">First Name</th>
                <th className="border p-2">Last Name</th>
                <th className="border p-2">Date of Birth</th>
                <th className="border p-2">Gender</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Contact Number</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Join Date</th>
                <th className="border p-2 action-column">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50 text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{user.empID}</td>
                  <td className="border p-2">{user.fname}</td>
                  <td className="border p-2">{user.lname}</td>
                  <td className="border p-2">{formatDate(user.dob)}</td>
                  <td className="border p-2">{user.gender}</td>
                  <td className="border p-2">{user.role}</td>
                  <td className="border p-2">{user.contactNumber}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{formatDate(user.joinDate)}</td>
                  <td className="border p-2 action-column">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/edit/${user._id}`}
                        state={{ user }}
                        className="px-3 py-1 bg-[#6f94af] text-white rounded hover:bg-[#5a7b8f] transition-colors"
                      >
                        Update
                      </Link>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bar Chart Component */}
        <UserChart users={filteredUsers} />
      </div>
    </div>
   </div>
  );
};

export default User;