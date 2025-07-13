import { readContract, writeContract } from "wagmi/actions";
import { config } from "../App";
import nusaquest_abi from "../build/nusaquest_abi.json";
import { keccak256, toUtf8Bytes } from "ethers";
import { NUSAQUEST_ADDRESS } from "../utils/env";
import { getCountdownFromBlockNumber, getCountdownFromBlockTimestamp } from "./helper/converter";

export async function initiate(
  targets,
  values,
  calldatas,
  description,
  address
) {
  try {
    const res = await writeContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "initiate",
      args: [targets, values, calldatas, description],
      account: address,
    });
    return res;
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
  console.log(proposalId);
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

export async function votingDelay() {
  try {
    const votingDelay = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "votingDelay",
    });
    const countdown = await getCountdownFromBlockNumber(votingDelay);
    return countdown;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function votingPeriod() {
  try {
    const votingPeriod = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "votingPeriod",
    });
    const countdown = await getCountdownFromBlockNumber(votingPeriod);
    return countdown;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function executionDelay() {
  try {
    const executionDelay = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "executionDelay",
    });
    const countdown = await getCountdownFromBlockTimestamp(executionDelay);
    return countdown;
  } catch (error) {
    console.error(error);
    return;
  }
}
