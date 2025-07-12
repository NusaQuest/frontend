import { PinataSDK } from "pinata";

export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
export const NUSAQUEST_ADDRESS = import.meta.env.VITE_NUSAQUEST_ADDRESS;
export const NUSATOKEN_ADDRESS = import.meta.env.VITE_NUSATOKEN_ADDRESS;

export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
  pinataGateway: `${import.meta.env.VITE_PINATA_GATEWAY}`,
});
