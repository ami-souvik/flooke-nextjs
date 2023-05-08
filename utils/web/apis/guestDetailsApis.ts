import sendApiRequest from "../requestWebService";
import {
  ADD_GUEST_DETAILS_
} from "../../constantUtils";

export const addGuestDetails = async (params: object) => {
  try {
    const res = await sendApiRequest(
      ADD_GUEST_DETAILS_,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
}