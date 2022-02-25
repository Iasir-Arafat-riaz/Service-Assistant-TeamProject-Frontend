import Header from "./Pages/Home/Header/Header";
import Navigation from "./Pages/SharedRoute/Navigation/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Error from "./Pages/Eroor/Error";
import Services from "./Pages/Services/Services";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ContactUs from "./Pages/ContactUs/ContactUs";
import { useEffect } from "react";
import Overview from "./Pages/Dashboard/DashboardPages/Overview/Overview";
import MakeAdmin from "./Pages/Dashboard/DashboardPages/MakeAdmin/MakeAdmin";
import ManageAllOrders from "./Pages/Dashboard/DashboardPages/ManageAllOrders/ManageAllOrders";
import MyOrder from "./Pages/Dashboard/DashboardPages/MyOrder/MyOrder";
import UserLogin from "./Pages/Login/UserLogin/UserLogin";
import Addproduct from "./Pages/Dashboard/DashboardPages/Addproduct/Addproduct";
import Manageproducts from "./Pages/Dashboard/DashboardPages/Manageproducts/Manageproducts";
import SingleService from "./Pages/SingleService/SingleService/SingleService";

import AddTestimonial from "./Pages/Dashboard/DashboardPages/AddTestimonial/AddTestimonial";
import PendingTestimonial from "./Pages/Dashboard/DashboardPages/PendingTestimonial/PendingTestimonial";
import ManageTestimonials from "./Pages/Dashboard/DashboardPages/ManageTestimonials/ManageTestimonials";
import ServiceRequest from "./Pages/Dashboard/DashboardPages/ServiceRequest/ServiceRequest";
import useFirebase from '../src/Hooks/useFirebase'
import axios from "axios";
import AdminChat from "./Pages/Dashboard/DashboardPages/AdminChat/AdminChat";


// made a socket with server



// made a socket with server
// const socket = io('https://fierce-meadow-12011.herokuapp.com/');



// connecting the server

const App = () => {
  const { } = useFirebase()
  // const { socket } = useSocket();
  // useEffect(() => {
  //   socket.on("get-message", message => {
  //     console.log(message, 'homoe')
  //   });
  //   socket.emit('message', { data: 'datahome ' })
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route
            path="/dashboard/manageAllOrders"
            element={<ManageAllOrders />}
          />
          <Route path="/dashboard/makeAdmin" element={<MakeAdmin />} />
          <Route path="/dashboard/myorders" element={<MyOrder />} />
          <Route path="/dashboard/addproduct" element={<Addproduct />} />
          <Route path="/dashboard/adminChat" element={<AdminChat />} />

          <Route
            path="/dashboard/manageproducts"
            element={<Manageproducts />}
          />

          <Route
            path="/dashboard/addtestimonial"
            element={<AddTestimonial />}
          />
          <Route
            path="/dashboard/pendingtestimonial"
            element={<PendingTestimonial />}
          />
          <Route
            path="/dashboard/managetestimonials"
            element={<ManageTestimonials />}
          />
          <Route path="/dashboard/servicerequest" element={<ServiceRequest />} />
          <Route path="/dashboard/addproduct" element={<Addproduct />} />
          <Route path="/dashboard/manageproducts" element={<Manageproducts />} />



        </Route>
        <Route path="/contact" element={<ContactUs />} />
        <Route
          path="home/service-details/:serviceId"
          element={<SingleService />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
