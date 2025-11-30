import { useState } from "react";
import { Upload } from "lucide-react";

export default function UploadFile() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file first.");
      return;
    }
    // Logic for uploading file will go here (API, etc.)
    alert(`File "${file.name}" uploaded successfully!`);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F1] flex flex-col justify-center items-center py-16 px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-10 text-center border border-[#D2B48C]/50">
        <div className="flex flex-col items-center mb-8">
          <Upload className="w-12 h-12 text-[#6F4E37] mb-4" />
          <h2 className="text-3xl font-bold text-[#4B2E05]">
            Upload Your Document
          </h2>
          <p className="text-[#6F4E37]/80 mt-2 text-sm">
            Choose a file to convert — secure, fast, and simple.
          </p>
        </div>

        <form
          onSubmit={handleUpload}
          className="flex flex-col gap-6 items-center"
        >
          <label
            htmlFor="file-upload"
            className="cursor-pointer border-2 border-dashed border-[#6F4E37]/50 rounded-xl p-8 w-full text-[#4B2E05] text-center hover:bg-[#FFF3E0] transition"
          >
            {file ? (
              <span className="font-semibold text-[#6F4E37]">
                📄 {file.name}
              </span>
            ) : (
              <span className="text-[#6F4E37]/70">
                Drag & drop your file here or <span className="text-[#D4AF37] font-semibold">browse</span>
              </span>
            )}
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>

          <button
            type="submit"
            className="bg-[#D4AF37] text-[#4B2E05] font-semibold px-8 py-3 rounded-full shadow-md hover:bg-[#C19A2B] hover:shadow-lg transition w-1/2"
          >
            Upload File
          </button>
        </form>
      </div>
    </div>
  );
}
