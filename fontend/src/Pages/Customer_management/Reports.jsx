import React, { useState } from 'react';
import { Navbar } from '../../Components/Return_Manager/Navbar';

const Reports = () => {
  const [filters, setFilters] = useState({ year: '', type: '' });
  const [reports, setReports] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`http://localhost:5555/api/customers/sales-report?${queryParams}`);
    const data = await response.json();
    setReports(data);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
   <div>
    <Navbar/>
     <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-orange-600 mb-6">Customer | Performance Analysis</h2>
      
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col md:flex-row md:space-x-4">
        <div className="mb-4 w-full">
          <label className="block text-gray-700 mb-2">Year</label>
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={filters.year}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>

        <div className="mb-4 w-full">
          <label className="block text-gray-700 mb-2">Type</label>
          <select
            name="type"
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600"
          >
            <option value="">Select Type</option>
            <option value="Cash">Cash</option>
            <option value="Credit">Credit</option>
          </select>
        </div>

        <button type="submit" className="bg-orange-600 text-white px-4 py-2 rounded-md mt-4 md:mt-0 hover:bg-orange-500 transition-colors">
          <i className="fas fa-filter mr-2"></i>Generate
        </button>
      </form>

      {reports.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2">Customer</th>
              <th className="py-2">Month</th>
              <th className="py-2">Sales Target</th>
              <th className="py-2">Sales Achievement</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((customer, idx) => {
              const salesArray = Object.entries(customer.sales || {});

              return salesArray.map(([month, sale], i) => (
                <tr key={`${idx}-${i}`} className="border-b border-gray-300">
                  <td className="py-2">{i === 0 ? customer.customerName : ''}</td>
                  <td className="py-2">{month}</td>
                  <td className="py-2">{sale.target}</td>
                  <td className="py-2">{sale.achievement}</td>
                </tr>
              ));
            })}
          </tbody>
        </table>
      )}

      <button onClick={handlePrint} className="bg-gray-700 text-white px-4 py-2 rounded-md mt-6 hover:bg-gray-600 transition-colors">
        <i className="fas fa-print mr-2"></i>Print
      </button>
    </div>
   </div>
  );
};

export default Reports;
