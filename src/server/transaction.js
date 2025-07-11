import axios from "axios";
import { BACKEND_API_URL } from "../utils/env";
import { handleError } from "./helper/response";

export async function addTransaction(
  wallet,
  title,
  detail,
  txHash,
  txTimestamp
) {
  try {
    const res = await axios.post(`${BACKEND_API_URL}/transactions`, {
      wallet: wallet,
      title: title,
      detail: detail,
      txhash: txHash,
      txtimestamp: txTimestamp,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function getWalletTransactions(wallet) {
  try {
    const res = await axios.get(`${BACKEND_API_URL}/transactions/${wallet}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}
