import React, { useEffect, useState } from "react";
import TextField from "../components/inputs/Textfield";
import FileUploadField from "../components/inputs/FileUploadField";
import ReusableButton from "../components/buttons/ReusableButton";
import Header from "../components/sections/Header";
import Title from "../components/sections/Title";
import Tesseract from "tesseract.js";
import Swal from "sweetalert2";
import { registerIdentity } from "../server/identity";
import { useNavigate } from "react-router-dom";

const Register = ({ address }) => {
  const [fullName, setFullName] = useState("");
  const [ktpFile, setKtpFile] = useState(null);
  const [ocr, setOcr] = useState("");
  const [isOnAction, setIsOnAction] = useState(false);
  const navigate = useNavigate();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleKtpFileChange = (e) => {
    setKtpFile(e.target.files[0]);
  };

  const submit = async () => {
    setIsOnAction(true);

    const res = await Tesseract.recognize(ktpFile, "eng", {
      logger: (m) => console.log(m),
    });
    setOcr(res.data.text);

    const extractedName = extractNameFromKTP(res.data.text);
    if (extractedName === fullName.toLowerCase()) {
      const now = Math.floor(new Date().getTime() / 1000);
      const res = await registerIdentity(address, now);
      if (res.status === "success") {
        Swal.fire({
          title: "KTP Verified",
          text: "Your identity has been successfully verified. Welcome to NusaQuest!",
          icon: "success",
          confirmButtonText: "Start Your Quest",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate(`/quest`);
          }
        });
      } else {
        Swal.fire({
          title: "Something Went Wrong",
          text: "An internal server error occurred. Please try again in a moment.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
      setIsOnAction(false);
    } else {
      Swal.fire({
        title: "Verification Failed",
        text: "The name you entered doesn’t match your KTP. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
      setIsOnAction(false);
    }
  };

  const extractNameFromKTP = (text) => {
    const lines = text.split("\n");

    const nameLine = lines.find((line) => line.toLowerCase().includes("nama"));

    if (nameLine) {

      const name = nameLine
        .split(/nama\s*[:=]/i)[1]
        ?.trim()
        .toLowerCase();

      return name || "";
    }

    return "";
  };

  useEffect(() => {}, [isOnAction]);

  return (
    <div>
      <div className="flex flex-col">
        <Header
          firstText={"Join"}
          boldText={"NusaQuest"}
          secondText={"Now"}
          paragraph={
            "Register with your full name and valid KTP to join the NusaQuest movement."
          }
        />
        <Title title={"KTP Verification"} />
        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10 flex flex-col gap-6">
          <TextField
            label="Full Name (as per KTP)"
            placeholder="e.g. Budi Santoso"
            name="fullName"
            onChange={handleFullNameChange}
          />
          <div className="flex flex-col space-y-4">
            <label className="font-semibold text-secondary">
              {"Upload KTP (Landscape)"}
            </label>
            <FileUploadField
              label="Upload KTP (Landscape)"
              name="ktpFile"
              file={ktpFile}
              onChange={handleKtpFileChange}
              type={"image"}
            />
          </div>
          <ReusableButton
            text={"Submit"}
            buttonColor={"bg-primary"}
            textColor={"text-secondary"}
            action={submit}
            isOnAction={isOnAction}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
