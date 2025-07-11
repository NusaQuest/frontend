import axios from "axios";
import { handleError } from "./helper/response";
import { BACKEND_API_URL } from "../utils/env";

export async function registerIdentity(wallet, hash, registeredAt) {
  try {
    const res = await axios.post(`${BACKEND_API_URL}/identities`, {
      wallet: wallet,
      hash: hash,
      registeredat: registeredAt,
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function getIdentity(wallet) {
  try {
    const res = await axios.get(`${BACKEND_API_URL}/identities/${wallet}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}
