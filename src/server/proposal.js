import axios from "axios";
import { BACKEND_API_URL } from "../utils/env";
import { handleError, handleSuccess } from "./helper/response";

export async function addProposal(
  scTargets,
  scValues,
  scCalldatas,
  wallet,
  proposalName,
  proposalDescription,
  riverName,
  city,
  province,
  map,
  images
) {
  try {
    const res = await axios.post(`${BACKEND_API_URL}/proposals`, {
      sctargets: scTargets,
      scvalues: scValues,
      sccalldatas: scCalldatas,
      wallet: wallet,
      proposalname: proposalName,
      proposaldescription: proposalDescription,
      riverName: riverName,
      city: city,
      province: province,
      map: map,
      images: images,
    });
    return handleSuccess(res);
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function checkProposal(
  scTargets,
  scValues,
  scCalldatas,
  wallet,
  proposalName,
  proposalDescription,
  riverName,
  city,
  province,
  map,
  images
) {
  try {
    const res = await axios.post(`${BACKEND_API_URL}/proposals/check`, {
      sctargets: scTargets,
      scvalues: scValues,
      sccalldatas: scCalldatas,
      wallet: wallet,
      proposalname: proposalName,
      proposaldescription: proposalDescription,
      riverName: riverName,
      city: city,
      province: province,
      map: map,
      images: images,
    });
    return handleSuccess(res);
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}

export async function getProposals() {
  try {
    const res = await axios.get(`${BACKEND_API_URL}/proposals`);
    return handleSuccess(res);
  } catch (error) {
    console.error(error);
    return handleError(error);
  }
}
