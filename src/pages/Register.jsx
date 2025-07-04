import React, { useState } from "react";
import TextField from "../components/inputs/Textfield";
import FileUploadField from "../components/inputs/FileUploadField";
import ReusableButton from "../components/buttons/ReusableButton";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [ktpFile, setKtpFile] = useState(null);

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleKtpFileChange = (e) => {
    setKtpFile(e.target.files[0]);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col gap-6">
          <TextField
            label="Full Name (as per KTP)"
            placeholder="e.g. Budi Santoso"
            name="fullName"
            onChange={handleFullNameChange}
          />
          <FileUploadField
            label="Upload KTP"
            name="ktpFile"
            file={ktpFile}
            onChange={handleKtpFileChange}
          />
          <ReusableButton text={"Submit"} />
        </div>
      </div>
    </div>
  );
};

export default Register;
