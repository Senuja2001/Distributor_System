import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Generate = ({ returns }) => {
    const generatePDF = () => {
        const doc = new jsPDF();

        // Adding a title
        doc.setFontSize(20);
        doc.text("Returns Report", 20, 20);

        // Format dates
        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString();
        };

        // Adding headers
        const headers = ["Return No", "Return Date", "Customer Code", "Route Code", "Total Net Amount", "Status"];
        doc.setFontSize(12);
        doc.autoTable({
            head: [headers],
            body: returns.map(returnItem => [
                returnItem.returnNo,
                formatDate(returnItem.returnDate),
                returnItem.customerCode,
                returnItem.routeCode,
                returnItem.totalNetAmount,
                returnItem.status
            ]),
            startY: 30,
            theme: 'striped', // Optional styling
            headStyles: { fillColor: [22, 160, 133] }, // Custom header styling
        });

        // Save the PDF
        doc.save("returns_report.pdf");
    };

    if (!returns.length) {
        return <p>No return records to display.</p>;
    }

    return (
        <button className='p-2 bg-[#00BFFF] text-white hover:bg-[#007ACC]' onClick={generatePDF}>
            Print
        </button>
    );
};

export default Generate;
