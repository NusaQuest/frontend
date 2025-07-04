import React from "react";
import { Plus } from "lucide-react";

const FileUploadField = ({ label, onChange, name, file }) => {
  const isImage = file && file.type.startsWith("image/");
  const previewUrl = file ? URL.createObjectURL(file) : null;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={name} className="font-semibold text-secondary">
        {label}
      </label>

      <label
        htmlFor={name}
        className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed border-secondary rounded-xl ${
          isImage && previewUrl ? "p-3" : "px-4 py-10"
        } cursor-pointer hover:border-primary hover:bg-background/30 transition`}
      >
        {isImage && previewUrl ? (
          <img src={previewUrl} alt="Preview" className="object-contain rounded-md" />
        ) : (
          <>
            <Plus size={32} className="text-primary" />
            <span className="text-secondary text-sm">
              {file
                ? `${file.name} (${(file.size / 1024).toFixed(1)} KB)`
                : "Upload File"}
            </span>
          </>
        )}
      </label>

      <input
        type="file"
        id={name}
        name={name}
        onChange={onChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

export default FileUploadField;
