import { writeContract } from "wagmi/actions";
import { config } from "../App";
import { NUSAQUEST_ADDRESS } from "../utils/env";
import nusaquest_abi from "../build/nusaquest_abi.json";

export async function swap(id) {
  try {
    const result = await writeContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "swap",
      args: [id],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}