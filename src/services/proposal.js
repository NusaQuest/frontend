import { readContract, writeContract } from "wagmi/actions";
import { config } from "../App";
import nusaquest_abi from "../build/nusaquest_abi.json";
import { keccak256, toUtf8Bytes } from "ethers";
import { NUSAQUEST_ADDRESS } from "../utils/env";
import { getCountdownFromBlockNumber } from "./helper/converter";

export async function initiate(
  targets,
  values,
  calldatas,
  description,
  address
) {
  try {
    const result = await writeContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "initiate",
      args: [targets, values, calldatas, description],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function vote(proposal, support, reason) {
  try {
    const proposalId = await getProposalId(proposal);
    const result = await writeContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "vote",
      args: [proposalId, support, reason],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function queue(proposal) {
  try {
    const result = await writeContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "queue",
      args: [
        proposal.sctargets,
        proposal.scvalues,
        proposal.sccalldatas,
        keccak256(toUtf8Bytes(proposal.proposaldescription)),
      ],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function execute(proposal) {
  try {
    const result = await writeContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "execute",
      args: [
        proposal.sctargets,
        proposal.scvalues,
        proposal.sccalldatas,
        keccak256(toUtf8Bytes(proposal.proposaldescription)),
      ],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function claimParticipantReward(proposal, proof) {
  try {
    const proposalId = await getProposalId(proposal);
    const result = await writeContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "claimParticipantReward",
      args: [proposalId, proof],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function proposalVotes(proposal) {
  try {
    const proposalId = await getProposalId(proposal);
    const [totalAgainst, totalFor] = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "proposalVotes",
      args: [proposalId],
    });
    return [totalAgainst, totalFor];
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function getProposalId(proposal) {
  try {
    const proposalId = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "getProposalId",
      args: [
        proposal.sctargets,
        proposal.scvalues,
        proposal.sccalldatas,
        keccak256(toUtf8Bytes(proposal.proposaldescription)),
      ],
    });
    return proposalId;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function state(proposalId) {
  try {
    const state = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "state",
      args: [proposalId],
    });
    return state;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function contribution(address) {
  try {
    const [totalProposals, totalVotes, totalQuestsExecuted] =
      await readContract(config, {
        abi: nusaquest_abi,
        address: NUSAQUEST_ADDRESS,
        functionName: "contribution",
        args: [address],
      });
    return [totalProposals, totalVotes, totalQuestsExecuted];
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function proposalSnapshot(proposal) {
  try {
    const proposalId = await getProposalId(proposal);
    const snapshot = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "proposalSnapshot",
      args: [proposalId],
    });
    const countdown = await getCountdownFromBlockNumber(snapshot);
    return countdown;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function proposalDeadline(proposal) {
  try {
    const proposalId = await getProposalId(proposal);
    const deadline = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "proposalDeadline",
      args: [proposalId],
    });
    const countdown = await getCountdownFromBlockNumber(deadline);
    return countdown;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function proposalEta(proposal) {
  try {
    const proposalId = await getProposalId(proposal);
    const eta = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "proposalEta",
      args: [proposalId],
    });
    console.log(eta);
    return eta;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function userVoteHistory(wallet) {
  try {
    const voteHistory = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "userVoteHistory",
      args: [wallet],
    });
    return voteHistory;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function userSubmissionHistory(wallet) {
  try {
    const submissionHistory = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "userSubmissionHistory",
      args: [wallet],
    });
    return submissionHistory;
  } catch (error) {
    console.error(error);
    return;
  }
}
