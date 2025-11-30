import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import NavbarComponent from "./component/Navbar";
import Home from "./component/Home";
import About from "./component/About";
import Services from "./component/Services";
import Contact from "./component/Contact";
import Login from "./component/Login";
import Register from "./component/Register";
import Dashboard from "./component/Dashboard";
import UploadFile from "./component/Uploadfile";
import Footer from "./component/Footer";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F4F1EA] text-[#382110] font-serif">
        <NavbarComponent />
        <main className="flex-grow mt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/uploadfile" element={<UploadFile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
