import React from "react";
import { statusColors } from "../../utils/helper";

const QuestImagesSection = ({
  selected,
  images,
  onSelect,
  selectedImage,
  status,
}) => {
  return (
    <div>
      <div className="w-full relative">
        <div
          className={`absolute top-3 right-3 z-10 text-xs font-semibold px-3 py-1 rounded-md ${statusColors[status]}`}
        >
          {status}
        </div>
        <img src={selected} className="rounded-xl w-full h-48 md:h-full" />
      </div>
      <div className="flex items-center justify-center flex-row gap-2 mt-4 mb-6">
        {images.map((item, index) => (
          <div key={index}>
            <img
              src={item}
              onClick={() => onSelect(index)}
              className={`rounded-md cursor-pointer w-18 md:w-28 h-12 md:h-20 ${
                index === selectedImage && "border-2 border-primary"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestImagesSection;
