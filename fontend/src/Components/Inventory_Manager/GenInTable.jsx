import React from 'react';

function GenInTable({ data }) { // Accept data as a prop
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Preview Filtered Data</h2>
      {data.length > 0 ? ( // Use the passed data for rendering
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Warehouse Code</th>
              <th className="border border-gray-300 px-4 py-2">Warehouse Description</th>
              <th className="border border-gray-300 px-4 py-2">Product Code</th>
              <th className="border border-gray-300 px-4 py-2">Product Description</th>
              <th className="border border-gray-300 px-4 py-2">Quantity on Hand</th>
              <th className="border border-gray-300 px-4 py-2">Quantity Available</th>
              <th className="border border-gray-300 px-4 py-2">Quantity Allocated</th>
              <th className="border border-gray-300 px-4 py-2">Cost</th>
              <th className="border border-gray-300 px-4 py-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => ( // Map through the data prop
              <tr key={item._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 text-center px-4 py-2">{item.WarehouseCode}</td>
                <td className="border border-gray-300 text-center px-4 py-2">{item.WarehouseDescription}</td>
                <td className="border border-gray-300 text-center px-4 py-2">{item.ProductCode}</td>
                <td className="border border-gray-300 text-center px-4 py-2">{item.ProductDescription}</td>
                <td className="border border-gray-300 text-center px-4 py-2">{item.QuantityonHand}</td>
                <td className="border border-gray-300 text-center px-4 py-2">{item.QuantityAvailable}</td>
                <td className="border border-gray-300 text-center px-4 py-2">{item.QuantityAllocated}</td>
                <td className="border border-gray-300 text-center px-4 py-2">{item.Cost.toFixed(2)}</td>
                <td className="border border-gray-300 text-center px-4 py-2">{item.Price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center border border-gray-300 px-4 py-2">No items found</p>
      )}
    </div>
  );
}

export default GenInTable;
