import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './Pages/Return_Management/Home'
import CreateReturn from './Pages/Return_Management/CreateReturn'
import ShowReturn from './Pages/Return_Management/ShowReturn'
import EditReturn from './Pages/Return_Management/EditReturn'
import DeleteReturn from './Pages/Return_Management/DeleteReturn'
import Dashboard from './Components/Return_Manager/Dashboard'
import { OrderPage } from './Pages/Order_Manager/OrderPage'
import { Orders } from './Pages/Order_Manager/Orders'
import { UpdateOrder } from './Pages/Order_Manager/UpdateOrder'
import { Order_Dashboard } from './Pages/Order_Manager/Order_Dashboard'
import CustomerList from './Pages/Customer_management/CustomerList'
import Reports from './Pages/Customer_management/Reports'
import AddCustomer from './Pages/Customer_management/AddCustomer'
import ViewCustomer from './Pages/Customer_management/ViewCustomer'
import EditCustomer from './Pages/Customer_management/EditCustomer'
import CreateNewSale from './Pages/Sales_Manager/CreateNewSale'
import SalesDashboard from './Pages/Sales_Manager/SalesManagerDashboard'
import SalesUpdate from './Pages/Sales_Manager/SalesUpdate'
import PickList from './Pages/Sales_Manager/PickList'
import Form from './Pages/Complaint_manager/form'
import Formapp from './Pages/Complaint_manager/Home'
import ComplaintDetail from './Pages/Complaint_manager/showdetail'
import Tracking from './Pages/Complaint_manager/track'
import ComplaintNotice from './Pages/Complaint_manager/ComplaintNotice'
import { AllPromotions } from './Pages/Promotion_Manager/AllPromotions'
import { Sidebar } from './Components/Promotion/Sidebar'
import { AddPromotion } from './Pages/Promotion_Manager/AddPromotion'
import { PromotionForm } from './Components/Promotion/PromotionForm'
import Add from './Pages/Delivery_Manager/Add'
import Edit from './Pages/Delivery_Manager/Edit'
import User from './Pages/Delivery_Manager/User'
import CustomerCommunication from './Pages/Delivery_Manager/CustomerCommunication'
import DeliveryForm from './Pages/Delivery_Manager/DeliveryForm'
import Delivery_Dashboard from './Pages/Delivery_Manager/Delivery_Dashboard'
import Inventory from './Pages/Inventory_Manager/Inventory'
import AddItem from './Pages/Inventory_Manager/AddItem'
import UpdateItem from './Pages/Inventory_Manager/UpdateItem'
import GenerateReport from './Pages/Inventory_Manager/GenerateReport'
import RestockItems from './Pages/Inventory_Manager/StockAdgestment'
import Inv_Dashboard from './Pages/Inventory_Manager/Dashboard'



function App() {
  
  return (
    <div>
      <Routes>
      
        {/* Return Manager */}
        <Route path="/" element={<Home />} />
        <Route path='/returns/create' element={<CreateReturn />} />
        <Route path='/returns/details/:id' element={<ShowReturn />} />
        <Route path='/returns/edit/:id' element={<EditReturn />} />
        <Route path='/returns/delete/:id' element={<DeleteReturn />} />
        <Route path='/dashboard' element={<Dashboard />} /> {/* Added Dashboard route */}

         {/* Order Manager */}

         <Route index path='/createorder' element={<OrderPage/>} />
          <Route index path='/orders' element={<Orders/>} />
          <Route index path='/updateorder/:id' element={<UpdateOrder/>} />
          <Route index path='/orderdashboard' element={<Order_Dashboard />} />

        {/*Customeer manager */}

        <Route path="/customerlist" element={<CustomerList />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/add-customer" element={<AddCustomer />} />
          <Route path="/view-customer/:id" element={<ViewCustomer />} />
          <Route path="/edit-customer/:id" element={<EditCustomer />} />

        
        {/*Sales manager */}

        <Route path="/addSale" element={<CreateNewSale />}></Route>
        <Route path="/dash" element={<SalesDashboard />}></Route>
        <Route path="/upd/:id" element={<SalesUpdate />}></Route>
        <Route path="/pick/:id" element={<PickList />}></Route>

       {/*Complaint manager */}

       <Route  path='/complaintlist' element={<Form/>} /> 
        <Route path="/form" element={<Formapp/>} /> 
        <Route path="/complaint/:id" element={<ComplaintDetail/>} />
        <Route path="/Tracking" element={<Tracking />} /> 
        <Route path="/ComplaintNotice/:id" element={<ComplaintNotice/>} /> 

       {/*Promotion*/}

       <Route path="/allpromotion" element={
          <div className="flex">
            <Sidebar />
            <div className="flex-1 ml-64">
              {" "}
              {/* Adjust margin-left */}
              <AllPromotions />
            </div>
          </div>
        }
        />
        <Route/>

        <Route
          path="/addPromotion"
          element={
            <div className="flex">
              <Sidebar />
              <div className="flex-1 ml-64">
                {" "}
                {/* Adjust margin-left */}
                <AddPromotion />
              </div>
            </div>
          }
        />

      <Route path="/promotionform" element={<PromotionForm/>} />
          {/*Delivery Manager */}

          <Route path='deliverymanagerdashboard' element={<Delivery_Dashboard />} /> 
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/user" element={<User />} />
        <Route path="/com" element={< CustomerCommunication />} />
        <Route path="/delivery" element={< DeliveryForm />} />

             {/*Inventory manager */}

        <Route path="/inventory" element={<Inventory />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/update-item/:id" element={<UpdateItem />} />
        <Route path="/report" element={<GenerateReport/>} />
        <Route path="/stock" element={<RestockItems/>} />
        <Route path="/inventorydashboard" element={<Inv_Dashboard/>} />

      </Routes>
    </div>
  )
};

export default App
