import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Error from "./Pages/Eroor/Error";
import Services from "./Pages/Services/Services";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ContactUs from "./Pages/ContactUs/ContactUs";
import io from "socket.io-client";
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
import axios from "axios";

import AddBanner from "./Pages/Dashboard/DashboardPages/AddBanner/AddBanner";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProviderOverview from "./Pages/Dashboard/DashboardPages/ProviderOverview/ProviderOverview";



// made a socket with server
// const socket = io("http://localhost:5000");

// made a socket with server
const socket = io("https://fierce-meadow-12011.herokuapp.com/");

// connecting the server
// useEffect(() => {
//   socket.on("connect", () => {
//     console.log('connection done!')
//     socket.send("Hello!");
//   });
// }, []);


const App = () => {




  return (
    <BrowserRouter>
    <ToastContainer />
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
          <Route path="addBanner" element={<AddBanner />} />
          <Route path="providerOverview" element={<ProviderOverview/>}/>

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
