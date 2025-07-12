import axios from "axios";
import { handleError, handleSuccess } from "./helper/response";
import { BACKEND_API_URL } from "../utils/env";

export async function registerIdentity(wallet, registeredAt) {
  try {
    console.log(BACKEND_API_URL);
    console.log(wallet);
    console.log(registeredAt);
    const res = await axios.post(`${BACKEND_API_URL}/identities`, {
      wallet: wallet,
      registeredat: registeredAt,
    });
    return handleSuccess(res);
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function getIdentity(wallet) {
  try {
    const res = await axios.get(`${BACKEND_API_URL}/identities/${wallet}`);
    return handleSuccess(res);
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}
