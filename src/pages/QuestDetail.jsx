import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quests } from "./Quest";
import Title from "../components/sections/Title";
import { getCountdown, truncate } from "../utils/helper";
import { Copy, MapPin, User, ThumbsUp, ThumbsDown, Circle } from "lucide-react";
import ReusableButton from "../components/buttons/ReusableButton";

const QuestDetail = () => {
  const { id } = useParams("id");
  const [quest, setQuest] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [voteStartCountdown, setVoteStartCountdown] = useState(0);
  const now = new Date().getTime() / 1000;

  useEffect(() => {
    if (quests && id) {
      const foundQuest = quests.find((item) => String(item.id) === String(id));
      setQuest(foundQuest);

      const interval = setInterval(() => {
        setVoteStartCountdown(getCountdown(foundQuest.voteStart));
      }, 1000);

      return () => clearInterval(interval);
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
      <div className="mt-3">
        {now <= quest.voteStart && <Title title={"Voting starts on"} />}
        {now > quest.voteStart && now <= quest.voteEnd && (
          <Title title={"Voting ends on"} />
        )}
        {now > quest.voteEnd && now <= quest.executionDelay && (
          <Title title={"Awaiting quest execution"} />
        )}
      </div>
      <div className="flex flex-row gap-2 items-center justify-center mb-6">
        <div className="bg-primary rounded-xl size-16 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {voteStartCountdown.days}d
          </h1>
        </div>
        <div className="text-secondary font-bold">:</div>
        <div className="bg-primary rounded-xl size-16 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {voteStartCountdown.hours}h
          </h1>
        </div>
        <div className="text-secondary font-bold">:</div>
        <div className="bg-primary rounded-xl size-16 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {voteStartCountdown.minutes}m
          </h1>
        </div>
        <div className="text-secondary font-bold">:</div>
        <div className="bg-primary rounded-xl size-16 flex items-center justify-center">
          <h1 className="text-secondary font-semibold text-2xl">
            {voteStartCountdown.seconds}s
          </h1>
        </div>
      </div>
      {now > quest.voteStart && now <= quest.voteEnd && (
        <div className="mt-3 w-full flex flex-col gap-2.5">
          <button className="rounded-xl active:scale-95 duration-200 flex items-center justify-center p-3 flex-row gap-1.5 bg-green-500 hover:bg-green-600 cursor-pointer w-full">
            <ThumbsUp className="text-secondary size-5" />
            <h1 className="text-secondary font-semibold">
              For <span>{"(" + 123 + ")"}</span>
            </h1>
          </button>
          <button className="rounded-xl active:scale-95 duration-200 flex items-center justify-center p-3 flex-row gap-1.5 bg-red-500 hover:bg-red-600 cursor-pointer w-full">
            <ThumbsDown className="text-secondary size-5" />
            <h1 className="text-secondary font-semibold">
              Against <span>{"(" + 12 + ")"}</span>{" "}
            </h1>
          </button>
          <button className="rounded-xl active:scale-95 duration-200 flex items-center justify-center p-3 flex-row gap-1.5 bg-yellow-500 hover:bg-yellow-600 cursor-pointer w-full">
            <Circle className="text-secondary size-5" />
            <h1 className="text-secondary font-semibold">
              Neutral <span>{"(" + 120 + ")"}</span>{" "}
            </h1>
          </button>
        </div>
      )}
      <div>
        <Title title={"Description"} />
        <p className="text-secondary text-sm">{quest.proposalDescription}</p>
      </div>
    </div>
  );
};

export default QuestDetail;
