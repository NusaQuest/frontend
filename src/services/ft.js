import { readContract, writeContract } from "wagmi/actions";
import { config } from "../App";
import nusatoken_abi from "../build/nusatoken_abi.json";
import { NUSATOKEN_ADDRESS } from "../utils/address";

export async function delegate(address) {
  try {
    const result = await writeContract(config, {
      abi: nusatoken_abi,
      address: NUSATOKEN_ADDRESS,
      functionName: "delegate",
      account: address,
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function balanceOf(address) {
  try {
    const balance = await readContract(config, {
      abi: nusatoken_abi,
      address: NUSATOKEN_ADDRESS,
      functionName: "balanceOf",
      args: [address],
    });
    return parseInt(balance) / 1e18;
  } catch (error) {
    console.error(error);
    return;
  }
}
