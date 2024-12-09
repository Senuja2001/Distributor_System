import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'; // Importing SweetAlert
import 'sweetalert2/src/sweetalert2.scss'; // Importing SweetAlert styles
import { Navbar } from '../../Components/Return_Manager/Navbar';

const Add = () => {
  const initialUser = {
    empID: "",
    fname: "",
    lname: "",
    dob: "",
    gender: "",
    role: "",
    contactNumber: "",
    email: "",
    joinDate: ""
  };

  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  // Function to generate Employee ID in the format 'EM<number>'
  const generateEmployeeID = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000); // Generates a 4-digit number
    return `EM${randomNum}`;
  };

  // Automatically generate Employee ID when the component is mounted
  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      empID: generateEmployeeID()
    }));
  }, []);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Regular expression for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Regular expression for contact number (starts with 07 and has 10 digits)
  const contactNumberRegex = /^07[0-9]{8}$/;

  // Form validation
  const validateForm = () => {
    const { empID, fname, lname, dob, gender, role, contactNumber, email, joinDate } = user;

    // Check if all fields are filled
    if (!empID || !fname || !lname || !dob || !gender || !role || !contactNumber || !email || !joinDate) {
      Swal.fire('Error', 'Please fill all the fields', 'error');
      return false;
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      Swal.fire('Error', 'Please enter a valid email address', 'error');
      return false;
    }

    // Validate contact number (should be digits only, and between 10-15 digits)
    if (!contactNumberRegex.test(contactNumber)) {
      Swal.fire('Error', 'Please enter a valid contact number starting with 07 and containing 10 digits.', 'error');
      return false;
    }

    // Validate date of birth (should be a past date)
    const today = new Date().toISOString().split('T')[0]; // current date
    if (dob >= today) {
      Swal.fire('Error', 'Date of Birth should be a past date', 'error');
      return false;
    }

    return true;
  };

  // Reset function without resetting Employee ID
  const resetForm = () => {
    setUser({
      ...initialUser,
      empID: user.empID // Keeps the Employee ID intact
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    await axios.post("http://localhost:5555/api/user/create", user)
      .then((response) => {
        Swal.fire('Success', response.data.message, 'success');
        navigate("/user");
      })
      .catch((error) => {
        Swal.fire('Error', 'Error while submitting the form', 'error');
      });
  };

  return (
    <div>
      <Navbar/>
        <div className="min-h-screen bg-[#e2e5f8] flex justify-center items-center px-4">
      <div className="w-full max-w-lg bg-white p-8 shadow-lg rounded-lg">
        <Link to="/user" className="text-[#13518a] underline mb-6 block">
          Back
        </Link>
        <h3 className="text-2xl font-semibold text-[#13518a] mb-6 text-center">Add New Delivery Personnel</h3>
        
        {/* Form structure */}
        <form className="space-y-6" onSubmit={submitForm}>
          <div className="grid grid-cols-2 gap-4">
            {/* Employee ID (read-only and auto-generated) */}
            <div className="col-span-2">
              <label htmlFor="empID" className="block text-[#13518a]">Employee ID</label>
              <input
                type="text"
                value={user.empID}
                id="empID"
                name="empID"
                autoComplete="off"
                className="w-full px-4 py-2 border border-[#13518a] rounded-md focus:outline-none"
                readOnly
              />
            </div>

            {/* First Name */}
            <div>
              <label htmlFor="fname" className="block text-[#13518a]">First Name</label>
              <input
                type="text"
                onChange={inputHandler}
                id="fname"
                name="fname"
                autoComplete="off"
                placeholder="First name"
                className="w-full px-4 py-2 border border-[#13518a] rounded-md focus:outline-none"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lname" className="block text-[#13518a]">Last Name</label>
              <input
                type="text"
                onChange={inputHandler}
                id="lname"
                name="lname"
                autoComplete="off"
                placeholder="Last name"
                className="w-full px-4 py-2 border border-[#13518a] rounded-md focus:outline-none"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dob" className="block text-[#13518a]">Date of Birth</label>
              <input
                type="date"
                onChange={inputHandler}
                id="dob"
                name="dob"
                className="w-full px-4 py-2 border border-[#13518a] rounded-md focus:outline-none"
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-[#13518a]">Gender</label>
              <select
                onChange={inputHandler}
                id="gender"
                name="gender"
                className="w-full px-4 py-2 border border-[#13518a] rounded-md focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Role (Driver/Sales Representative) */}
            <div>
              <label htmlFor="role" className="block text-[#13518a]">Role</label>
              <select
                onChange={inputHandler}
                id="role"
                name="role"
                className="w-full px-4 py-2 border border-[#13518a] rounded-md focus:outline-none"
              >
                <option value="">Select Role</option>
                <option value="Driver">Driver</option>
                <option value="Sales Representative">Sales Representative</option>
              </select>
            </div>

            {/* Contact Number */}
            <div>
              <label htmlFor="contactNumber" className="block text-[#13518a]">Contact Number</label>
              <input
                type="text"
                onChange={inputHandler}
                id="contactNumber"
                name="contactNumber"
                autoComplete="off"
                placeholder="Contact Number"
                className="w-full px-4 py-2 border border-[#13518a] rounded-md focus:outline-none"
              />
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-[#13518a]">Email Address</label>
              <input
                type="email"
                onChange={inputHandler}
                id="email"
                name="email"
                autoComplete="off"
                placeholder="Email Address"
                className="w-full px-4 py-2 border border-[#13518a] rounded-md focus:outline-none"
              />
            </div>

            {/* Join Date */}
            <div className="col-span-2">
              <label htmlFor="joinDate" className="block text-[#13518a]">Join Date</label>
              <input
                type="date"
                onChange={inputHandler}
                id="joinDate"
                name="joinDate"
                className="w-full px-4 py-2 border border-[#13518a] rounded-md focus:outline-none"
              />
            </div>
          </div>

          {/* Submit and Reset Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-[#13518a] text-white px-4 py-2 rounded-md hover:bg-[#0e3a5c] transition-colors"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-red-400 transition-colors"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Add;
