import Header from "./Pages/Home/Header/Header";
import Navigation from "./Pages/SharedRoute/Navigation/Navigation";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home/Home";
import Error from "./Pages/Eroor/Error";
import Services from "./Pages/Services/Services";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ContactUs from "./Pages/ContactUs/ContactUs";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SERVICES" element={<Services/>} />
        <Route path="/Dashboard" element={<Dashboard/>} />
        <Route path="/Contact" element={<ContactUs/>} />
        <Route path="*" element={<Error />} />

      </Routes>
     
    </BrowserRouter>
  );
}

export default App;
