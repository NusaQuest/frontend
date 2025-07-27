import { readContract } from "wagmi/actions";
import { config } from "../App";
import nusaquest_abi from "../build/nusaquest_abi.json";
import { NUSAQUEST_ADDRESS } from "../utils/address";

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
