import { FileText, Wrench, Shield } from "lucide-react";

export default function Services() {
  return (
    <section className="py-28 px-8 w-full bg-[#F4F1EA] flex flex-col items-center">
      <h2 className="text-4xl font-bold text-[#6F4E37] mb-12">Our Services</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 hover:scale-105 transition">
          <FileText className="w-10 h-10 text-[#A88734]" />
          <h4 className="text-xl font-semibold">PDF to Word Converter</h4>
          <p className="text-[#382110]/80 text-sm text-center">
            Convert PDFs into editable Word documents quickly.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 hover:scale-105 transition">
          <Wrench className="w-10 h-10 text-[#A88734]" />
          <h4 className="text-xl font-semibold">Image to PDF Converter</h4>
          <p className="text-[#382110]/80 text-sm text-center">
            Merge and convert images into a single high-quality PDF.
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-4 hover:scale-105 transition">
          <Shield className="w-10 h-10 text-[#A88734]" />
          <h4 className="text-xl font-semibold">Secure File Handling</h4>
          <p className="text-[#382110]/80 text-sm text-center">
            All files are encrypted and deleted after processing.
          </p>
        </div>
      </div>
    </section>
  );
}
