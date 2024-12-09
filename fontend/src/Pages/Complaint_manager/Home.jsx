import React from 'react';
import * as yup from 'yup';
import { Formik } from 'formik'; 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../../Components/Return_Manager/Navbar';
function Home() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup.string().required('First name is a required field'),
    lastName: yup.string().required('Last name is a required field'),
    username: yup.string().required('Username is a required field'),
    city: yup.string().required('City is a required field'),
    code: yup.string().required('Code is a required field'),
    complain_date: yup.date().required('Complain date is a required field'),
    purchased_date: yup.date().required('Purchase date is a required field'),
    complain: yup.string().required('Complain is a required field'),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const complaintData = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.username,
      city: values.city,
      code: values.code,
      complain_date: values.complain_date,
      purchased_date: values.purchased_date,
      complain: values.complain,
      terms: values.terms,
    };

    axios.post('http://localhost:5555/complain/add', complaintData)
      .then(response => {
        alert("Details added successfully");
        resetForm();
        navigate('/');
      })
      .catch(error => {
        console.error('There was an error submitting your complaint!', error);
      });
  };

  return (
    <div>
      <Navbar/>
      <div className="wrapper flex justify-center items-center min-h-screen">
      <div className="form-container bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Complain Management Form</h1>
        <Formik
          validationSchema={schema}
          onSubmit={handleSubmit}
          initialValues={{
            firstName: '',
            lastName: '',
            username: '',
            city: '',
            code: '',
            complain_date: '',
            purchased_date: '',
            complain: '',
            terms: false,
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <form noValidate onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="mt-2 text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="mt-2 text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 bg-gray-50 text-gray-500 text-sm">@</span>
                  <input
                    type="text"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    className={`block w-full flex-1 min-w-0 px-3 py-2 border rounded-none rounded-r-md focus:outline-none ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
                  />
                </div>
                {errors.username && touched.username && (
                  <p className="mt-2 text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    type="text"
                    name="city"
                    value={values.city}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && touched.city && (
                    <p className="mt-2 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700">Inventory code</label>
                  <input
                    type="text"
                    name="code"
                    value={values.code}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.code ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.code && touched.code && (
                    <p className="mt-2 text-sm text-red-600">{errors.code}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="complain_date" className="block text-sm font-medium text-gray-700">Complain date</label>
                  <input
                    type="date"
                    name="complain_date"
                    value={values.complain_date}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.complain_date ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.complain_date && touched.complain_date && (
                    <p className="mt-2 text-sm text-red-600">{errors.complain_date}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="purchased_date" className="block text-sm font-medium text-gray-700">Purchase date</label>
                  <input
                    type="date"
                    name="purchased_date"
                    value={values.purchased_date}
                    onChange={handleChange}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.purchased_date ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.purchased_date && touched.purchased_date && (
                    <p className="mt-2 text-sm text-red-600">{errors.purchased_date}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="complain" className="block text-sm font-medium text-gray-700">Complain</label>
                <textarea
                  name="complain"
                  rows="3"
                  value={values.complain}
                  onChange={handleChange}
                  className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none ${errors.complain ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="Enter your complain"
                />
                {errors.complain && touched.complain && (
                  <p className="mt-2 text-sm text-red-600">{errors.complain}</p>
                )}
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    onChange={handleChange}
                    className={`h-4 w-4 text-indigo-600 border-gray-300 rounded ${errors.terms ? 'border-red-500' : ''}`}
                  />
                </div>
                <div className="ml-2 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">Agree to terms and conditions</label>
                  {errors.terms && touched.terms && (
                    <p className="mt-2 text-sm text-red-600">{errors.terms}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none"
              >
                Add Complain
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
    </div>
  );
}

export default Home;




