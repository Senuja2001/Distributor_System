import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from 'chart.js';
import {Navbar} from '../../Components/Return_Manager/Navbar';


ChartJS.register(BarElement, CategoryScale, LinearScale);

const Inv_Dashboard = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [filterData, setFilterData] = useState({
    warehouseCode: '',
    productCode: ''
  });

  useEffect(() => {
    axios.get('http://localhost:5555/Item')
      .then(response => {
        setInventoryData(response.data);
      })
      .catch(error => console.error('Error fetching inventory data:', error));
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterData(prevState => ({ ...prevState, [name]: value }));
  };

  // Filtered data based on warehouse code
  const filteredData = inventoryData.filter(item => {
    const matchesWarehouse = !filterData.warehouseCode || item.WarehouseCode === filterData.warehouseCode;
    const matchesProduct = !filterData.productCode || item.ProductCode === filterData.productCode;
    return matchesWarehouse && matchesProduct;
  });

  // Prepare data for bar graphs
  const getWarehouseData = (warehouseCode) => {
    return filteredData.filter(item => item.WarehouseCode === warehouseCode)
      .reduce((acc, item) => acc + item.QuantityAvailable, 0);
  };

  const warehouseData = {
    labels: ['Primary', 'Secondary', 'Damaged', 'Bad Type'],
    datasets: [
      {
        label: 'Quantity Available',
        data: [
          getWarehouseData('208524'), // PRIMARY
          getWarehouseData('SCNWH'), // SECONDARY
          getWarehouseData('DAMAGE_WHS'), // DAMAGE
          getWarehouseData('DVWH1B') // BAD TYPE
        ],
        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800', '#F44336'],
      }
    ]
  };

  return (
    <div>
      <Navbar/>
      <div className="min-h-screen bg-blue-100 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-800 mb-8">Inventory Management Dashboard</h1>
        {/* Filter Section */}
        <div className="mb-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="warehouseCode" className="block mb-1">Warehouse Code:</label>
              <select
                className="form-select w-full p-2 border border-gray-300 rounded-md"
                id="warehouseCode"
                name="warehouseCode"
                value={filterData.warehouseCode}
                onChange={handleFilterChange}
              >
                <option value="">Select Warehouse Code</option>
                <option value="208524">PRIMARY</option>
                <option value="SCNWH">SECONDARY</option>
                <option value="DAMAGE_WHS">DAMAGE</option>
                <option value="DVWH1B">BAD TYPE (Expired)</option>
              </select>
            </div>
            <div>
              <label htmlFor="productCode" className="block mb-1">Product Code:</label>
              <select
                className="form-select w-full p-2 border border-gray-300 rounded-md"
                id="productCode"
                name="productCode"
                value={filterData.productCode}
                onChange={handleFilterChange}
              >
                <option value="">Select Product Code</option>
                <option value="F21272001">TOMATO SAUCE 200GR</option>
                <option value="F21292503">GINGER BEER 250ML</option>
                <option value="F21292502">LIME SODA DRINK 250ML</option>
                <option value="F21221003">MIXED FRUIT JAM CUP 100G</option>
                <option value="F21292506">RIDE CLASSIC DOUBLE PACK</option>
                <option value="F21222002">S/BERRY FLV. MELON JAM 200G</option>
                <option value="F21223004">MIXED FRUIT JAM 300G</option>
                <option value="F21281501">MUSTARD CREAM 150G</option>
                <option value="F21283402">KITHUL TREACLE 340ML</option>
                <option value="F21273501">SOYA SAUCE 350ML</option>
                <option value="F21232003">FUN B ORANGE PET 200ML</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bar Graph Section */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Warehouse Quantities</h2>
            <div className='flex items-center justify-center' style={{ position: 'relative', height: '400px', width: '100%' }}>
              <Bar data={warehouseData} options={{ responsive: true, maintainAspectRatio: true }} />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Inventory Details</h2>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Warehouse Code</th>
                <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Product Code</th>
                <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Quantity Available</th>
                <th className="px-6 py-3 border-b text-left text-lg font-medium text-gray-800">Price</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={item._id} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-6 py-4 border-b text-gray-700">{item.WarehouseCode}</td>
                  <td className="px-6 py-4 border-b text-gray-700">{item.ProductCode}</td>
                  <td className="px-6 py-4 border-b text-gray-700">{item.QuantityAvailable}</td>
                  <td className="px-6 py-4 border-b text-gray-700">{item.Price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Inv_Dashboard;
