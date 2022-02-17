import Header from "./Pages/Home/Header/Header";
import Navigation from "./Pages/SharedRoute/Navigation/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Error from "./Pages/Eroor/Error";
import Services from "./Pages/Services/Services";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ContactUs from "./Pages/ContactUs/ContactUs";
import { useEffect } from 'react'
import io from 'socket.io-client'
import Overview from "./Pages/Dashboard/DashboardPages/Overview/Overview";
import MakeAdmin from "./Pages/Dashboard/DashboardPages/MakeAdmin/MakeAdmin";
import ManageAllOrders from "./Pages/Dashboard/DashboardPages/ManageAllOrders/ManageAllOrders";
import MyOrder from "./Pages/Dashboard/DashboardPages/MyOrder/MyOrder";
import UserLogin from "./Pages/Login/UserLogin/UserLogin";
import Addproduct from "./Pages/Dashboard/DashboardPages/Addproduct/Addproduct";
import Manageproducts from "./Pages/Dashboard/DashboardPages/Manageproducts/Manageproducts";
import SingleService from "./Pages/SingleService/SingleService/SingleService";

// made a socket with server
const socket = io('http://localhost:5000');


function App() {

  // connecting the server 
  // useEffect(() => {
  //   socket.on("connect", () => {
  //     console.log('connection done!')
  //     socket.send("Hello!");
  //   });
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SERVICES" element={<Services />} />
        <Route path="/Login" element={<UserLogin />} />
        <Route path="/Dashboard" element={<Dashboard />} >
          <Route path="/Dashboard" element={<Overview />} />
          <Route path="/Dashboard/overview" element={<Overview />} />
          <Route path="/Dashboard/manageAllOrders" element={<ManageAllOrders />} />
          <Route path="/Dashboard/makeAdmin" element={<MakeAdmin />} />
          <Route path="/Dashboard/myorders" element={<MyOrder />} />
          <Route path="/Dashboard/Addproduct" element={<Addproduct/>} />
          <Route path="/Dashboard/manageproducts" element={<Manageproducts/>} />
        </Route>
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="/service-details/:serviceId" element={<SingleService />} />
        <Route path="*" element={<Error />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
