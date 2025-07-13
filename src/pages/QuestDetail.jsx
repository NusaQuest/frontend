import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mapStateToStatus } from "../utils/helper";
import Countdown from "../components/sections/Countdown";
import VoteButton from "../components/sections/VoteButton";
import QuestImagesSection from "../components/sections/QuestImagesSection";
import QuestProfile from "../components/sections/QuestProfile";
import { getProposals } from "../server/proposal";
import {
  executionDelay,
  getProposalId,
  state,
  votingDelay,
  votingPeriod,
} from "../services/proposal";

const QuestDetail = () => {
  const { id } = useParams("id");
  const [quest, setQuest] = useState(null);
  const [status, setStatus] = useState("Loading");
  const [selectedImage, setSelectedImage] = useState(0);
  const [voteStartCountdown, setVoteStartCountdown] = useState(0);
  const [votePeriodCountdown, setVotePeriodCountdown] = useState(0);
  const now = new Date().getTime() / 1000;

  const fetchQuest = async () => {
    const res = await getProposals();
    if (res.status === "success") {
      setQuest(res.data.proposals.find((item) => item.id === String(id)));
    }
  };

  const fetchState = async () => {
    const proposalId = await getProposalId(quest);
    if (!proposalId) return;

    const proposalState = await state(proposalId);
    if (!proposalState) return;

    // console.log(await votingDelay());

    const status = mapStateToStatus(proposalState);
    setStatus(status);
  };

  const fetchExecutionDelay = async () => {
    const delay = await executionDelay();
  };

  const fetchVotingDelay = async () => {
    const delay = await votingDelay();
    setVoteStartCountdown(delay);
  };

  const fetchVotingPeriod = async () => {
    const delay = await votingPeriod();
    setVotePeriodCountdown(delay);
  };

  useEffect(() => {
    if (id) {
      fetchQuest();
    }
  }, [id]);

  useEffect(() => {
    if (quest) {
      fetchState();
    }
  }, [quest]);

  useEffect(() => {
    if (status === "Pending") {
      fetchVotingDelay();
    }

    if (status === "Active") {
      fetchVotingPeriod();
    }
  }, [status]);

  useEffect(() => {}, [selectedImage]);

  const handleVote = (id) => {};

  const handleSelectImage = (id) => {
    setSelectedImage(id);
  };

  if (!quest) {
    return <div className="text-secondary">Loading quest details...</div>;
  }

  return (
    <div className="lg:mt-8">
      <QuestProfile quest={quest} isDescription={false} />
      <div className="flex flex-col lg:flex-row w-full">
        <div className="lg:w-1/2 lg:pr-4">
          <QuestImagesSection
            selected={quest.images[selectedImage]}
            images={quest.images}
            onSelect={handleSelectImage}
            status={status}
            selectedImage={selectedImage}
          />
        </div>
        <div className="lg:w-1/2 lg:pl-4">
          {status === "Pending" && (
            <Countdown countdown={voteStartCountdown} now={now} quest={quest} />
          )}
          {status === "Active" && (
            <div>
              <Countdown
                countdown={votePeriodCountdown}
                now={now}
                quest={quest}
              />
              <VoteButton quest={quest} now={now} onVote={handleVote} />
            </div>
          )}
          {status === "Executed" && (
            <div>
              <div>a</div>
            </div>
          )}
          <QuestProfile quest={quest} isDescription={true} />
        </div>
      </div>
    </div>
  );
};

export default QuestDetail;
