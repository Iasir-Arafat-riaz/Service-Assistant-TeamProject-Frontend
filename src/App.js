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
import useFirebase from "../src/Hooks/useFirebase";

import AddServiceRequest from "./Pages/Dashboard/DashboardPages/ServiceProvider/AddServiceRequest";

import AdminChat from "./Pages/Dashboard/DashboardPages/AdminChat/AdminChat";

import AddBanner from "./Pages/Dashboard/DashboardPages/AddBanner/AddBanner";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProviderOverview from "./Pages/Dashboard/DashboardPages/ProviderOverview/ProviderOverview";
import AppointmentRequest from "./Pages/Dashboard/DashboardPages/ServiceProvider/Appointment/AppointmentRequest";

// made a socket with server

// made a socket with server
// const socket = io('https://fierce-meadow-12011.herokuapp.com/');

// made a socket with server
// const socket = io("https://fierce-meadow-12011.herokuapp.com");

// made a socket with server

// made a socket with server

const socket = io("https://fierce-meadow-12011.herokuapp.com/");

// connecting the server

const App = () => {
  const {} = useFirebase();
  // const { socket } = useSocket();
  // useEffect(() => {
  //   socket.on("get-message", message => {
  //     console.log(message, 'homoe')
  //   });
  //   socket.emit('message', { data: 'datahome ' })
  // }, []);

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
          <Route path="providerOverview" element={<ProviderOverview />} />

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
          <Route
            path="/dashboard/servicerequest"
            element={<ServiceRequest />}
          />
          <Route path="/dashboard/addproduct" element={<Addproduct />} />
          <Route
            path="/dashboard/manageproducts"
            element={<Manageproducts />}
          />
          <Route
            path="/dashboard/provider/appointment"
            element={<AppointmentRequest />}
          />

          {/* add service request from service provider */}
          <Route
            path="/dashboard/make-service-request"
            element={<AddServiceRequest />}
          ></Route>
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
