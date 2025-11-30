import { Github, Mail, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#6F4E37] text-[#F4F1EA] py-10 px-6 md:px-20 mt-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
        
        {/* 1️⃣ Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">DocConverter</h2>
          <p className="text-sm leading-relaxed text-[#D9C9B5]">
            Convert your documents with ease — fast, secure, and accurate.
          </p>
        </div>

        {/* 2️⃣ Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-[#D9C9B5]">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/dashboard" className="hover:text-white transition">Dashboard</Link></li>
            <li><Link to="/uploadfile" className="hover:text-white transition">Upload File</Link></li>
            <li><Link to="/login" className="hover:text-white transition">Login</Link></li>
            <li><Link to="/register" className="hover:text-white transition">Register</Link></li>
            
  <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
  <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
  <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
  <ul className="space-y-2 text-[#D9C9B5]"></ul>
  
          </ul>
        </div>

        {/* 3️⃣ Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect With Us</h3>
          <ul className="space-y-3 text-[#D9C9B5]">
            <li className="flex items-center gap-2">
              <Github size={18} />
              <a href="https://github.com/your-username" target="_blank" className="hover:text-white transition">
                GitHub
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={18} />
              <a href="mailto:yourmail@gmail.com" className="hover:text-white transition">
                yourmail@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* 4️⃣ Upload Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Upload</h3>
          <p className="text-[#D9C9B5] text-sm mb-3">
            Upload a document directly from here.
          </p>
          <label className="cursor-pointer flex items-center gap-2 bg-[#F4F1EA] text-[#6F4E37] font-medium px-4 py-2 rounded-lg hover:bg-white transition">
            <Upload size={18} />
            <span>Upload File</span>
            <input type="file" className="hidden" />
          </label>
        </div>
      </div>

      {/* 5️⃣ Bottom Line */}
      <div className="border-t border-[#D9C9B5] mt-10 pt-4 text-center text-sm text-[#D9C9B5]">
        <p>&copy; 2025 DocConverter. All rights reserved.</p>
        <div className="flex justify-center mt-3 gap-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Support</a>
        </div>
      </div>
    </footer>
  );
}

