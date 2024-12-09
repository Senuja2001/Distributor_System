import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavigationBar } from "../../Components/Sales_Manager/NavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../Components/Return_Manager/Navbar";

const SalesUpdate = () => {
  const [salesData, setSalesData] = useState({});
  const [minDate, setMinDate] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Set the minimum date to today
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5555/api/sales/getsale/${id}`
        );
        setSalesData(response.data.data || {}); // Corrected to set an object, not an array
        console.log("Fetched Sales Data:", response.data.data);
      } catch (error) {
        console.error("Error fetching sales:", error);
      }
    };

    fetchSales();
  }, [id]); // Ensure it runs only once or when `id` changes

  const handleOnChange = (e) => {
    setSalesData({ ...salesData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:5555/api/sales/updte/${id}`,
        salesData
      );
      console.log("Update Response:", res);
      console.log("Updated Sales Data:", salesData);
      swal("Good job!", "Sale Updated Successfully!", "success");

      navigate("/dash");
    } catch (error) {
      console.error("Error updating sales:", error);
      console.log("Updated Sales Data:", salesData);
      swal("Error", "Please fill out all fields correctly.", "error");
    }
  };

  return (
    <div className="dashboard w-full">
      <Navbar/>
      <div className="w-full">
        <div className="itm-conte pt-20">
          {/* <div>
            <button onClick={() => navigate(-1)}>Back</button>
          </div> */}
          <div className="form-back">
            <form onSubmit={handleUpdate}>
              <div className="set" style={{ backgroundColor: "#092143" }}>
                <h3 className="set-title">
                  Customer Details <hr />
                </h3>

                <div className="same-row">
                  <label className="label required">Customer Name</label> <br />
                  <input
                    type="text"
                    className="p-name"
                    placeholder="Customer Name"
                    name="cname"
                    onChange={handleOnChange}
                    value={salesData.cname}
                  />
                  <label className="label required">Customer Phone</label>{" "}
                  <br />
                  <input
                    type="text"
                    className="p-name"
                    placeholder="Customer Phone"
                    name="cphone"
                    onChange={handleOnChange}
                    value={salesData.cphone}
                  />
                  {!/^(\+94\d{9}|0\d{9})$/.test(salesData.cphone) &&
                    salesData.cphone && (
                      <p className="text-red-500 text-xs mt-1">
                        Please enter a valid phone number (e.g., +941111111111
                        or 0111111111).
                      </p>
                    )}
                  <label className="label required">Customer Email</label>{" "}
                  <br />
                  <input
                    type="email"
                    className="p-name"
                    placeholder="Customer Email"
                    name="cemail"
                    onChange={handleOnChange}
                    value={salesData.cemail}
                  />
                  {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(salesData.cemail) &&
                    salesData.cemail && (
                      <p className="text-red-500 text-xs mt-1">
                        Please enter a valid email address.
                      </p>
                    )}
                </div>
              </div>
              <div className="set" style={{ backgroundColor: "#092143" }}>
                <h3 className="set-title">
                  General Details <hr />
                </h3>

                <div className="same-row">
                  <label className="label required">Route Code </label> <br />
                  <input
                    type="text"
                    className="p-code"
                    name="rcode"
                    value={salesData.rcode || ""}
                    onChange={handleOnChange}
                    required
                  />
                  <label className="label required">Order Date </label> <br />
                  <input
                    type="date"
                    className="i-date"
                    name="odate"
                    value={salesData.odate || ""}
                    onChange={handleOnChange}
                    min={minDate}
                    required
                  />
                  <label className="label required">Status </label> <br />
                  <input
                    type="text"
                    className="p-code"
                    name="status"
                    value={salesData.status || ""}
                    onChange={handleOnChange}
                    required
                  />
                </div>
              </div>
              <div className="set" style={{ backgroundColor: "#092143" }}>
                <h3 className="set-title">
                  Pricing <hr />
                </h3>
                <label className="label required"> Total Amount </label> <br />
                <input
                  type="text"
                  className="p-code"
                  name="tamount"
                  value={salesData.tamount || ""}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-prd">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesUpdate;
