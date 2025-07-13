import { getBlock, getBlockNumber } from "wagmi/actions";
import { config } from "../../App";

export async function getBlockTimestamp() {
  const block = await getBlock(config, {
    blockTag: "latest",
  });
  return Number(block.timestamp);
}

export async function getCountdownFromBlockNumber(blockNumber) {
  try {
    const currentBlockNumber = await getBlockNumber(config);
    const now = Math.floor(Date.now() / 1000);

    if (blockNumber <= currentBlockNumber) {
      const block = await getBlock(config, {
        blockNumber: BigInt(blockNumber),
      });
      return Number(block.timestamp);
    } else {
      const diff = Number(blockNumber) - Number(currentBlockNumber);
      const estimated = now + diff * 18;
      return estimated;
    }
  } catch (error) {
    console.error(error);
    return;
  }
}

// export async function getCountdownFromBlockTimestamp(blockTimestamp) {
//   const timestamp = await getBlockTimestamp();
//   const countdown = timestamp + Number(blockTimestamp);
//   return countdown;
// }
