import React, { useState, useEffect } from "react";
import "../styles/sales/createsale.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { NavigationBar } from "../../Components/Sales_Manager/NavigationBar";
import { v4 as uuidv4 } from "uuid";
import { Navbar } from "../../Components/Return_Manager/Navbar";

const CreateNewSale = () => {
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

  const [formData, setFormData] = useState({
    cname: "",
    cphone: "",
    cemail: "",
    rcode: "",
    odate: "",
    status: "",
    distibutor: "",
    dphone: "",
    demail: "",
    tamount: "",
  });

  const [errors, setErrors] = useState({});
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    // Set the minimum date to today
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  const handleCustomerChange = (e) => {
    const selectedCustomer = data.find(
      (customer) => customer.id === parseInt(e.target.value)
    );
    if (selectedCustomer) {
      setFormData({
        ...formData,
        orderno: generateOrderID(),
        cname: selectedCustomer.name,
        cphone: selectedCustomer.phone,
        cemail: selectedCustomer.email,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const generateOrderID = () => {
    const uniquePart = Math.floor(10000000 + Math.random() * 90000000); // Ensures 8-digit integer
    const orderID = `${formData.rcode}${uniquePart}`;

    return orderID;
  };

const validateField = (name, value) => {
  let errorsCopy = { ...errors };
  switch (name) {
    case "rcode":
    case "status":
    case "distributor":
    case "dphone":
    case "demail":
    case "tamount":
      if (!value.trim()) {
        errorsCopy[name] = "This field is required.";
      } else {
        delete errorsCopy[name];
      }
      break;
    case "dphone":
      if (!/^(\+94\d{9,10})$/.test(value)) {
        errorsCopy[name] = "Invalid phone number format.";
      } else {
        delete errorsCopy[name];
      }
      break;
    case "cemail":
    case "demail":
      if (!/\S+@\S+\.\S+/.test(value)) {
        errorsCopy[name] = "Invalid email format.";
      } else {
        delete errorsCopy[name];
      }
      break;
    case "odate":
      if (new Date(value) < new Date(minDate)) {
        errorsCopy[name] = "Order date cannot be in the past.";
      } else {
        delete errorsCopy[name];
      }
      break;
    default:
      break;
  }
  setErrors(errorsCopy);
};


  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields before submission
    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      validateField(key, value); // This will validate each field and update the errors object
    });

    if (
      Object.keys(errors).length > 0 ||
      Object.values(formData).some((field) => !field.trim())
    ) {
      swal("Error", "Please fill out all fields correctly.", "error");
      return; // Prevent form submission if there are errors
    }

    try {
      await axios.post(`http://localhost:5555/api/sales/add`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      swal("Good job!", "Sale Added Successfully!", "success");
      navigate("/dash");
    } catch (err) {
      console.error("Error adding sale:", err);
      swal("Error", "Failed to add sale. Please try again.", "error");
    }
  };

  return (
    <div className="dashboard w-full">
      <Navbar/>
      <div className="w-full">
        <div className="itm-conte pt-20">
          <div className="form-back">
            <form onSubmit={handleSubmit}>
              <div className="set" style={{ backgroundColor: "#092143" }}>
                <h3 className="set-title">
                  Customer Details <hr />
                </h3>

                <div className="same-row">
                  <label className="label required">Select Customer</label>
                  <br />
                  <select
                    name="customer"
                    onChange={handleCustomerChange}
                    className="p-name"
                    required
                  >
                    <option value="">Select Customer</option>
                    {data.map((customer) => (
                      <option key={customer.id} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="same-row">
                  <label className="label required">Customer Name</label> <br />
                  <input
                    type="text"
                    className="p-name"
                    placeholder="Customer Name"
                    name="cname"
                    value={formData.cname}
                  />
                  <label className="label required">Customer Phone</label>{" "}
                  <br />
                  <input
                    type="number"
                    className="p-name"
                    placeholder="Customer Phone"
                    name="cphone"
                    value={formData.cphone}
                  />
                  {!/^(\+94\d{9}|0\d{9})$/.test(formData.cphone) &&
                    formData.cphone && (
                      <p className="text-red-500 text-xs mt-1">
                        Please enter a valid phone number
                      </p>
                    )}
                  <label className="label required">Customer Email</label>{" "}
                  <br />
                  <input
                    type="email"
                    className="p-name"
                    placeholder="Customer Email"
                    name="cemail"
                    value={formData.cemail}
                  />
                  {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.cemail) &&
                    formData.cemail && (
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
                  <label className="label required">Route Code</label> <br />
                  <input
                    type="text"
                    className="p-code"
                    placeholder="Route Code"
                    name="rcode"
                    value={formData.rcode}
                    onChange={handleChange}
                  />
                  {errors.rcode && (
                    <p className="error-text text-red-500">{errors.rcode}</p>
                  )}
                  <label className="label required">Order Date</label> <br />
                  <input
                    type="date"
                    className="i-date"
                    name="odate"
                    value={formData.odate}
                    onChange={handleChange}
                    min={minDate}
                  />
                  {errors.odate && (
                    <p className="error-text text-red-500">{errors.odate}</p>
                  )}
                  <label className="label required">Status</label> <br />
                  <select
                    className="p-code"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="invoiced">Invoiced</option>
                    <option value="open">Open</option>
                    <option value="picked">Picked</option>
                  </select>
                  {errors.status && (
                    <p className="error-text text-red-500">{errors.status}</p>
                  )}
                </div>

                <div className="same-row">
                  <label className="label required">Distributor</label> <br />
                  <input
                    type="text"
                    className="p-code"
                    placeholder="Distributor"
                    name="distibutor"
                    value={formData.distibutor}
                    onChange={handleChange}
                  />
                  {errors.distributor && (
                    <p className="error-text text-red-500">
                      {errors.distributor}
                    </p>
                  )}
                  <label className="label required">Distributor Phone</label>
                  <br />
                  <input
                    type="number"
                    className="p-code"
                    placeholder="Distributor Phone"
                    name="dphone"
                    value={formData.dphone}
                    onChange={handleChange}
                  />
                  <br />
                  {!/^(\+94\d{9}|0\d{9})$/.test(formData.dphone) &&
                    formData.dphone && (
                      <p className="text-red-500 text-xs mt-1">
                        Please enter a valid phone number (e.g., +941111111111
                        or 0111111111).
                      </p>
                    )}
                  <label className="label required">Distributor Email</label>{" "}
                  <br />
                  <input
                    type="email"
                    className="p-code"
                    placeholder="Distributor Email"
                    name="demail"
                    value={formData.demail}
                    onChange={handleChange}
                  />
                  {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.demail) &&
                    formData.demail && (
                      <p className="text-red-500 text-xs mt-1">
                        Please enter a valid email address.
                      </p>
                    )}
                </div>
              </div>

              <div className="set" style={{ backgroundColor: "#092143" }}>
                <h3 className="set-title">
                  Pricing <hr />
                </h3>
                <label className="label required">Total Amount</label> <br />
                <input
                  type="number"
                  className="p-code"
                  placeholder="Total Amount"
                  name="tamount"
                  value={formData.tamount}
                  onChange={handleChange}
                />
                {errors.tamount && (
                  <p className="error-text text-red-500">{errors.tamount}</p>
                )}
              </div>

              <div className="button-group">
                <button className="btn btn-prd" type="submit">
                  Add Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewSale;
