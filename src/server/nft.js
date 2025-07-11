import axios from "axios";
import { BACKEND_API_URL } from "../utils/env";
import { handleError } from "./helper/response";

export async function purchaseNFT(id) {
  try {
    const res = await axios.patch(`${BACKEND_API_URL}/nfts/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function getNFTs() {
  try {
    const res = await axios.get(`${BACKEND_API_URL}/nfts`);
    return res.data;
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}