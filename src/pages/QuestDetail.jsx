import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCountdown, mapStateToStatus } from "../utils/helper";
import Countdown from "../components/sections/Countdown";
import VoteButton from "../components/sections/VoteButton";
import QuestImagesSection from "../components/sections/QuestImagesSection";
import QuestProfile from "../components/sections/QuestProfile";
import { getProposals } from "../server/proposal";
import {
  getProposalId,
  proposalDeadline,
  proposalEta,
  proposalSnapshot,
  proposalVotes,
  state,
  vote,
} from "../services/proposal";
import Swal from "sweetalert2";
import Title from "../components/sections/Title";

const QuestDetail = () => {
  const { id } = useParams("id");
  const [quest, setQuest] = useState(null);
  const [status, setStatus] = useState("Loading");
  const [selectedImage, setSelectedImage] = useState(0);
  const [voteStartCountdown, setVoteStartCountdown] = useState(0);
  const [votePeriodCountdown, setVotePeriodCountdown] = useState(0);
  const [etaCountdown, setEtaCountdown] = useState(0);
  const [totalFor, setTotalFor] = useState(0);
  const [totalAgainst, setTotalAgainst] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const fetchQuest = async () => {
    const res = await getProposals();
    if (res.status === "success") {
      console.log(res.data.proposals);
      setQuest(res.data.proposals.find((item) => item.id === String(id)));
    }
  };

  const fetchState = async () => {
    console.log(quest);
    const proposalId = await getProposalId(quest);
    console.log(proposalId);
    if (!proposalId) return;

    const proposalState = await state(proposalId);
    console.log(proposalState);

    const status = mapStateToStatus(proposalState);
    console.log(status);
    setStatus(status);
  };

  const fetchVotingActive = async () => {
    const voteDeadline = await proposalDeadline(quest);
    setVotePeriodCountdown(voteDeadline);
  };

  const fetchVotingPending = async () => {
    const voteStart = await proposalSnapshot(quest);
    setVoteStartCountdown(voteStart);
  };

  const fetchEta = async () => {
    const eta = await proposalEta(quest);
    setEtaCountdown(eta);
  };

  const fetchTotalVotes = async () => {
    const [totalAgainst, totalFor] = await proposalVotes(quest);
    setTotalAgainst(totalAgainst);
    setTotalFor(totalFor);
  };

  const handleVote = async (support, reason) => {
    Swal.fire({
      title: "Submitting Vote",
      text: "Please wait while your vote is being submitted...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const result = await vote(quest, support, reason);

      if (result) {
        console.log(result);
        navigate(`/quest`);
        Swal.close();
        await Swal.fire({
          title: "Vote Submitted ✅",
          text: "Your vote has been recorded successfully.",
          icon: "success",
          confirmButtonText: "Great!",
        });
      } else {
        Swal.close();
        await Swal.fire({
          title: "Vote Failed ❌",
          text: "Something went wrong while submitting your vote. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.close();
      console.error("Vote error:", error);
      await Swal.fire({
        title: "Error 🚨",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
  };

  useEffect(() => {
    if (id) {
      fetchQuest();
    }
  }, [id]);

  useEffect(() => {
    if (quest) {
      fetchState();
      fetchTotalVotes();
    }
  }, [quest, id]);

  useEffect(() => {
    if (status === "Pending") {
      fetchVotingPending();
    }

    if (status === "Active") {
      fetchVotingActive();
      setDisabled(false);
    }

    if (status === "Queued") {
      fetchEta();
    }
  }, [status]);

  useEffect(() => {}, [selectedImage]);

  const handleSelectImage = (id) => {
    setSelectedImage(id);
  };

  if (quest) {
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
              <Countdown timestamp={voteStartCountdown} status={status} />
            )}
            {status === "Queued" && (
              <Countdown timestamp={etaCountdown} status={status} />
            )}
            {(status === "Active" ||
              status === "Defeated" ||
              status === "Succeeded") && (
              <div>
                {status === "Active" && (
                  <Countdown timestamp={votePeriodCountdown} status={status} />
                )}
                {status === "Succeeded" && (
                  <Title title={"Ready to Be Queued"} />
                )}
                {status !== "Succeeded" && <Title title={"Result"} />}
                <VoteButton
                  onVote={handleVote}
                  totalAgainst={totalAgainst}
                  totalFor={totalFor}
                  disabled={disabled}
                />
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
  }
};

export default QuestDetail;
