import sendApiRequest from "../requestWebService";
import {
  ADD_GUEST_DETAILS,
  GET_ALL_GUEST_DETAILS
} from "../../constantUtils";

export const addGuestDetails = async (params: object) => {
  try {
    const res = await sendApiRequest(
      ADD_GUEST_DETAILS,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
}

export const getAllGuestDetails = async (params: object) => {
  try {
    const res = await sendApiRequest(
      GET_ALL_GUEST_DETAILS,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
}