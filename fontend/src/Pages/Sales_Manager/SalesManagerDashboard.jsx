import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { NavigationBar } from "../../Components/Sales_Manager/NavigationBar";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SalesReportTemplate from "../../Components/Sales_Manager/SalesReportTemplate";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../Components/Return_Manager/Navbar";

const SalesDashboard = () => {
  const navigate = useNavigate();
  const data = [
    {
      id: 12,
      name: "Elisha Super",
      email: "elishasupar@gmail.com",
      phone: "0112345678",
    },
    {
      id: 13,
      name: "Sampath Store",
      email: "info@keels.lk",
      phone: "0112223344",
    },
    {
      id: 14,
      name: "Lal Store",
      email: "lalstores@gmail.com",
      phone: "0115556677",
    },
    {
      id: 15,
      name: "Shamal Store",
      email: "shamal@gmail.com",
      phone: "0115556677",
    },
    {
      id: 16,
      name: "Ruhunu Supar",
      email: "ruhunusupar@gmail.com",
      phone: "0115556677",
    },
    {
      id: 17,
      name: "Mahinda Store",
      email: "mahinda@gmail.com",
      phone: "0115556677",
    },
    {
      id: 18,
      name: "Matara Store",
      email: "support@matarastores.com",
      phone: "0115556677",
    },
  ];
  const [sales, setSales] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchDistributor, setSearchDistributor] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const [searchRoute, setSearchRoute] = useState("");
  const [searchSalesNo, setSearchSalesNo] = useState("");
  const [salesDateFrom, setSalesDateFrom] = useState("");
  const [salesDateTo, setSalesDateTo] = useState("");
  const [filteredSales, setFilteredSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/sales/sale`
        );
        setSales(response.data || []);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, []);

  useEffect(() => {
    let filteredResults = sales;

    if (searchDistributor) {
      filteredResults = filteredResults.filter((item) =>
        item.ccode?.toLowerCase().includes(searchDistributor.toLowerCase())
      );
    }

    if (searchValue) {
      filteredResults = filteredResults.filter((item) =>
        item.cname?.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (searchStatus) {
      filteredResults = filteredResults.filter((item) =>
        item.status?.toLowerCase().includes(searchStatus.toLowerCase())
      );
    }

    if (searchRoute) {
      filteredResults = filteredResults.filter((item) =>
        item.rcode?.toLowerCase().includes(searchRoute.toLowerCase())
      );
    }

    if (searchSalesNo) {
      filteredResults = filteredResults.filter((item) =>
        item._id.includes(searchSalesNo)
      );
    }

    if (salesDateFrom && salesDateTo) {
      filteredResults = filteredResults.filter((item) => {
        const saleDate = new Date(item.odate);
        return (
          saleDate >= new Date(salesDateFrom) &&
          saleDate <= new Date(salesDateTo)
        );
      });
    }

    setFilteredSales(filteredResults);
  }, [
    sales,
    searchValue,
    searchDistributor,
    searchStatus,
    searchRoute,
    searchSalesNo,
    salesDateFrom,
    salesDateTo,
  ]);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this sales record!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.get(`http://localhost:5555/api/sales/del/${id}`);
        setSales(sales.filter((sales) => sales._id !== id));
        Swal.fire("Deleted!", "The Sales Record has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting sales:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the sales record.",
        "error"
      );
    }
  };

  return (
    <div
      className="min-h-screen bg-black text-white w-full"
      style={{ backgroundColor: "#6b94b2" }}
    >
      <Navbar/>
     

      <div className="flex w-full">
        <main className="w-full mt-40">
          <div
            className="p-6 rounded-lg mb-6 ml-10 mr-10"
            style={{ backgroundColor: "#092143" }}
          >
            <h2 className="text-lg font-semibold mb-4">Sales/Order Search</h2>
            <div className="grid grid-cols-2 gap-4 mb-4 w-full">
              <div>
                <label>Distributor:</label>
                <input
                  type="text"
                  className="w-full p-2 text-black"
                  value={searchDistributor}
                  onChange={(e) => setSearchDistributor(e.target.value)}
                />
              </div>
              <div>
                <label>Sales Date from:</label>
                <input
                  type="date"
                  className="w-full p-2 text-black"
                  value={salesDateFrom}
                  onChange={(e) => setSalesDateFrom(e.target.value)}
                />
              </div>
              <div>
                <label>Route:</label>
                <input
                  type="text"
                  className="w-full p-2 text-black"
                  value={searchRoute}
                  onChange={(e) => setSearchRoute(e.target.value)}
                />
              </div>
              <div>
                <label>Sales Date to:</label>
                <input
                  type="date"
                  className="w-full p-2 text-black"
                  value={salesDateTo}
                  onChange={(e) => setSalesDateTo(e.target.value)}
                />
                {salesDateTo <= salesDateFrom ? (
                  <p className="text-red-500 text-xs mt-1">
                    FromDate should grater than to ToDate
                  </p>
                ) : (
                  ""
                )}
              </div>
              <div>
                <label>Customer:</label>
                <select
                  className="w-full p-2 text-black"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                >
                  <option value="">Select Customer</option>
                  {data.map((customer) => (
                    <option key={customer.id} value={customer.name}>
                      {customer.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Sales No:</label>
                <input
                  type="text"
                  className="w-full p-2 text-black"
                  value={searchSalesNo}
                  onChange={(e) => setSearchSalesNo(e.target.value)}
                />
              </div>
              <div>
                <label>Status:</label>
                <input
                  type="text"
                  className="w-full p-2 text-black"
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                />
              </div>
            </div>
            <button className="bg-gray-500 p-2 rounded-lg">Search</button>
          </div>

          <div
            className="rounded-lg m-10"
            style={{ backgroundColor: "#092143" }}
          >
            <h2 className="text-lg font-semibold mb-4 p-5">Order List</h2>
            <table className="text-left w-full">
              <thead>
                <tr className="bg-blue-600 w-fit mr-20">
                  <th className="p-2">Order No</th>
                  <th className="p-2">Order Date</th>
                  <th className="p-2">Distributor</th>
                  <th className="p-2">Customer Name</th>
                  <th className="p-2">Route Code</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Update</th>
                  <th className="p-2">Delete</th>
                  <th className="p-2">PickList</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((sales) => (
                  <tr key={sales._id} className=" w-fit">
                    <td className="p-4">{sales.orderno}</td>
                    <td className="p-4">{sales.odate}</td>
                    <td className="p-4">{sales.distibutor}</td>
                    <td className="p-4">{sales.cname}</td>
                    <td className="p-4">{sales.rcode}</td>
                    <td className="p-4">{sales.tamount}</td>
                    <td className="p-4">{sales.status}</td>

                    <td>
                      <a
                        className="bg-gray-500 p-1 m-1 rounded-lg"
                        href={`/upd/${sales._id}`}
                      >
                        Update Order
                      </a>
                    </td>
                    <td>
                      <button
                        className="bg-gray-500 p-1 m-1 rounded-lg"
                        onClick={() => handleDelete(sales._id)}
                      >
                        Cancel Order
                      </button>
                    </td>
                    <td>
                      <button
                        className="bg-gray-500 p-1 m-1 rounded-lg"
                        onClick={() => navigate(`/pick/${sales._id}`)}
                      >
                        PickList
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SalesDashboard;
