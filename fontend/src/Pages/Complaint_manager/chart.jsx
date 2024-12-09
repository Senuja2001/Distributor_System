import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ComplaintsChart = ({ data }) => {
  const labels = data.map(complaint => complaint.city);
  const complaintsCount = data.reduce((acc, complaint) => {
    acc[complaint.city] = (acc[complaint.city] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(complaintsCount),
    datasets: [
      {
        label: 'Number of Complaints',
        data: Object.values(complaintsCount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-6 text-gray-700">
        Number of Complaints by City
      </h2>
      <div className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Number of Complaints by City',
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default ComplaintsChart;
