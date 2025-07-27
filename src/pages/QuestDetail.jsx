import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatTimestamp, mapStateToStatus } from "../utils/helper";
import Countdown from "../components/sections/Countdown";
import VoteButton from "../components/sections/VoteButton";
import QuestImagesSection from "../components/sections/QuestImagesSection";
import QuestProfile from "../components/sections/QuestProfile";
import { getProposals } from "../server/proposal";
import {
  claimParticipantReward,
  executedTimestamp,
  getProposalId,
  lastVoteTimestamp,
  proposalDeadline,
  proposalEta,
  proposalSnapshot,
  proposalVotes,
  state,
  vote,
} from "../services/proposal";
import Swal from "sweetalert2";
import Title from "../components/sections/Title";
import FileUploadField from "../components/inputs/FileUploadField";
import ReusableButton from "../components/buttons/ReusableButton";
import { pinata } from "../utils/env";
import { addTransaction } from "../server/transaction";
import { getBlockTimestamp } from "../services/helper/converter";
import { CheckCircle } from "lucide-react";
import { userSubmissionHistory, userVoteHistory } from "../services/history";

const QuestDetail = ({ address, registered }) => {
  const { id } = useParams("id");
  const [quest, setQuest] = useState(null);
  const [status, setStatus] = useState("Loading");
  const [selectedImage, setSelectedImage] = useState(0);
  const [voteStartCountdown, setVoteStartCountdown] = useState(0);
  const [votePeriodCountdown, setVotePeriodCountdown] = useState(0);
  const [submissionPeriod, setSubmissionPeriod] = useState(0);
  const [etaCountdown, setEtaCountdown] = useState(0);
  const [totalFor, setTotalFor] = useState(0);
  const [totalAgainst, setTotalAgainst] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [videoProof, setVideoProof] = useState(null);
  const [viewUrl, setViewUrl] = useState("");

  const navigate = useNavigate();

  const fetchSubmissionHistory = async () => {
    if (!address) return;

    const submissionHistory = await userSubmissionHistory(address);
    if (!submissionHistory) return;

    const proposalId = await getProposalId(quest);
    if (!proposalId) return;

    const findSubmission = submissionHistory.find(
      (item) => String(item.proposalId) === String(proposalId)
    );
    if (!findSubmission) return;

    setViewUrl(findSubmission.proof || "");
  };

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

    const status = mapStateToStatus(proposalState);
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

  const fetchSubmissionPeriod = async () => {
    const period = await executedTimestamp(quest);
    const timeLater = 15 * 60;
    setSubmissionPeriod(period + timeLater);
  };

  const fetchTotalVotes = async () => {
    const [totalAgainst, totalFor] = await proposalVotes(quest);
    setTotalAgainst(BigInt(totalAgainst) / BigInt(1e18));
    setTotalFor(BigInt(totalFor) / BigInt(1e18));
  };

  const checkRegistered = async () => {
    if (!registered) {
      const result = await Swal.fire({
        title: "KTP Verification Required",
        text: "You need to verify your KTP before accessing this feature. Please complete the verification first.",
        icon: "warning",
        confirmButtonText: "Verify Now",
      });

      if (result.isConfirmed) {
        navigate("/register");
      }

      return false;
    }
    return true;
  };

  const fetchVoteHistory = async () => {
    if (!address) return;

    const history = await userVoteHistory(address);
    const questId = await getProposalId(quest);
    setDisabled(history.some((item) => item.proposalId === questId));
    const hasVoted = history.some((item) => {
      console.log(
        "Checking item.proposalId:",
        item.proposalId,
        "vs quest.id:",
        quest.id
      );
      return item.proposalId === questId;
    });
    console.log("Has Voted:", hasVoted);
    console.log(history);
  };

  const checkVotingAvailability = async () => {
    const currentTimestamp = await getBlockTimestamp();
    const lastVote = await lastVoteTimestamp(address);
    const delay = 15 * 60;
    const nextAvailable = lastVote + delay;

    if (currentTimestamp < nextAvailable) {
      const formattedTime = formatTimestamp(nextAvailable);
      Swal.fire({
        title: "Wait Before Voting Again",
        text: `You can vote again at ${formattedTime}.`,
        icon: "info",
        confirmButtonText: "OK",
      });
      return false;
    }
    return true;
  };

  const handleVote = async (support, reason) => {
    const allowed = await checkRegistered();
    if (!allowed) return;

    const available = await checkVotingAvailability();
    if (!available) return;

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
        navigate(`/quest`);
        Swal.close();
        await Swal.fire({
          title: "Vote Submitted",
          text: "Your vote has been recorded successfully.",
          icon: "success",
          confirmButtonText: "Great!",
        });
      } else {
        Swal.close();
        await Swal.fire({
          title: "Vote Failed",
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

  const handleVideoProofChange = (e) => {
    setVideoProof(e.target.files[0]);
  };

  const uploadPinata = async () => {
    try {
      const upload = await pinata.upload.public.file(videoProof);
      const url = `https://gateway.pinata.cloud/ipfs/` + upload.cid;
      return url;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const handleSubmit = async () => {
    const allowed = await checkRegistered();
    if (!allowed) return;

    if (!videoProof) {
      return Swal.fire({
        title: "No Proof Uploaded",
        text: "Please upload your video proof before submitting.",
        icon: "warning",
        confirmButtonText: "OK",
      });
    }

    Swal.fire({
      title: "Submitting Your Proof",
      text: "Please wait while we upload your video and claim your reward...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // Upload ke IPFS (misal: Pinata)
      const url = await uploadPinata(videoProof);

      if (!url) {
        Swal.close();
        return await Swal.fire({
          title: "Upload Failed",
          text: "Could not upload your video. Please try again.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }

      // Submit proof to contract
      const result = await claimParticipantReward(quest, url);
      const timestamp = await getBlockTimestamp();

      if (result) {
        // Tambah transaksi ke history
        const httpResult = await addTransaction(
          address,
          "Submitted Cleanup Proof",
          "+40 NUSA",
          result,
          timestamp
        );

        Swal.close();

        if (httpResult.status === "success") {
          await Swal.fire({
            title: "Proof Submitted",
            text: "Thank you for your contribution! You’ve earned 40 NUSA for participating in the cleanup.",
            icon: "success",
            confirmButtonText: "Awesome!",
          });
          navigate("/quest");
        } else {
          await Swal.fire({
            title: "Proof Submitted",
            text: "Reward granted, but logging history failed. Your NUSA is still safe.",
            icon: "warning",
            confirmButtonText: "OK",
          });
        }
      } else {
        Swal.close();
        await Swal.fire({
          title: "Submission Failed",
          text: "We couldn’t verify your submission. Please ensure your proof is valid.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
    } catch (error) {
      Swal.close();
      console.error("Submission Error:", error);
      await Swal.fire({
        title: "Unexpected Error",
        text: "Something went wrong during the submission. Please try again later.",
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
      fetchVoteHistory();
    }

    if (status === "Queued") {
      fetchEta();
    }

    if (status == "Executed") {
      fetchSubmissionPeriod();
    }
  }, [status]);

  useEffect(() => {
    if (quest) {
      fetchSubmissionHistory();
    }
  }, [address, quest]);

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
              status == "Queued" || 
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
                <Countdown timestamp={submissionPeriod} status={status} />
                <Title title={"Video Proof"} />
                {viewUrl ? (
                  <div className="border border-green-500 bg-green-100 w-full rounded-md flex flex-row items-center justify-between p-4 gap-3 text-green-800 shadow-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="size-5 text-green-600" />
                      <span className="font-medium text-sm md:text-base">
                        Proof submitted
                      </span>
                    </div>
                    <a
                      href={viewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm md:text-base text-green-700 hover:underline font-semibold"
                    >
                      View
                    </a>
                  </div>
                ) : (
                  <div>
                    <FileUploadField
                      name="videoProof"
                      file={videoProof}
                      onChange={handleVideoProofChange}
                      type={"video"}
                    />
                    <div className="mb-5" />
                    <ReusableButton
                      text={"Submit"}
                      buttonColor={"bg-primary"}
                      textColor={"text-secondary"}
                      action={handleSubmit}
                    />
                  </div>
                )}

                <div className="mb-5" />
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
