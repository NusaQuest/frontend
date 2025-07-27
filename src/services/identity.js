import { readContract } from "wagmi/actions";
import { NUSAQUEST_ADDRESS } from "../utils/address";
import nusaquest_abi from "../build/nusaquest_abi.json";
import { config } from "../App";

export async function isAlreadyRegistered(address) {
  try {
    const status = await readContract(config, {
      abi: nusaquest_abi,
      address: NUSAQUEST_ADDRESS,
      functionName: "isAlreadyRegistered",
      args: [address],
    });
    return Boolean(status);
  } catch (error) {
    console.error(error);
    return;
  }
}
