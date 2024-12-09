import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';

function InventoryTable({ filterData }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to display per page
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await axios.get('http://localhost:5555/Item', {
          params: {
            warehouseCode: filterData.warehouseCode || undefined,
            productCode: filterData.productCode || undefined,
            quantityOnHand: filterData.quantityOnHand > 0 ? filterData.quantityOnHand : undefined,
            quantityAvailable: filterData.quantityAvailable > 0 ? filterData.quantityAvailable : undefined,
            quantityAllocated: filterData.quantityAllocated > 0 ? filterData.quantityAllocated : undefined,
            cost: filterData.cost > 0 ? filterData.cost : undefined,
            price: filterData.price > 0 ? filterData.price : undefined
          }
        });
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching filtered data:', error);
        setError('Failed to load inventory data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filterData]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`http://localhost:5555/Item/delete/${id}`)
        .then((response) => {
          console.log('Item deleted:', response.data);
          setItems(items.filter(item => item._id !== id));
        })
        .catch(error => {
          console.error('Error deleting item:', error);
          setError('Failed to delete item.');
        });
    }
  };

  const handleUpdate = (id) => {
    navigate(`/update-item/${id}`);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4 border-2 border-gray-300 rounded-lgmax-w-[1600px] mx-auto my-12 bg-white p-5 rounded-lg shadow-lg w-full">
      {loading ? (
        <p>Loading inventory data...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <table id="inventoryTable" className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-200 text-gray-600">
                <th className="py-2 px-4 border-b">Warehouse Code</th>
                <th className="py-2 px-4 border-b">Warehouse Description</th>
                <th className="py-2 px-4 border-b">Product Code</th>
                <th className="py-2 px-4 border-b">Product Description</th>
                <th className="py-2 px-4 border-b">Quantity on Hand</th>
                <th className="py-2 px-4 border-b">Quantity Available</th>
                <th className="py-2 px-4 border-b">Quantity Allocated</th>
                <th className="py-2 px-4 border-b">Cost</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr key={item._id} className={item.QuantityAvailable < 50 ? 'bg-red-100' : ''}>
                    <td className="text-center py-2 px-4 border-b">{item.WarehouseCode}</td>
                    <td className="text-center py-2 px-4 border-b">{item.WarehouseDescription}</td>
                    <td className="text-center py-2 px-4 border-b">{item.ProductCode}</td>
                    <td className="text-center py-2 px-4 border-b">{item.ProductDescription}</td>
                    <td className="text-center py-2 px-4 border-b">{item.QuantityonHand}</td>
                    <td className={`text-center py-2 px-4 border-b ${item.QuantityAvailable < 50 ? 'text-red-500' : ''}`}>{item.QuantityAvailable}</td>
                    <td className="text-center py-2 px-4 border-b">{item.QuantityAllocated}</td>
                    <td className="text-center py-2 px-4 border-b">{item.Cost.toFixed(2)}</td>
                    <td className="text-center py-2 px-4 border-b">{item.Price.toFixed(2)}</td>
                    <td className="text-center py-2 px-4 border-b">
                      <div className='flex space-x-2'>
                        <button 
                          className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                          onClick={() => handleUpdate(item._id)}
                        >
                          Update
                        </button>
                        <button 
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center py-2">No items found</td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination 
            totalPages={totalPages} 
            currentPage={currentPage} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
}

export default InventoryTable;
