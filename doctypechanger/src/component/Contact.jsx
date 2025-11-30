import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section className="py-28 px-8 w-full bg-[#FFF9F3] flex flex-col items-center">
      <h2 className="text-4xl font-bold text-[#6F4E37] mb-6">Contact Us</h2>
      <p className="max-w-2xl text-[#382110]/90 mb-10 text-center">
        Have questions or feedback? We’d love to hear from you!
      </p>

      <form className="w-full max-w-lg flex flex-col gap-5 text-left">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border border-[#A88734]/40 rounded-lg focus:border-[#A88734]"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border border-[#A88734]/40 rounded-lg focus:border-[#A88734]"
        />
        <textarea
          rows="4"
          placeholder="Your Message"
          className="w-full p-3 border border-[#A88734]/40 rounded-lg focus:border-[#A88734]"
        />
        <button
          className="bg-[#A88734] text-white py-3 rounded-lg hover:bg-[#8B5E3C] transition flex items-center justify-center gap-2"
        >
          <Mail className="w-5 h-5" /> Send Message
        </button>
      </form>
    </section>
  );
}
