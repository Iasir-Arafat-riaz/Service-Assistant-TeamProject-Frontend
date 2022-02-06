import Header from "./Pages/Home/Header/Header";
import Navigation from "./Pages/SharedRoute/Navigation/Navigation";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./Pages/Home/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Header /> */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
