import React, { useEffect, useState } from "react";
import Header from "../components/sections/Header";
import OverviewImpact from "../components/sections/OverviewImpact";
import Proposals from "../components/sections/Proposals";
import Votes from "../components/sections/Votes";
import CleanupRecord from "../components/sections/CleanupRecord";
import CreateProposal from "../components/modals/CreateProposal";
import nusaquest_abi from "../build/nusaquest_abi.json";
import { pinata } from "../utils/env";
import { addProposal, checkProposal, getProposals } from "../server/proposal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { encodeFunctionData } from "viem";
import {
  execute,
  initiate,
  lastProposeTimestamp,
  queue,
} from "../services/proposal";
import { addTransaction } from "../server/transaction";
import { getBlockTimestamp } from "../services/helper/converter";
import { formatTimestamp } from "../utils/helper";
import { NUSAQUEST_ADDRESS } from "../utils/address";
import { contribution } from "../services/history";

const Impact = ({ address, registered }) => {
  const [isClick, setIsClick] = useState(false);
  const [isOnAction, setIsOnAction] = useState(false);
  const [proposalName, setProposalName] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const [images, setImages] = useState(null);
  const [riverName, setRiverName] = useState("");
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [maps, setMaps] = useState("");
  const [proposals, setProposals] = useState(null);
  const [allProposals, setAllProposals] = useState(null);
  const [totalProposals, setTotalProposals] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [totalQuestsExecuted, setTotalQuestsExecuted] = useState(0);
  const navigate = useNavigate();

  const fetchProposals = async () => {
    if (!address) return;

    const res = await getProposals();
    if (res.status === "success") {
      const data = res.data.proposals;
      if (!data) return;

      const myProposals =
        data.filter(
          (item) => item.wallet.toLowerCase() === address.toLowerCase()
        ) || [];
      setAllProposals(data || []);
      setProposals(myProposals || []);
    }
  };

  const fetchContribution = async () => {
    if (!address) return;

    const [totalProposals, totalVotes, totalQuestsExecuted] =
      await contribution(address);
    setTotalProposals(totalProposals);
    setTotalVotes(totalVotes);
    setTotalQuestsExecuted(totalQuestsExecuted);
  };

  const handleClick = async () => {
    const currentTimestamp = await getBlockTimestamp();
    const lastPropose = await lastProposeTimestamp(address);
    const delay = 1 * 60 * 60;
    const nextAvailable = lastPropose + delay;

    if (!registered) {
      Swal.fire({
        title: "KTP Verification Required",
        text: "You need to verify your KTP before accessing this feature. Please complete the verification first.",
        icon: "warning",
        confirmButtonText: "Verify Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/register`);
        }
      });
    } else if (currentTimestamp < nextAvailable) {
      const formattedTime = formatTimestamp(nextAvailable);
      return Swal.fire({
        title: "Wait Before Proposing Again",
        text: `You can propose again at ${formattedTime}.`,
        icon: "info",
        confirmButtonText: "OK",
      });
    } else {
      setIsClick(!isClick);
    }
  };

  const uploadPinata = async () => {
    try {
      const uploadPromises = await images.map((image) =>
        pinata.upload.public.url(URL.createObjectURL(image))
      );

      const uploadedResults = await Promise.all(uploadPromises);

      const urls = uploadedResults.map(
        (res) => `https://gateway.pinata.cloud/ipfs/${res.cid}`
      );

      return urls;
    } catch (error) {
      console.error("Upload failed:", error);
      return null;
    }
  };

  const validateForm = () => {
    if (
      !proposalName ||
      !proposalDescription ||
      !riverName ||
      !city ||
      !province ||
      !maps ||
      !images
    ) {
      Swal.fire({
        title: "Oops! 😅",
        text: "Looks like you missed something. Please complete the form before submitting.",
        icon: "warning",
        confirmButtonText: "Will do!",
      });
      return false;
    }
    return true;
  };

  const handleUpload = async () => {
    const urls = await uploadPinata();
    if (urls.length != images.length) {
      setIsOnAction(false);
      await Swal.fire({
        title: "Upload Failed ❌",
        text: "We couldn’t upload your image. Please check your internet connection or try again later.",
        icon: "error",
        confirmButtonText: "Close",
      });
    }
    return urls;
  };

  const validateProposalLogic = async (
    targets,
    values,
    calldatas,
    uploaded
  ) => {
    const check = await checkProposal(
      targets,
      values,
      calldatas,
      address,
      proposalName,
      proposalDescription,
      riverName,
      city,
      province,
      maps,
      uploaded
    );

    if (check.status !== "success") {
      setIsOnAction(false);
      await Swal.fire({
        title: "Invalid Proposal ⚠️",
        text: "Proposal input is not valid. Make sure the location exists and the activity clearly describes a river cleanup.",
        icon: "warning",
        confirmButtonText: "Close",
      });
      clear();
      return false;
    }
    return true;
  };

  const submitToContract = async (targets, values, calldatas) => {
    try {
      const result = await initiate(
        targets,
        values,
        calldatas,
        proposalDescription
      );
      if (!result) {
        throw new Error("No response from contract");
      }
      return result;
    } catch (error) {
      setIsOnAction(false);
      console.error(error);
      await Swal.fire({
        title: "Contract Execution Failed",
        text:
          error?.shortMessage ||
          error?.message ||
          "Something went wrong while submitting the proposal.",
        icon: "error",
        confirmButtonText: "Close",
      });
      return null;
    }
  };

  const submitToBackend = async (targets, values, calldatas, uploaded) => {
    const res = await addProposal(
      targets,
      values,
      calldatas,
      address,
      proposalName,
      proposalDescription,
      riverName,
      city,
      province,
      maps,
      uploaded
    );
    if (res.status !== "success") {
      setIsOnAction(false);
      await Swal.fire({
        title: "Failed to Submit Proposal ❌",
        text: "Something went wrong while submitting your proposal. Please check your input or try again later.",
        icon: "error",
        confirmButtonText: "Close",
      });
      clear();
      return false;
    }
    return true;
  };

  const showSuccessAlert = async () => {
    setIsOnAction(false);
    navigate(`/quest`);
    await Swal.fire({
      title: "Quest Submitted",
      text: "Your quest has been successfully submitted to the blockchain. If your proposal is approved and executed, you'll receive a reward of 10 NUSA.",
      icon: "success",
      confirmButtonText: "Close",
    });
  };

  const onCreate = async () => {
    if (!validateForm()) return;

    setIsOnAction(true);
    const uploaded = await handleUpload();
    if (!uploaded) return;

    const calldata = encodeFunctionData({
      abi: nusaquest_abi,
      functionName: "claimProposerReward",
      args: [address],
    });

    const targets = [NUSAQUEST_ADDRESS];
    const values = [0];
    const calldatas = [calldata];

    const valid = await validateProposalLogic(
      targets,
      values,
      calldatas,
      uploaded
    );
    if (!valid) return;

    const contractResult = await submitToContract(targets, values, calldatas);
    if (!contractResult) return;

    const backendResult = await submitToBackend(
      targets,
      values,
      calldatas,
      uploaded
    );
    if (!backendResult) return;

    await showSuccessAlert();
  };

  const onQueue = async (proposal) => {
    Swal.fire({
      title: "Queueing Proposal",
      text: "Please wait while we queue this proposal...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const result = await queue(proposal);
      if (result) {
        Swal.close();
        await Swal.fire({
          title: "Queued Successfully",
          text: "The proposal has been queued and is ready for execution.",
          icon: "success",
          confirmButtonText: "Close",
        });
      } else {
        Swal.close();
        await Swal.fire({
          title: "Failed to Queue",
          text: "Something went wrong while queueing the proposal.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.close();
      await Swal.fire({
        title: "Error",
        text: "An unexpected error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.error(error);
    }
  };

  const onExecute = async (proposal) => {
    Swal.fire({
      title: "Executing Proposal",
      text: "Please wait while we execute this proposal...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const result = await execute(proposal);
      const timestamp = await getBlockTimestamp();

      if (result) {
        const httpResult = await addTransaction(
          address,
          "Quest Executed",
          "+10 NUSA",
          result,
          timestamp
        );

        if (httpResult.status === "success") {
          Swal.close();
          await Swal.fire({
            title: "Executed Successfully",
            text: "Your quest has been executed successfully. You’ve earned 10 NUSA as a proposer on this quest.",
            icon: "success",
            confirmButtonText: "Close",
          });
        } else {
          Swal.close();
          await Swal.fire({
            title: "Execution Recorded Failed",
            text: "Execution succeeded, but saving to history failed. Please refresh or contact support.",
            icon: "warning",
            confirmButtonText: "Close",
          });
        }
      } else {
        Swal.close();
        await Swal.fire({
          title: "Execution Failed",
          text: "Something went wrong during execution.",
          icon: "error",
          confirmButtonText: "Close",
        });
      }
    } catch (error) {
      Swal.close();
      await Swal.fire({
        title: "Error",
        text: "An unexpected error occurred while executing the proposal.",
        icon: "error",
        confirmButtonText: "Close",
      });
      console.error(error);
    }
  };

  const clear = () => {
    setProposalName("");
    setProposalDescription("");
    setRiverName("");
    setCity("");
    setProvince("");
    setMaps("");
    setImages(null);
  };

  useEffect(() => {
    fetchProposals();
  }, [isClick, registered]);

  useEffect(() => {}, [isOnAction]);

  useEffect(() => {
    fetchContribution();
  }, [address]);

  return (
    <div>
      <Header
        firstText="Your"
        boldText="NusaQuest"
        secondText="Journey"
        paragraph="Every action tells your story. Review your journey in building a better future."
      />
      <OverviewImpact
        totalProposals={parseInt(totalProposals)}
        totalVotes={parseInt(totalVotes)}
        totalActions={parseInt(totalQuestsExecuted)}
      />
      <Proposals
        proposals={proposals}
        onAction={handleClick}
        onQueue={onQueue}
        onExecute={onExecute}
      />
      <Votes proposals={allProposals} address={address} />
      <CleanupRecord proposals={allProposals} address={address} />

      {isClick && (
        <CreateProposal
          setProposalName={setProposalName}
          setProposalDescription={setProposalDescription}
          setImages={setImages}
          setRiverName={setRiverName}
          setProvince={setProvince}
          setCity={setCity}
          setMaps={setMaps}
          onClose={handleClick}
          isOnAction={isOnAction}
          onCreate={onCreate}
        />
      )}
    </div>
  );
};

export default Impact;
