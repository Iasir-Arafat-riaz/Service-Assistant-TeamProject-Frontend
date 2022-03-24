import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Error from "./Pages/Eroor/Error";
import Services from "./Pages/Services/Services";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ContactUs from "./Pages/ContactUs/ContactUs";


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
import useFirebase from "../src/Hooks/useFirebase";

import AddServiceRequest from "./Pages/Dashboard/DashboardPages/ServiceProvider/AddServiceRequest";

import AdminChat from "./Pages/Dashboard/DashboardPages/AdminChat/AdminChat";

import AddBanner from "./Pages/Dashboard/DashboardPages/AddBanner/AddBanner";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProviderOverview from "./Pages/Dashboard/DashboardPages/ProviderOverview/ProviderOverview";
import SavedServices from "./Pages/Dashboard/SavedServices/SavedServices";
import BecomeaProvider from "./Pages/Dashboard/DashboardPages/BecomeaProvider/BecomeaProvider";
import AddServiceReview from "./Pages/Dashboard/DashboardPages/AddServiceReview/AddServiceReview";

import AppointmentRequest from "./Pages/Dashboard/DashboardPages/ServiceProvider/Appointment/AppointmentRequest";
import LoginPopup from "./Pages/Login/LoginPopup/LoginPopup";
import { useEffect, useState } from "react";
import { allData } from "./redux/dataSlice/dataSlice";
import PendingProviders from "./Pages/Dashboard/DashboardPages/PendingProviders/PendingProviders";

import useSocket from "./Hooks/useSocket";
import { useDispatch, useSelector } from "react-redux";




import SingleProviderDetails from "./Pages/AllProvider/SingleProviderDetails";
import MyProfile from "./Pages/Dashboard/MyProfile/MyProfile";


import { newNotification } from "./redux/dataSlice/dataSlice";



import AdminPendingRequest from "./Pages/Dashboard/DashboardPages/AdminPendingRequest/AdminPendingRequest";
import AddNewServiceCategory from "./Pages/Dashboard/DashboardPages/AddNewServiceCategory/AddNewServiceCategory";


// import AdminRoute from "./Pages/PrivateRoutes/AdminRoute";
// import PrivateUserRoute from "./Pages/PrivateRoutes/PrivateUserRoute";
// import ProviderRoute from "./Pages/PrivateRoutes/ProviderRoute";


import OrdersChat from "./Pages/Dashboard/OrdersChat/OrdersChat";
import NotificationCard from "./Pages/SharedRoute/Navigation/Component/NotificationCard";

import AddQuestions from "./Pages/Dashboard/DashboardPages/AddQuestions/AddQuestions";

import Career from "./Pages/Career/Career";

import Register from "./Pages/Login/UserLogin/Register/Register";

import Loading from "./Pages/SharedRoute/Loader/Loading";

// import AOS from 'aos'
// import 'aos/dist/aos.css';
// AOS.init();


// import AdminRoute from "./Pages/PrivateRoutes/AdminRoute";
// import PrivateUserRoute from "./Pages/PrivateRoutes/PrivateUserRoute";
// import ProviderRoute from "./Pages/PrivateRoutes/ProviderRoute";






const App = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setTimeout(() => {
      handleOpen();
    }, 5000)
  }, [])
  const { } = useFirebase();

  const { socket } = useSocket();
  const { user, loading } = useSelector(allData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.email) {
      socket.emit('joinAll', user.email);

    }


  }, [user, socket]);
  useEffect(() => {
    socket.on("get-notification", message => {
      dispatch(newNotification(message))
      toast(<NotificationCard notification={message}></NotificationCard >, {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    });
  }, [])

  return (
    <BrowserRouter>

      {!user?.email && <LoginPopup handleOpen={handleOpen} handleClose={handleClose} open={open} />}

      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/dashboard" element={<Dashboard />}>
          {/* <Route path="/dashboard" element={<Overview />} /> */}
          {
            loading ? <Route path="/dashboard" element={<Loading />} /> : user.role === 'admin' ? <Route path="/dashboard" element={<Overview />} /> : user.role === 'provider' ? <Route path="/dashboard" element={<ProviderOverview />} /> : <Route path="/dashboard" element={<MyOrder />} />
          }
          <Route path="/dashboard/overview" element={<Overview />} />
          <Route path="/dashboard/manageAllOrders" element={<ManageAllOrders />} />
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
          <Route path="/dashboard/myprofile" element={<MyProfile />} />
          <Route path="/dashboard/addquestions" element={<AddQuestions />} />
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
          <Route path="/dashboard/addproduct" element={<Addproduct />} />
          <Route path="/dashboard/savedservice" element={<SavedServices />} />
          <Route path="/dashboard/becomeaprovider" element={<BecomeaProvider />} />
          <Route path="/dashboard/review/:id" element={<AddServiceReview />} />
          <Route path="/dashboard/pendingprovider" element={<PendingProviders />} />
          <Route
            path="/dashboard/manageproducts"
            element={<Manageproducts />}
          />
          <Route
            path="/dashboard/provider/appointment"
            element={<AppointmentRequest />}
          />

          {/* add service request from service provider - by sagar */}
          <Route
            path="/dashboard/make-service-request"
            element={<AddServiceRequest />}
          ></Route>


          <Route
            path="/dashboard/ordersChat"
            element={<OrdersChat />}
          ></Route>
          <Route
            path="/dashboard/ordersChat/:urlId"
            element={<OrdersChat single />}
          ></Route>


          {/* all the pending request list route - by sagar */}
          <Route path="/dashboard/all-pending-services" element={<AdminPendingRequest />}></Route>

          {/* add new service category for admin - by sagar */}

          <Route path="/dashboard/add-service-category" element={<AddNewServiceCategory />}></Route>



          {/* all the pending request list route - by sagar */}

          {/* add new service category for admin - by sagar */}


        </Route>

        <Route path="/contact" element={<ContactUs />} />
        <Route path="/career" element={<Career />} />
        <Route path="/home/providerProfile/:providerId" element={<SingleProviderDetails />} />
        {/* <Route path="/myorderspage" element={<MyOrderPage />} /> */}
        <Route
          path="home/service-details/:serviceId"
          element={<SingleService />}
        />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;