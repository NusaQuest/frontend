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
import { writeContract } from "wagmi/actions";
import { config } from "../App";
import { encodeFunctionData } from "viem";
import { getIdentity } from "../server/identity";

// const proposals = [
//   {
//     id: "64f6c2e0a29b3c001c7d9f0a",
//     scId: 1,
//     scTargets: ["0x1234567890abcdef1234567890abcdef12345678"],
//     scValues: [0],
//     scCalldatas: ["0x"],
//     wallet: "0xabcDEFabcDEFabcDEFabcDEFabcDEFabcDEF1234",
//     name: "Clean Up Kuta Beach",
//     proposalDescription:
//       "Let’s clean up plastic and trash at Kuta Beach in Bali. This is an effort to preserve one of Indonesia’s most iconic beaches.",
//     beachName: "Kuta Beach",
//     city: "Badung",
//     province: "Bali",
//     map: "https://maps.google.com/?q=Kuta+Beach+Bali",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYI7LqH-eXp_z3hW4-XRWp7J8eS0bEqazWaQ&s",
//       "https://example.com/images/kuta2.jpg",
//     ],
//     voteStart: 1751808000, // 2025-07-06T08:00:00Z
//     voteEnd: 1751980800, // 2025-07-08T08:00:00Z
//     executionDelay: 86400, // 24 jam
//   },
//   {
//     id: "64f6c2e0a29b3c001c7d9f0b",
//     scId: 2,
//     scTargets: ["0x9876543210fedcba9876543210fedcba98765432"],
//     scValues: [0],
//     scCalldatas: ["0x"],
//     wallet: "0x123ABC123ABC123ABC123ABC123ABC123ABC123A",
//     name: "Clean Up Parangtritis Beach",
//     proposalDescription:
//       "Help clean up the Parangtritis coast and support local eco-tourism while earning $NUSA tokens.",
//     beachName: "Parangtritis Beach",
//     city: "Bantul",
//     province: "Yogyakarta",
//     map: "https://maps.google.com/?q=Parangtritis+Beach",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYI7LqH-eXp_z3hW4-XRWp7J8eS0bEqazWaQ&s",
//     ],
//     voteStart: 1751894400, // 2025-07-07T10:00:00Z
//     voteEnd: 1752067200, // 2025-07-09T10:00:00Z
//     executionDelay: 43200, // 12 jam
//   },
//   {
//     id: "64f6c2e0a29b3c001c7d9f0c",
//     scId: 3,
//     scTargets: ["0xa1b2c3d4e5f6071829384756aabbccddeeff0011"],
//     scValues: [0],
//     scCalldatas: ["0x"],
//     wallet: "0xdef456DEF456DEF456DEF456DEF456DEF4567890",
//     name: "Clean Up Losari Beach",
//     proposalDescription:
//       "Join us to restore the beauty of Losari Beach in Makassar by removing trash and plastic debris with local volunteers.",
//     beachName: "Losari Beach",
//     city: "Makassar",
//     province: "South Sulawesi",
//     map: "https://maps.google.com/?q=Losari+Beach",
//     images: [
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYI7LqH-eXp_z3hW4-XRWp7J8eS0bEqazWaQ&s",
//       "https://example.com/images/losari2.jpg",
//     ],
//     voteStart: 1751980800, // 2025-07-08T08:00:00Z
//     voteEnd: 1752153600, // 2025-07-10T08:00:00Z
//     executionDelay: 86400, // 24 jam
//   },
// ];

const Impact = ({ address }) => {
  const [registered, setRegistered] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [isOnAction, setIsOnAction] = useState(false);
  const [proposalName, setProposalName] = useState("Bersih-bersih Parangtritis");
  const [proposalDescription, setProposalDescription] = useState(
    "Organize clean-up at Parangtritis Beach involving local volunteers and waste management partners."
  );
  const [images, setImages] = useState(null);
  const [beachName, setBeachName] = useState("Parangtritis Beach");
  const [province, setProvince] = useState("Daerah Istimewa Yogyakarta");
  const [city, setCity] = useState("Bantul");
  const [maps, setMaps] = useState("maps.com");
  const [proposals, setProposals] = useState(null);
  const navigate = useNavigate();

  const fetchIdentity = async () => {
    const res = await getIdentity(address);
    if (res.status === "success") {
      setRegistered(true);
    } else {
      setRegistered(false);
    }
  };

  const {
    data: contributionData,
    isLoading,
    error,
  } = useReadContract({
    abi: nusaquest_abi,
    address: NUSAQUEST_ADDRESS,
    functionName: "contribution",
    args: [address],
  });

  const [totalProposals, totalVotes, totalActions] = contributionData || [];

  const fetchProposals = async () => {
    const res = await getProposals();
    if (res.status === "success") {
      setProposals(res.data.proposals);
    }
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
      console.log(pinata);
      console.log(images);
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
    console.log(targets);
    console.log(values);
    console.log(calldatas);
    try {
      const contractRes = await writeContract(config, {
        abi: nusaquest_abi,
        address: NUSAQUEST_ADDRESS,
        functionName: "initiate",
        args: [targets, values, calldatas, proposalDescription],
        account: address,
      });
      console.log(contractRes);
      if (!contractRes) {
        throw new Error("No response from contract");
      }
      return contractRes;
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
    console.log(uploaded);
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
  }, [isClick, proposals, registered]);

  useEffect(() => {}, [isOnAction]);

  useEffect(() => {
    fetchIdentity();
  }, []);

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
        totalActions={parseInt(totalActions)}
      />
      <Proposals proposals={proposals} onAction={handleClick} />
      {/* <Votes proposals={proposals} /> */}
      {/* <CleanupRecord proposals={proposals} /> */}

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
