import { readContract, writeContract } from "wagmi/actions";
import { config } from "../App";
import { NUSATOKEN_ADDRESS } from "../utils/env";
import nusatoken_abi from "../build/nusatoken_abi.json";

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

export async function isAlreadyDelegate(address) {
  try {
    const status = await readContract(config, {
      abi: nusatoken_abi,
      address: NUSATOKEN_ADDRESS,
      functionName: "isAlreadyDelegate",
      args: [address],
    });
    return Boolean(status);
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
    return parseInt(balance);
  } catch (error) {
    console.error(error);
    return;
  }
}
