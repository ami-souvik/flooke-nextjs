import sendApiRequest from "../requestWebService";
import { ADD_ACTIVE_ORDER, READ_ACTIVE_ORDER } from "../../constantUtils";

export const addActiveOrder = async (params: object) => {
  try {
    const res = await sendApiRequest(
      ADD_ACTIVE_ORDER,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
};

export const readActiveOrder = async (params: object) => {
  try {
    const res = await sendApiRequest(
      READ_ACTIVE_ORDER,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
};