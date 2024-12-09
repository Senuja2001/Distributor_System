import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserChart = ({ users }) => {
  // Extract roles and count occurrences
  const roleCount = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {});

  // Prepare data for the chart
  const data = {
    labels: Object.keys(roleCount),
    datasets: [
      {
        label: 'Number of Personnel',
        data: Object.values(roleCount),
        backgroundColor: '#6f94af',
        borderColor: '#13518a',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Distribution of Delivery Personnel by Role',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full h-auto bg-white p-4 rounded-lg shadow-md">
      <Bar data={data} options={options} />
    </div>
  );
};

export default UserChart;