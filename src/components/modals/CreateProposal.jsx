import React from "react";
import { X } from "lucide-react";

const CreateProposal = ({
  setProposalName,
  setProposalDescription,
  setImages,
  setBeachName,
  setProvince,
  setCity,
  setMaps,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 p-4 flex items-center justify-center">
      <div className="bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-xl w-full max-w-xl shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-secondary hover:text-primary"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-secondary mb-4">
          Create New Proposal
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Proposal Title"
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
            type="text"
            placeholder="Image URLs (comma separated)"
            onChange={(e) => setImages(e.target.value.split(","))}
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

          <button className="mt-2 bg-primary text-secondary font-semibold rounded-lg py-2 hover:opacity-90 active:scale-95 transition-all">
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProposal;
