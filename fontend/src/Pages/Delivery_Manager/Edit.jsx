import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Navbar } from '../../Components/Return_Manager/Navbar';

const Edit = () => {
    const initialUser = {
        empID: "",
        fname: "",
        lname: "",
        dob: "", // Ensure the initial value is an empty string
        gender: "",
        role: "",
        contactNumber: "",
        email: "",
        joinDate: "" // Ensure the initial value is an empty string
    };

    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(initialUser);

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5555/api/user/getone/${id}`);
            // Assuming response.data returns the user data in the correct format
            setUser({
                ...response.data,
                dob: response.data.dob ? new Date(response.data.dob).toISOString().split('T')[0] : "", // Format date for input
                joinDate: response.data.joinDate ? new Date(response.data.joinDate).toISOString().split('T')[0] : "" // Format date for input
            });
        };
        fetchData();
    }, [id]);

    // Form validation
    const validateForm = () => {
        const { empID, fname, lname, dob, gender, role, contactNumber, email, joinDate } = user;
        if (!empID || !fname || !lname || !dob || !gender || !role || !contactNumber || !email || !joinDate) {
            toast.error('Please fill all the fields', { position: "top-right" });
            return false;
        }
        return true;
    };

    const submitForm = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        await axios.put(`http://localhost:5555/api/user/update/${id}`, user)
            .then((response) => {
                toast.success(response.data.message, { position: "top-right" });
                navigate("/user");
            })
            .catch((error) => {
                toast.error('Error while updating the user', { position: "top-right" });
            });
    };

    return (
        <div>
            <Navbar />
            <div className='bg-[#e2e5f8] min-h-screen flex flex-col items-center justify-center'>
                <Link to={"/user"} className="text-[#13518a] underline mb-4">Back</Link>
                <h3 className='text-[#13518a] text-2xl mb-6'>Update Delivery Personnel</h3>
                <form className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg' onSubmit={submitForm}>
                    {/* Employee ID */}
                    <div className='inputGroup mb-4'>
                        <label htmlFor="empID" className="block text-[#13518a] mb-2">Employee ID</label>
                        <input
                            type="text"
                            value={user.empID}
                            id="empID"
                            name="empID"
                            autoComplete='off'
                            placeholder='Employee ID'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            readOnly  // Making Employee ID read-only
                        />
                    </div>

                    {/* First Name */}
                    <div className='inputGroup mb-4'>
                        <label htmlFor="fname" className="block text-[#13518a] mb-2">First Name</label>
                        <input
                            type="text"
                            value={user.fname}
                            onChange={inputChangeHandler}
                            id="fname"
                            name="fname"
                            autoComplete='off'
                            placeholder='First name'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Last Name */}
                    <div className='inputGroup mb-4'>
                        <label htmlFor="lname" className="block text-[#13518a] mb-2">Last Name</label>
                        <input
                            type="text"
                            value={user.lname}
                            onChange={inputChangeHandler}
                            id="lname"
                            name="lname"
                            autoComplete='off'
                            placeholder='Last name'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Date of Birth */}
                    <div className='inputGroup mb-4'>
                        <label htmlFor="dob" className="block text-[#13518a] mb-2">Date of Birth</label>
                        <input
                            type="date"
                            value={user.dob}
                            onChange={inputChangeHandler}
                            id="dob"
                            name="dob"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Gender */}
                    <div className='inputGroup mb-4'>
                        <label htmlFor="gender" className="block text-[#13518a] mb-2">Gender</label>
                        <select
                            value={user.gender}
                            onChange={inputChangeHandler}
                            id="gender"
                            name="gender"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    {/* Role (Driver/Sales Representative) */}
                    <div className='inputGroup mb-4'>
                        <label htmlFor="role" className="block text-[#13518a] mb-2">Role</label>
                        <select
                            value={user.role}
                            onChange={inputChangeHandler}
                            id="role"
                            name="role"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select Role</option>
                            <option value="Driver">Driver</option>
                            <option value="Sales Representative">Sales Representative</option>
                        </select>
                    </div>

                    {/* Contact Number */}
                    <div className='inputGroup mb-4'>
                        <label htmlFor="contactNumber" className="block text-[#13518a] mb-2">Contact Number</label>
                        <input
                            type="text"
                            value={user.contactNumber}
                            onChange={inputChangeHandler}
                            id="contactNumber"
                            name="contactNumber"
                            autoComplete='off'
                            placeholder='Contact Number'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Email Address */}
                    <div className='inputGroup mb-4'>
                        <label htmlFor="email" className="block text-[#13518a] mb-2">Email Address</label>
                        <input
                            type="email"
                            value={user.email}
                            onChange={inputChangeHandler}
                            id="email"
                            name="email"
                            autoComplete='off'
                            placeholder='Email Address'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    {/* Join Date */}
                    <div className='inputGroup mb-4'>
                        <label htmlFor="joinDate" className="block text-[#13518a] mb-2">Join Date</label>
                        <input
                            type="date"
                            value={user.joinDate}
                            onChange={inputChangeHandler}
                            id="joinDate"
                            name="joinDate"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className='inputGroup'>
                        <button type="submit" className='bg-[#6f94af] text-white font-bold py-2 px-4 rounded hover:bg-[#5a7f9c]'>Update Delivery Personnel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Edit;
