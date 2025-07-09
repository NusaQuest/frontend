import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quests } from "./Quest";
import Title from "../components/sections/Title";
import { getCountdown, truncate } from "../utils/helper";
import { Copy, MapPin, User, ThumbsUp, ThumbsDown, Circle } from "lucide-react";
import ReusableButton from "../components/buttons/ReusableButton";
import Countdown from "../components/sections/Countdown";
import VoteButton from "../components/sections/VoteButton";
import QuestImagesSection from "../components/sections/QuestImagesSection";
import QuestProfile from "../components/sections/QuestProfile";

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

  const handleVote = (id) => {};

  const handleSelectImage = (id) => {
    setSelectedImage(id);
  };

  if (!quest) {
    return <div className="text-secondary">Loading quest details...</div>;
  }

  return (
    <div>
      <QuestProfile quest={quest} isDescription={false} />
      <QuestImagesSection
        selected={quest.images[selectedImage]}
        images={quest.images}
        onSelect={handleSelectImage}
        selectedImage={selectedImage}
      />
      <Countdown countdown={voteStartCountdown} now={now} quest={quest} />
      <VoteButton quest={quest} now={now} onVote={handleVote} />
      <QuestProfile quest={quest} isDescription={true} />
    </div>
  );
};

export default QuestDetail;
