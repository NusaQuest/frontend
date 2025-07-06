import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quests } from "./Quest";
import Title from "../components/sections/Title";
import { truncate } from "../utils/helper";
import { Copy, MapPin, User } from "lucide-react";
import ReusableButton from "../components/buttons/ReusableButton";

const QuestDetail = () => {
  const { id } = useParams("id");
  const [quest, setQuest] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (quests && id) {
      const foundQuest = quests.find((item) => String(item.id) === String(id));
      setQuest(foundQuest);
    }
  }, [id, quests]);

  useEffect(() => {}, [selectedImage]);

  if (!quest) {
    return <div className="text-secondary">Loading quest details...</div>;
  }

  return (
    <div>
      <Title title={quest.name} />
      <a
        href={quest.maps}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-sm italic text-secondary hover:underline"
      >
        <MapPin size={14} className="text-primary" />
        {quest.beachName}, {quest.city}, {quest.province}
      </a>
      <div className="flex flex-row gap-1 items-center mt-2 mb-4">
        <User className="text-primary size-4" />
        <p className="text-secondary italic text-sm">
          {truncate(quest.wallet, 4, 4, 11)}
        </p>
        <Copy className="text-primary size-3 cursor-pointer" />
      </div>

      <div className="w-full">
        <img
          src={quest.images[selectedImage]}
          className="rounded-xl w-full h-48"
        />
      </div>
      <div className="flex items-center justify-center flex-row gap-2 mt-4 mb-6">
        {quest.images.map((item, index) => (
          <div key={index}>
            <img
              src={item}
              onClick={() => setSelectedImage(index)}
              className={`rounded-md w-18 h-12  ${
                index === selectedImage && "border-2 border-primary"
              }`}
            />
          </div>
        ))}
      </div>
      <div>
        <Title title={"Description"} />
        <p className="text-secondary text-sm">{quest.proposalDescription}</p>
          </div>
          <div className="mt-3">
              <ReusableButton text={"Vote"} />
          </div>
    </div>
  );
};

export default QuestDetail;
