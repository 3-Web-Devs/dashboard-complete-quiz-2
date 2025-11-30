import { ArrowRightCircle, FileText, Wrench, Shield, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import doc2 from "../assets/doc2.png";

export default function Home() {
  return (
    <div className="flex flex-col items-center text-center scroll-smooth">

      {/* HERO */}
      <section
        id="home"
        className="flex flex-col items-center justify-center min-h-screen text-center py-24 px-6 bg-gradient-to-b from-[#FFF9F3] to-[#F4F1EA]"
      >
        <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight text-[#6F4E37]">
          Convert Files <span className="text-[#A88734]">in Seconds ⚡</span>
        </h2>
        <p className="max-w-2xl mb-10 text-lg text-[#382110]">
          Fast, secure, and elegant document conversion tool that makes your work smooth and stress-free.
        </p>
        <div className="flex gap-4">
          <Link to="/uploadfile">
            <button className="bg-[#A88734] text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#8B5E3C] transition flex items-center gap-2">
              Get Started <ArrowRightCircle className="w-5 h-5" />
            </button>
          </Link>
          <a href="#about">
            <button className="border border-[#A88734] text-[#A88734] px-8 py-3 rounded-xl font-semibold hover:bg-[#F0E4D7] transition">
              Learn More
            </button>
          </a>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-8 w-full bg-gradient-to-r from-[#FFF9F3] to-[#F4F1EA]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img src={doc2} alt="About DocConverter" className="w-full h-[500px] object-cover rounded-2xl shadow-lg" />
          </div>
          <div className="md:w-1/2 text-left">
            <h3 className="text-4xl font-bold text-[#6F4E37] mb-6">About Us</h3>
            <p className="text-lg text-[#382110] mb-4">
              <strong>DocConverter</strong> is your all-in-one document transformation platform — converting PDFs, merging images, and simplifying workflows.
         <br/>
         <br/>  <strong>Our mission</strong> is to make file conversion effortless, fast, and accessible to everyone.
         We combine cutting-edge AI technology with a user-friendly interface for a seamless experience.
         Security and privacy are at the core of our services — your files are always safe with us.
         At Doc-Type-Converter, we continuously strive to innovate and expand our tools to meet your needs. </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-28 px-8 w-full bg-[#F4F1EA] flex flex-col items-center">
        <h3 className="text-4xl font-bold text-[#6F4E37] mb-12">Our Services</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 hover:scale-105 transition">
            <FileText className="w-10 h-10 text-[#A88734]" />
            <h4 className="text-xl font-semibold">PDF to Word Converter</h4>
            <p className="text-[#382110]/80 text-sm">Convert PDFs into editable Word documents quickly.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 hover:scale-105 transition">
            <Wrench className="w-10 h-10 text-[#A88734]" />
            <h4 className="text-xl font-semibold">Image to PDF Converter</h4>
            <p className="text-[#382110]/80 text-sm">Merge and convert images into a single high-quality PDF.</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 hover:scale-105 transition">
            <Shield className="w-10 h-10 text-[#A88734]" />
            <h4 className="text-xl font-semibold">Secure File Handling</h4>
            <p className="text-[#382110]/80 text-sm">All files are encrypted and deleted after processing.</p>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-28 px-8 w-full bg-[#FFF9F3] flex flex-col items-center">
        <h3 className="text-4xl font-bold text-[#6F4E37] mb-6">Contact Us</h3>
        <p className="max-w-2xl text-[#382110]/90 mb-10">Have questions or feedback? We’d love to hear from you!</p>
        <form className="w-full max-w-lg flex flex-col gap-5 text-left">
          <input type="text" placeholder="Your Name" className="w-full p-3 border border-[#A88734]/40 rounded-lg focus:border-[#A88734]" />
          <input type="email" placeholder="Your Email" className="w-full p-3 border border-[#A88734]/40 rounded-lg focus:border-[#A88734]" />
          <textarea rows="4" placeholder="Your Message" className="w-full p-3 border border-[#A88734]/40 rounded-lg focus:border-[#A88734]" />
          <button className="bg-[#A88734] text-white py-3 rounded-lg hover:bg-[#8B5E3C] transition flex items-center justify-center gap-2">
            <Mail className="w-5 h-5" /> Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
