import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import Header from '../../Components/Inventory_Manager/Header';
import Navbar from '../../Components/Inventory_Manager/Navbar';
import FilterForm from '../../Components/Inventory_Manager/FilterForm'; // Import your FilterForm component
import InventoryTable from '../../Components/Inventory_Manager/GenInTable'; // Import your InventoryTable component

const GenerateReport = () => {
    const [inventoryData, setInventoryData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filterData, setFilterData] = useState({
        warehouseCode: '',
        productCode: '',
        quantityOnHand: '',
        quantityAvailable: '',
        quantityAllocated: '',
        cost: '',
        price: ''
    });

    useEffect(() => {
        const fetchInventoryData = async () => {
            try {
                const response = await fetch('http://localhost:5555/Item'); // Adjust the endpoint as needed
                const data = await response.json();
                console.log("Fetched Data: ", data); // Log the fetched data
                setInventoryData(data);
                setFilteredData(data); // Initially set filtered data to all inventory data
            } catch (error) {
                console.error('Error fetching inventory data:', error);
            }
        };
    
        fetchInventoryData();
    }, []);
    

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const updatedFilterData = { ...filterData, [name]: value };
        setFilterData(updatedFilterData);
        handleFilterData(updatedFilterData);
    };

    const handleFilterData = (newFilterData) => {
        const filtered = inventoryData.filter(item => {
            const matchesWarehouse = newFilterData.warehouseCode ? item.WarehouseCode === newFilterData.warehouseCode : true;
            const matchesProduct = newFilterData.productCode ? item.ProductCode === newFilterData.productCode : true;
            const matchesQuantityOnHand = newFilterData.quantityOnHand ? item.QuantityonHand === parseInt(newFilterData.quantityOnHand) : true;
            const matchesQuantityAvailable = newFilterData.quantityAvailable ? item.QuantityAvailable === parseInt(newFilterData.quantityAvailable) : true;
            const matchesQuantityAllocated = newFilterData.quantityAllocated ? item.QuantityAllocated === parseInt(newFilterData.quantityAllocated) : true;
            const matchesCost = newFilterData.cost ? item.Cost === parseFloat(newFilterData.cost) : true;
            const matchesPrice = newFilterData.price ? item.Price === parseFloat(newFilterData.price) : true;
    
            return matchesWarehouse && matchesProduct && matchesQuantityOnHand && matchesQuantityAvailable && matchesQuantityAllocated && matchesCost && matchesPrice;
        });
    
        console.log("Filtered Data: ", filtered); // Log the filtered data
        setFilteredData(filtered);
    };
    

    const handleGeneratePDF = () => {
        const doc = new jsPDF('l', 'pt', 'a3');
        doc.setFontSize(18);
        doc.setFillColor(0, 0, 0);
        doc.text('Inventory Report', 40, 40);
        doc.setFontSize(12);
    
        // Add some space after the title
        const startX = 40;
        const startY = 80; // Increased Y position to add space after the title
        const rowHeight = 20;
        const colWidth = 120; // Adjusted column width to match header alignment
    
        // Define the header positions
        const headers = [
            { text: 'Warehouse Code', x: startX },
            { text: 'Warehouse Description', x: startX + colWidth },
            { text: 'Product Code', x: startX + 2.5 * colWidth },
            { text: 'Product Description', x: startX + 3.25 * colWidth },
            { text: 'Quantity on Hand', x: startX + 4.95 * colWidth },
            { text: 'Quantity Available', x: startX + 5.90 * colWidth },
            { text: 'Quantity Allocated', x: startX + 6.9 * colWidth },
            { text: 'Cost', x: startX + 8 * colWidth },
            { text: 'Price', x: startX + 8.5 * colWidth },
        ];
    
        // Draw header background
        const headerHeight = rowHeight * 1.5; // Height for single-line header
        const headerYPosition = startY - 17; // Adjust this value to move the header up
        doc.setFillColor(178, 34, 34); // Set header background color
        doc.rect(startX, headerYPosition, colWidth * headers.length, headerHeight, 'F'); // Fill the header rectangle
    
        // Draw header text
        headers.forEach(header => {
            doc.setTextColor(255, 255, 255); // Set header text color to white
            doc.text(header.text, header.x, startY);
        });
    
        // Add filtered data to the PDF
        filteredData.forEach((item, rowIndex) => {
            const yPosition = startY + 30 + (rowIndex + 1) * rowHeight; // Added 30 to yPosition to account for header height
            
            doc.setTextColor(0, 0, 0); // Reset text color to black for data
            doc.text(item.WarehouseCode, startX , yPosition);
            doc.text(item.WarehouseDescription || '', startX + colWidth, yPosition);
            doc.text(item.ProductCode, startX + 2.5 * colWidth, yPosition);
            doc.text(item.ProductDescription || '', startX + 3.25 * colWidth, yPosition);
            doc.text(item.QuantityonHand?.toString() || '0', startX + 4.95 * colWidth, yPosition);
            doc.text(item.QuantityAvailable?.toString() || '0', startX + 5.90 * colWidth, yPosition);
            doc.text(item.QuantityAllocated?.toString() || '0', startX + 6.9 * colWidth, yPosition);
            doc.text(item.Cost?.toFixed(2) || '0.00', startX + 8 * colWidth, yPosition);
            doc.text(item.Price?.toFixed(2) || '0.00', startX + 8.5 * colWidth, yPosition);
        });
    
        doc.save('inventory-report.pdf');
    };
    

    return (
        <div>
            <Header />
            <Navbar />
            <FilterForm filterData={filterData} handleFilterChange={handleFilterChange} />
            
            <div className="container mx-auto p-4 border-2 border-gray-300 rounded-lgmax-w-[1600px] mx-auto my-12 bg-white p-5 rounded-lg shadow-lg w-full">
                <InventoryTable data={filteredData} /> {/* Pass filteredData to InventoryTable */}
                
                {filteredData.length > 0 && (
                    <button 
                        className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 font-semibold"
                        onClick={handleGeneratePDF}
                    >
                        Generate PDF Report
                    </button>
                )}
            </div>
        </div>
    );
};

export default GenerateReport;
