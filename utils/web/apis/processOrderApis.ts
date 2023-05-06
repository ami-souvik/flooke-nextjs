import sendApiRequest from "../requestWebService";
import { PREVIEW_PROCESS_ORDER } from "../../constantUtils";

export const processOrder = async (params: object) => {
  try {
    const res = await sendApiRequest(
      PREVIEW_PROCESS_ORDER,
      params
    );
    if (!res) return null;
    return res;
  } catch (exp) {
    return null;
  }
};