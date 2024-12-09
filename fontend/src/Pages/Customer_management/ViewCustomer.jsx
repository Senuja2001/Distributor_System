import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone, faUserTie, faMobileAlt, faBuilding, faCalendarAlt, faBell } from '@fortawesome/free-solid-svg-icons';
import { Navbar } from '../../Components/Return_Manager/Navbar';

const ViewCustomer = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetchCustomer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await fetch(`http://localhost:5555/api/customers/${id}`);
      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto mt-5 px-4">
        {customer ? (
          <>
            {/* Background header */}
            <div className="relative">
              <img
                className="w-full h-60 object-cover rounded-t-lg"
                src="https://images.template.net/wp-content/uploads/2014/11/Natural-Facebook-Cover-Photo.jpg" // Replace with desired image
                alt="Profile background"
              />
              <div className="absolute inset-0 flex justify-center items-center">
                {customer.imageUri ? (
                  <img
                    src={`data:image/jpeg;base64,${customer.imageUri}`}
                    alt={`${customer.customerName}'s profile`}
                    className="w-32 h-32 rounded-full border-4 border-white -mt-16 shadow-lg"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faUserTie}
                    className="w-32 h-32 rounded-full bg-gray-200 text-gray-400 border-4 border-white -mt-16 shadow-lg p-6"
                  />
                )}
              </div>
            </div>

            {/* Profile Information */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-12 text-center">
              <h2 className="text-3xl font-semibold text-gray-800">{customer.customerName}</h2>
              <p className="text-gray-500">{customer.distributorCode}</p>

              {/* Info Section */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                  <p className="text-gray-600">
                    <FontAwesomeIcon icon={faBuilding} className="mr-2 text-blue-500" />
                    <strong>Customer Code:</strong> {customer.customerCode}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                  <p className="text-gray-600">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-green-500" />
                    <strong>Open Account Date:</strong> {new Date(customer.openAccountDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                  <p className="text-gray-600">
                    <FontAwesomeIcon icon={faUserTie} className="mr-2 text-yellow-500" />
                    <strong>Contact Person:</strong> {customer.contactPerson}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                  <p className="text-gray-600">
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-purple-500" />
                    <strong>Email:</strong> {customer.emailAddress}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                  <p className="text-gray-600">
                    <FontAwesomeIcon icon={faPhone} className="mr-2 text-red-500" />
                    <strong>Telephone:</strong> {customer.telephoneNumber}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                  <p className="text-gray-600">
                    <FontAwesomeIcon icon={faMobileAlt} className="mr-2 text-indigo-500" />
                    <strong>Additional Phone:</strong> {customer.additionalTelephoneNumber}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-md shadow-sm col-span-3">
                  <p className="text-gray-600">
                    <FontAwesomeIcon icon={faBell} className="mr-2 text-pink-500" />
                    <strong>Email Notification:</strong> {customer.emailNotification ? 'Enabled' : 'Disabled'}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-500">Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCustomer;
