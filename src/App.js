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

// made a socket with server
const socket = io('http://localhost:5000');


function App() {

  // connecting the server 
  useEffect(() => {
    socket.on("connect", () => {
      console.log('connection done!')
      socket.send("Hello!");
    });
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SERVICES" element={<Services />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Contact" element={<ContactUs />} />
        <Route path="*" element={<Error />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
