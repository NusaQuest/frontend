import { getBlock } from "wagmi/actions";
import { config } from "../../App";

async function getBlockTimestamp() {
  const block = await getBlock(config, {
    blockTag: "latest",
  });
  return Number(block.timestamp);
}

export async function getCountdownFromBlockNumber(blockNumber) {
  const timestamp = await getBlockTimestamp();
  const countdown = timestamp + Number(blockNumber) * 2; // kalo eth jadi 4
  return Number(countdown);
}

export async function getCountdownFromBlockTimestamp(blockTimestamp) {
  const timestamp = await getBlockTimestamp();
  const countdown = timestamp + Number(blockTimestamp);
  return countdown;
}
