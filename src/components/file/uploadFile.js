"use client";
import { Button } from "@base-ui/react";
import { Upload, X } from "lucide-react";
import FileComponent from "./file";

const UploadFile = ({ setFile, error, file }) => {
  console.log("file", file);
  return (
    <div>
      <h3 className="font-semibold mb-2">Tải tệp</h3>
      {file ? (
        <FileComponent
          fileName={file?.name || file?.fileName}
          setFile={setFile}
        />
      ) : (
        <div>
          <label className="border rounded-md flex flex-col items-center gap-2 py-6 cursor-pointer hover:bg-gray-50 transition">
            <Upload className="text-gray-500" />

            <p className="text-gray-500">Kéo và thả vào đây</p>
            <p className="text-gray-500 text-sm">hoặc click để chọn file</p>

            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            {error && <p className="text-sm text-red-500">{error}</p>}
          </label>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
