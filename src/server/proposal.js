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
  beachName,
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
      beachname: beachName,
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

export async function updateProposal(
  scId,
  scTargets,
  scValues,
  scCalldatas,
  wallet,
  proposalName,
  proposalDescription,
  beachName,
  city,
  province,
  map,
  images
) {
  try {
    const res = await axios.patch(`${BACKEND_API_URL}/proposals`, {
      scid: scId,
      sctargets: scTargets,
      scvalues: scValues,
      sccalldatas: scCalldatas,
      wallet: wallet,
      proposalname: proposalName,
      proposaldescription: proposalDescription,
      beachname: beachName,
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
