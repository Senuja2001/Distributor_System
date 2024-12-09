import { useState } from 'react';

const ExportPage = () => {
  const [format, setFormat] = useState('');

  const handleFormatChange = (e) => {
    setFormat(e.target.value);
  };

  const handleExport = () => {
    if (!format) return alert('Please select a format');
    // Call backend to generate the report in the selected format
    window.location.href = `/export-report?format=${format}`;
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Report Preview</h2>
      {/* Report Preview (e.g., table) */}
      <div className="border rounded-lg p-4 bg-white shadow">
        {/* Display data */}
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Column 1</th>
              <th className="px-4 py-2">Column 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Data 1</td>
              <td className="border px-4 py-2">Data 2</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700">Select Format</label>
        <select
          className="mt-2 block w-full px-3 py-2 border border-gray-300 rounded-md"
          value={format}
          onChange={handleFormatChange}
        >
          <option value="">Select format</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
          <option value="text">Text</option>
          <option value="html">HTML</option>
        </select>
      </div>

      <button
        className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600"
        onClick={handleExport}
      >
        Export
      </button>
    </div>
  );
};

export default ExportPage;
