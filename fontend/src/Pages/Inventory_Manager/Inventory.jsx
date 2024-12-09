import React, { useState } from 'react';
import FilterForm from '../../Components/Inventory_Manager/FilterForm';
import InventoryTable from '../../Components/Inventory_Manager/InventoryTable';
import Footer from '../../Components/Inventory_Manager/Footer';
import { Navbar } from '../../Components/Return_Manager/Navbar';

function Inventory() {
  // State to hold the filter data
  const [filterData, setFilterData] = useState({
    warehouseCode: '',
    productCode: '',
    quantityOnHand: undefined,
    quantityAvailable: undefined,
    quantityAllocated: undefined,
    cost: undefined,
    price: undefined
  });
  

  // Handler to update the filter state
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    
    // List of fields that should be treated as numbers
    const numericFields = ['quantityOnHand', 'quantityAvailable', 'quantityAllocated', 'cost', 'price'];
    
    setFilterData({
      ...filterData,
      [name]: numericFields.includes(name) 
        ? value === '' ? undefined : parseFloat(value) || undefined 
        : value
    });
  };
  
  

  return (
    <div>
      <Navbar/>
      <FilterForm 
        filterData={filterData}
        handleFilterChange={handleFilterChange} 
      />
      <InventoryTable filterData={filterData} />
      <Footer/>
    </div>
  );
}

export default Inventory;
