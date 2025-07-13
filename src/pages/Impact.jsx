import React, { useEffect, useState } from "react";
import Header from "../components/sections/Header";
import OverviewImpact from "../components/sections/OverviewImpact";
import Proposals from "../components/sections/Proposals";
import Votes from "../components/sections/Votes";
import CleanupRecord from "../components/sections/CleanupRecord";
import CreateProposal from "../components/modals/CreateProposal";
import { useReadContract } from "wagmi";
import nusaquest_abi from "../build/nusaquest_abi.json";
import { NUSAQUEST_ADDRESS, pinata } from "../utils/env";
import { addProposal, checkProposal, getProposals } from "../server/proposal";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { encodeFunctionData } from "viem";
import { getIdentity } from "../server/identity";
import { contribution, initiate } from "../services/proposal";

const Impact = ({ address }) => {
  const [registered, setRegistered] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isOnAction, setIsOnAction] = useState(false);
  const [proposalName, setProposalName] = useState(
    "Bersih-bersih Parangtritis"
  );
  const [proposalDescription, setProposalDescription] = useState(
    "Organize clean-up at Parangtritis Beach involving local volunteers and waste management partners."
  );
  const [images, setImages] = useState(null);
  const [beachName, setBeachName] = useState("Parangtritis Beach");
  const [province, setProvince] = useState("Daerah Istimewa Yogyakarta");
  const [city, setCity] = useState("Bantul");
  const [maps, setMaps] = useState("maps.com");
  const [proposals, setProposals] = useState(null);
  const [totalProposals, setTotalProposals] = useState(0);
  const [totalVotes, setTotalVotes] = useState(0);
  const [totalQuestsExecuted, setTotalQuestsExecuted] = useState(0);
  const navigate = useNavigate();

  const fetchIdentity = async () => {
    if (!address) return;

    const res = await getIdentity(address);
    if (res.status === "success") {
      setRegistered(true);
    } else {
      setRegistered(false);
    }
  };

  const fetchProposals = async () => {
    if (!address) return;

    const res = await getProposals();
    if (res.status === "success") {
      const data = res.data.proposals;
      const myProposals = data.filter(
        (item) => item.wallet.toLowerCase() === address.toLowerCase()
      );
      setProposals(myProposals);
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

  const handleClick = () => {
    if (!registered) {
      Swal.fire({
        title: "KTP Verification Required 🪪",
        text: "You need to verify your KTP before accessing this feature. Please complete the verification first.",
        icon: "warning",
        confirmButtonText: "Verify Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate(`/register`);
        }
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
      !beachName ||
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
      beachName,
      city,
      province,
      maps,
      uploaded
    );

    if (check.status !== "success") {
      setIsOnAction(false);
      await Swal.fire({
        title: "Invalid Proposal ⚠️",
        text: "Proposal input is not valid. Make sure the location exists and the activity clearly describes a beach cleanup.",
        icon: "warning",
        confirmButtonText: "Close",
      });
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
      await Swal.fire({
        title: "Contract Execution Failed ❌",
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
      beachName,
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
      return false;
    }
    return true;
  };

  const showSuccessAlert = async () => {
    setIsOnAction(false);
    await Swal.fire({
      title: "Proposal Submitted 🎉",
      text: "Your proposal has been successfully submitted to the blockchain.",
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

  useEffect(() => {
    fetchProposals();
  }, [isClick, registered]);

  useEffect(() => {}, [isOnAction]);

  useEffect(() => {
    fetchIdentity();
    fetchContribution();
  }, [address]);

  return (
    <div>
      <Header
        firstText="Your"
        boldText="NusaQuest"
        secondText="Journey"
        paragraph="Every proposal, vote, and quest tells your story. Review your journey in building a better future."
      />
      <OverviewImpact
        totalProposals={parseInt(totalProposals)}
        totalVotes={parseInt(totalVotes)}
        totalActions={parseInt(totalQuestsExecuted)}
      />
      <Proposals proposals={proposals} onAction={handleClick} />
      <Votes proposals={proposals} />
      <CleanupRecord proposals={proposals} />

      {isClick && (
        <CreateProposal
          setProposalName={setProposalName}
          setProposalDescription={setProposalDescription}
          setImages={setImages}
          setBeachName={setBeachName}
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
