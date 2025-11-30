import { useState } from "react";
import { FileText, Menu } from "lucide-react";
import { Link } from "react-router-dom"; // 👈 changed from HashLink to Link

export default function NavbarComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#6F4E37] text-white py-6 px-8 flex justify-between items-center fixed w-full top-0 z-50 shadow-md">
      {/* Logo */}
      <h1 className="text-3xl font-extrabold tracking-tight flex items-center gap-2">
        <FileText className="w-6 h-6 text-white/90" />
        <span className="text-white/90">Doc-Type-Converter</span>
      </h1>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-10 text-[15px] font-medium">
        <li><Link to="/" className="hover:text-white/80 transition">Home</Link></li>
        <li><Link to="/about" className="hover:text-white/80 transition">About</Link></li>
        <li><Link to="/services" className="hover:text-white/80 transition">Services</Link></li>
        <li><Link to="/contact" className="hover:text-white/80 transition">Contact</Link></li>
        <li><Link to="/dashboard" className="hover:text-white/80 transition">Dashboard</Link></li>

        {/* Buttons Section */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className="bg-white text-[#6F4E37] font-semibold px-5 py-2 rounded-full shadow-md hover:bg-[#F3E5AB] hover:shadow-lg transition"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-[#D4AF37] text-[#4B2E05] font-semibold px-5 py-2 rounded-full shadow-md hover:bg-[#C19A2B] hover:shadow-lg transition"
          >
            Register
          </Link>
        </div>
      </ul>

      {/* Mobile Menu */}
      <div className="md:hidden relative">
        <button className="focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
          <Menu className="w-6 h-6 text-amber-100" />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-4 bg-[#6F4E37] text-white rounded-lg shadow-lg p-4 w-40 flex flex-col gap-3">
            <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)}>Contact</Link>
            <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>

            {/* Mobile Buttons */}
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="bg-white text-[#6F4E37] text-center font-semibold py-2 rounded-full shadow-md hover:bg-[#F3E5AB] transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setIsOpen(false)}
              className="bg-[#D4AF37] text-[#4B2E05] text-center font-semibold py-2 rounded-full shadow-md hover:bg-[#C19A2B] transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
