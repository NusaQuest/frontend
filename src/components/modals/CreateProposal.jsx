import React from "react";
import { X } from "lucide-react";
import ReusableButton from "../buttons/ReusableButton";

const CreateProposal = ({
  setProposalName,
  setProposalDescription,
  setImages,
  setBeachName,
  setProvince,
  setCity,
  setMaps,
  onClose,
  onCreate,
  isOnAction,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 flex items-center justify-center">
      <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-xl w-full max-w-xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-primary cursor-pointer"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-secondary mb-4">
          Propose New Quest
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Quest Name"
            onChange={(e) => setProposalName(e.target.value)}
            className="bg-white/10 p-3 rounded-lg text-sm text-secondary outline-none"
          />

          <textarea
            placeholder="Description"
            onChange={(e) => setProposalDescription(e.target.value)}
            rows={4}
            className="bg-white/10 p-3 rounded-lg text-sm text-secondary outline-none"
          />

          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setImages(files);
            }}
            className="bg-white/10 p-3 rounded-lg text-sm text-secondary outline-none"
          />

          <input
            type="text"
            placeholder="Beach Name"
            onChange={(e) => setBeachName(e.target.value)}
            className="bg-white/10 p-3 rounded-lg text-sm text-secondary outline-none"
          />

          <input
            type="text"
            placeholder="Province"
            onChange={(e) => setProvince(e.target.value)}
            className="bg-white/10 p-3 rounded-lg text-sm text-secondary outline-none"
          />

          <input
            type="text"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            className="bg-white/10 p-3 rounded-lg text-sm text-secondary outline-none"
          />

          <input
            type="text"
            placeholder="Google Maps Link"
            onChange={(e) => setMaps(e.target.value)}
            className="bg-white/10 p-3 rounded-lg text-sm text-secondary outline-none"
          />

          <ReusableButton
            text={"Submit"}
            textColor={"text-secondary"}
            buttonColor={"bg-primary"}
            action={onCreate}
            isOnAction={isOnAction}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProposal;
