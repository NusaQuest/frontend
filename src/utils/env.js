import { PinataSDK } from "pinata";

export const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const pinata = new PinataSDK({
  pinataJwt: `${import.meta.env.VITE_PINATA_JWT}`,
  pinataGateway: `${import.meta.env.VITE_PINATA_GATEWAY}`,
});
