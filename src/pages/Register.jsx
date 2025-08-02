import React, { useEffect, useState } from "react";
import TextField from "../components/inputs/TextField";
import FileUploadField from "../components/inputs/FileUploadField";
import ReusableButton from "../components/buttons/ReusableButton";
import Header from "../components/sections/Header";
import Title from "../components/sections/Title";
import Tesseract from "tesseract.js";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { delegate } from "../services/ft";
import { keccak256, toUtf8Bytes } from "ethers";
import { addTransaction } from "../server/transaction";
import { getBlockTimestamp } from "../services/helper/converter";

const Register = ({ address }) => {
  const [fullName, setFullName] = useState("");
  const [ktpFile, setKtpFile] = useState(null);
  const navigate = useNavigate();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleKtpFileChange = (e) => {
    setKtpFile(e.target.files[0]);
  };

  const submit = async () => {
    Swal.fire({
      title: "Verifying KTP",
      text: "Please wait while we verify your KTP data...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const res = await Tesseract.recognize(ktpFile, "eng", {
      logger: (m) => console.log(m),
    });

    const extractedName = extractNameFromKTP(res.data.text);
    if (extractedName === fullName.toLowerCase()) {
      const hash = keccak256(toUtf8Bytes(res.data.text));
      const result = await delegate(hash);
      const timestamp = await getBlockTimestamp();
      const httpResult = await addTransaction(
        address,
        "Delegation",
        "+10 NUSA",
        result,
        timestamp
      );
      if (httpResult) {
        Swal.close();
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
        Swal.close();
        Swal.fire({
          title: "Something Went Wrong",
          text: "An internal server error occurred. Please try again in a moment.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } else {
      Swal.close();
      Swal.fire({
        title: "Verification Failed",
        text: "The name you entered doesn’t match your KTP. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
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
            // isOnAction={isOnAction}
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
